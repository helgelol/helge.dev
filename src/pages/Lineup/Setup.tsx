import { Accessor, createMemo, For, Show } from 'solid-js';
import {
	DEFAULT_FORMATION,
	DEFAULT_SUB_INTERVAL_SEC,
	emptyField,
	FieldState,
	Formation,
	LineupStore,
	MatchState,
	Player
} from './types';

type Props = {
	store: Accessor<LineupStore>;
	update: (mut: (s: LineupStore) => LineupStore) => void;
	back: () => void;
	start: () => void;
};

type Draft = {
	formation: Formation;
	subIntervalSec: number;
	field: FieldState;
};

function makeInitialDraft(store: LineupStore): Draft {
	if (store.match) {
		return {
			formation: store.match.formation,
			subIntervalSec: store.match.subIntervalSec,
			field: store.match.field
		};
	}
	return {
		formation: DEFAULT_FORMATION,
		subIntervalSec: DEFAULT_SUB_INTERVAL_SEC,
		field: emptyField(DEFAULT_FORMATION)
	};
}

export default function Setup(props: Props) {
	// Persist setup draft in the store as a draft `match` (paused, accumulatedMs=0).
	// This way: refresh keeps assignments and formation. We mark it draft by startedAt===null && accumulatedMs===0 && lastSubAlertAt===0.
	const draft = createMemo<Draft>(() => makeInitialDraft(props.store()));

	const writeDraft = (next: Draft) => {
		const match: MatchState = {
			formation: next.formation,
			subIntervalSec: next.subIntervalSec,
			field: next.field,
			startedAt: null,
			accumulatedMs: props.store().match?.accumulatedMs ?? 0,
			lastSubAlertAt: props.store().match?.lastSubAlertAt ?? 0
		};
		// Only keep accumulatedMs if a real match exists already (we'll reset on start).
		props.update((s) => ({ ...s, match }));
	};

	const setFormation = (next: Formation) => {
		const d = draft();
		const newField = emptyField(next);
		const seen = new Set<string>();
		for (let i = 0; i < next.goalies; i++) {
			const id = d.field.goalie[i] ?? null;
			if (id && !seen.has(id)) {
				newField.goalie[i] = id;
				seen.add(id);
			}
		}
		for (let i = 0; i < next.outfield; i++) {
			const id = d.field.outfield[i] ?? null;
			if (id && !seen.has(id)) {
				newField.outfield[i] = id;
				seen.add(id);
			}
		}
		const leftover = [
			...d.field.goalie.filter((x): x is string => !!x),
			...d.field.outfield.filter((x): x is string => !!x),
			...d.field.subs
		].filter((id) => !seen.has(id));
		newField.subs = leftover;
		writeDraft({ ...d, formation: next, field: newField });
	};

	const setInterval_ = (mins: number) => {
		const clamped = Math.max(1, Math.min(15, Math.round(mins)));
		writeDraft({ ...draft(), subIntervalSec: clamped * 60 });
	};

	const assigned = createMemo(() => {
		const f = draft().field;
		return new Set<string>([
			...f.goalie.filter((x): x is string => !!x),
			...f.outfield.filter((x): x is string => !!x),
			...f.subs
		]);
	});

	const unassigned = createMemo<Player[]>(() =>
		props.store().players.filter((p) => !assigned().has(p.id))
	);

	const placeNext = (playerId: string) => {
		const d = draft();
		const f: FieldState = {
			goalie: [...d.field.goalie],
			outfield: [...d.field.outfield],
			subs: [...d.field.subs]
		};
		// Goalie first
		const gi = f.goalie.findIndex((x) => x === null);
		if (gi !== -1) {
			f.goalie[gi] = playerId;
		} else {
			const oi = f.outfield.findIndex((x) => x === null);
			if (oi !== -1) {
				f.outfield[oi] = playerId;
			} else {
				f.subs.push(playerId);
			}
		}
		writeDraft({ ...d, field: f });
	};

	const removeFromGoalie = (slot: number) => {
		const d = draft();
		const f: FieldState = { ...d.field, goalie: [...d.field.goalie] };
		f.goalie[slot] = null;
		writeDraft({ ...d, field: f });
	};
	const removeFromOutfield = (slot: number) => {
		const d = draft();
		const f: FieldState = { ...d.field, outfield: [...d.field.outfield] };
		f.outfield[slot] = null;
		writeDraft({ ...d, field: f });
	};
	const removeFromSubs = (id: string) => {
		const d = draft();
		writeDraft({ ...d, field: { ...d.field, subs: d.field.subs.filter((x) => x !== id) } });
	};

	const playerName = (id: string | null): string => {
		if (!id) return '';
		const p = props.store().players.find((x) => x.id === id);
		return p ? p.name : '';
	};

	const playerNumber = (id: string | null): string => {
		if (!id) return '';
		const p = props.store().players.find((x) => x.id === id);
		return p?.number != null ? `#${p.number}` : '';
	};

	const allOnFieldFilled = createMemo(() => {
		const d = draft();
		return (
			d.field.goalie.every((x) => !!x) &&
			d.field.outfield.every((x) => !!x) &&
			d.formation.goalies > 0 &&
			d.formation.outfield > 0
		);
	});

	const onStart = () => {
		const d = draft();
		const match: MatchState = {
			formation: d.formation,
			subIntervalSec: d.subIntervalSec,
			field: d.field,
			startedAt: null,
			accumulatedMs: 0,
			lastSubAlertAt: 0
		};
		props.update((s) => ({ ...s, match }));
		props.start();
	};

	return (
		<section class="lu-section">
			<div class="lu-setupControls">
				<div class="lu-stepperGroup">
					<label class="lu-label">Goalies</label>
					<div class="lu-stepper">
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() =>
								setFormation({
									...draft().formation,
									goalies: Math.max(1, draft().formation.goalies - 1)
								})
							}
						>
							−
						</button>
						<span class="lu-stepVal">{draft().formation.goalies}</span>
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() =>
								setFormation({
									...draft().formation,
									goalies: Math.min(2, draft().formation.goalies + 1)
								})
							}
						>
							+
						</button>
					</div>
				</div>

				<div class="lu-stepperGroup">
					<label class="lu-label">Outfield</label>
					<div class="lu-stepper">
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() =>
								setFormation({
									...draft().formation,
									outfield: Math.max(3, draft().formation.outfield - 1)
								})
							}
						>
							−
						</button>
						<span class="lu-stepVal">{draft().formation.outfield}</span>
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() =>
								setFormation({
									...draft().formation,
									outfield: Math.min(10, draft().formation.outfield + 1)
								})
							}
						>
							+
						</button>
					</div>
				</div>

				<div class="lu-stepperGroup">
					<label class="lu-label">Sub every (min)</label>
					<div class="lu-stepper">
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() => setInterval_(Math.floor(draft().subIntervalSec / 60) - 1)}
						>
							−
						</button>
						<span class="lu-stepVal">{Math.round(draft().subIntervalSec / 60)}</span>
						<button
							type="button"
							class="lu-stepBtn"
							onClick={() => setInterval_(Math.floor(draft().subIntervalSec / 60) + 1)}
						>
							+
						</button>
					</div>
				</div>
			</div>

			<h2 class="lu-h2">Available</h2>
			<div class="lu-chipRow">
				<Show when={unassigned().length > 0} fallback={<p class="lu-muted">All assigned.</p>}>
					<For each={unassigned()}>
						{(p) => (
							<button type="button" class="lu-chip" onClick={() => placeNext(p.id)}>
								<span class="lu-chipNum">{p.number != null ? `#${p.number}` : ''}</span>
								<span class="lu-chipName">{p.name}</span>
							</button>
						)}
					</For>
				</Show>
			</div>

			<h2 class="lu-h2">Goalie</h2>
			<div class="lu-slotRow">
				<For each={draft().field.goalie}>
					{(id, idx) => (
						<button
							type="button"
							class={`lu-slot lu-slotGoalie${id ? '' : ' lu-slotEmpty'}`}
							onClick={() => id && removeFromGoalie(idx())}
							aria-label={id ? `Remove ${playerName(id)}` : 'Empty goalie slot'}
						>
							<Show when={id} fallback={<span class="lu-slotEmptyLabel">Tap a player</span>}>
								<span class="lu-slotNum">{playerNumber(id)}</span>
								<span class="lu-slotName">{playerName(id)}</span>
							</Show>
						</button>
					)}
				</For>
			</div>

			<h2 class="lu-h2">Outfield</h2>
			<div class="lu-slotGrid">
				<For each={draft().field.outfield}>
					{(id, idx) => (
						<button
							type="button"
							class={`lu-slot${id ? '' : ' lu-slotEmpty'}`}
							onClick={() => id && removeFromOutfield(idx())}
							aria-label={id ? `Remove ${playerName(id)}` : 'Empty outfield slot'}
						>
							<Show when={id} fallback={<span class="lu-slotEmptyLabel">Tap a player</span>}>
								<span class="lu-slotNum">{playerNumber(id)}</span>
								<span class="lu-slotName">{playerName(id)}</span>
							</Show>
						</button>
					)}
				</For>
			</div>

			<h2 class="lu-h2">Subs ({draft().field.subs.length})</h2>
			<div class="lu-chipRow">
				<Show when={draft().field.subs.length > 0} fallback={<p class="lu-muted">No subs yet.</p>}>
					<For each={draft().field.subs}>
						{(id) => (
							<button
								type="button"
								class="lu-chip lu-chipSub"
								onClick={() => removeFromSubs(id)}
								aria-label={`Remove ${playerName(id)} from subs`}
							>
								<span class="lu-chipNum">{playerNumber(id)}</span>
								<span class="lu-chipName">{playerName(id)}</span>
							</button>
						)}
					</For>
				</Show>
			</div>

			<div class="lu-cta lu-ctaSplit">
				<button type="button" class="lu-btn lu-btnSecondary" onClick={() => props.back()}>
					← Roster
				</button>
				<button
					type="button"
					class="lu-btn lu-btnPrimary"
					disabled={!allOnFieldFilled()}
					onClick={onStart}
				>
					Start match →
				</button>
			</div>
		</section>
	);
}
