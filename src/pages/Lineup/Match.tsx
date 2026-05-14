import {
	Accessor,
	createEffect,
	createMemo,
	createSignal,
	For,
	onCleanup,
	onMount,
	Show
} from 'solid-js';
import { FieldState, LineupStore, MatchState, Player } from './types';
import SwapSheet from './SwapSheet';

type Props = {
	store: Accessor<LineupStore>;
	update: (mut: (s: LineupStore) => LineupStore) => void;
	end: () => void;
};

type SwapTarget = { kind: 'goalie'; index: number } | { kind: 'outfield'; index: number } | null;

function fmt(ms: number): string {
	const total = Math.max(0, Math.floor(ms / 1000));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

let audioCtx: AudioContext | null = null;
function beep() {
	try {
		const w = window as typeof window & { webkitAudioContext?: typeof AudioContext };
		const Ctor = window.AudioContext || w.webkitAudioContext;
		if (!Ctor) return;
		if (!audioCtx) audioCtx = new Ctor();
		const ctx = audioCtx;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = 'square';
		osc.frequency.value = 880;
		gain.gain.value = 0.0001;
		osc.connect(gain).connect(ctx.destination);
		const now = ctx.currentTime;
		gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
		osc.start(now);
		osc.stop(now + 0.45);
	} catch {
		// ignore
	}
}

function buzz() {
	try {
		if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
			navigator.vibrate([200, 100, 200, 100, 200]);
		}
	} catch {
		// ignore
	}
}

export default function Match(props: Props) {
	const match = (): MatchState => {
		const m = props.store().match;
		if (!m) throw new Error('Match view rendered without match state');
		return m;
	};

	const updateMatch = (mut: (m: MatchState) => MatchState) => {
		props.update((s) => (s.match ? { ...s, match: mut(s.match) } : s));
	};

	const [now, setNow] = createSignal(Date.now());
	const [alarm, setAlarm] = createSignal(false);
	const [swap, setSwap] = createSignal<SwapTarget>(null);

	let intervalId: number | undefined;

	const tick = () => setNow(Date.now());

	const ensureInterval = () => {
		if (intervalId !== undefined) return;
		intervalId = window.setInterval(tick, 250);
	};
	const stopInterval = () => {
		if (intervalId !== undefined) {
			window.clearInterval(intervalId);
			intervalId = undefined;
		}
	};

	onMount(() => {
		if (match().startedAt !== null) ensureInterval();
	});
	onCleanup(() => stopInterval());

	const elapsedMs = createMemo(() => {
		const m = match();
		const runMs = m.startedAt === null ? 0 : Math.max(0, now() - m.startedAt);
		return m.accumulatedMs + runMs;
	});

	const sinceLastAlertMs = createMemo(() => Math.max(0, elapsedMs() - match().lastSubAlertAt));
	const subRemainingMs = createMemo(() =>
		Math.max(0, match().subIntervalSec * 1000 - sinceLastAlertMs())
	);

	// Fire alarm once per interval cycle. createEffect re-runs when any tracked dep changes;
	// alarm()===true prevents repeated buzz until user acks.
	createEffect(() => {
		if (match().startedAt === null) return;
		if (alarm()) return;
		if (sinceLastAlertMs() >= match().subIntervalSec * 1000) {
			setAlarm(true);
			beep();
			buzz();
		}
	});

	const start = () => {
		updateMatch((m) => ({ ...m, startedAt: Date.now() }));
		setNow(Date.now());
		ensureInterval();
	};
	const pause = () => {
		const m = match();
		if (m.startedAt === null) return;
		const add = Math.max(0, Date.now() - m.startedAt);
		updateMatch((mm) => ({ ...mm, startedAt: null, accumulatedMs: mm.accumulatedMs + add }));
		stopInterval();
	};
	const resetTimer = () => {
		if (!window.confirm('Reset match timer?')) return;
		updateMatch((m) => ({ ...m, startedAt: null, accumulatedMs: 0, lastSubAlertAt: 0 }));
		setAlarm(false);
		stopInterval();
	};
	const ack = () => {
		const at = elapsedMs();
		updateMatch((m) => ({ ...m, lastSubAlertAt: at }));
		setAlarm(false);
	};

	const players = (): Player[] => props.store().players;
	const playerById = (id: string | null): Player | null =>
		id ? (players().find((p) => p.id === id) ?? null) : null;

	const onFieldTap = (target: Exclude<SwapTarget, null>) => {
		setSwap(target);
	};

	const performSwap = (subId: string) => {
		const tgt = swap();
		if (!tgt) return;
		const m = match();
		const f: FieldState = {
			goalie: [...m.field.goalie],
			outfield: [...m.field.outfield],
			subs: [...m.field.subs]
		};
		let outgoing: string | null = null;
		if (tgt.kind === 'goalie') {
			outgoing = f.goalie[tgt.index];
			f.goalie[tgt.index] = subId;
		} else {
			outgoing = f.outfield[tgt.index];
			f.outfield[tgt.index] = subId;
		}
		f.subs = f.subs.filter((id) => id !== subId);
		if (outgoing) f.subs.push(outgoing);
		updateMatch((mm) => ({ ...mm, field: f }));
		setSwap(null);
	};

	const subPlayers = createMemo<Player[]>(() =>
		match()
			.field.subs.map((id) => playerById(id))
			.filter((p): p is Player => !!p)
	);

	const targetName = () => {
		const t = swap();
		if (!t) return '';
		const id =
			t.kind === 'goalie' ? match().field.goalie[t.index] : match().field.outfield[t.index];
		return playerById(id)?.name ?? 'player';
	};

	const isRunning = () => match().startedAt !== null;

	return (
		<section class="lu-section lu-match">
			<div class="lu-timerBlock">
				<div class="lu-elapsed" aria-live="polite">
					{fmt(elapsedMs())}
				</div>
				<div class="lu-timerBtns">
					<Show
						when={isRunning()}
						fallback={
							<button type="button" class="lu-btn lu-btnPrimary" onClick={start}>
								Start
							</button>
						}
					>
						<button type="button" class="lu-btn lu-btnSecondary" onClick={pause}>
							Pause
						</button>
					</Show>
					<button type="button" class="lu-btn lu-btnSecondary" onClick={resetTimer}>
						Reset
					</button>
				</div>
			</div>

			<div class={`lu-subTimer${alarm() ? ' lu-subAlarm' : ''}`}>
				<div class="lu-subLabel">Next sub in</div>
				<div class="lu-subCountdown">{fmt(subRemainingMs())}</div>
				<button type="button" class="lu-btn lu-btnPrimary" onClick={ack}>
					{alarm() ? 'Acknowledge' : 'Reset interval'}
				</button>
			</div>

			<h2 class="lu-h2">On the field</h2>
			<div class="lu-fieldGoalies">
				<For each={match().field.goalie}>
					{(id, idx) => {
						const p = playerById(id);
						return (
							<button
								type="button"
								class="lu-fieldCard lu-fieldGoalie"
								onClick={() => onFieldTap({ kind: 'goalie', index: idx() })}
								disabled={!p}
							>
								<span class="lu-fieldRole">GK</span>
								<span class="lu-fieldName">{p?.name ?? '–'}</span>
								<span class="lu-fieldNum">{p?.number != null ? `#${p.number}` : ''}</span>
							</button>
						);
					}}
				</For>
			</div>
			<div class="lu-fieldGrid">
				<For each={match().field.outfield}>
					{(id, idx) => {
						const p = playerById(id);
						return (
							<button
								type="button"
								class="lu-fieldCard"
								onClick={() => onFieldTap({ kind: 'outfield', index: idx() })}
								disabled={!p}
							>
								<span class="lu-fieldName">{p?.name ?? '–'}</span>
								<span class="lu-fieldNum">{p?.number != null ? `#${p.number}` : ''}</span>
							</button>
						);
					}}
				</For>
			</div>

			<h2 class="lu-h2">Subs ({subPlayers().length})</h2>
			<div class="lu-subsRow">
				<Show when={subPlayers().length > 0} fallback={<p class="lu-muted">No subs.</p>}>
					<For each={subPlayers()}>
						{(p) => (
							<div class="lu-chip lu-chipSub">
								<span class="lu-chipNum">{p.number != null ? `#${p.number}` : ''}</span>
								<span class="lu-chipName">{p.name}</span>
							</div>
						)}
					</For>
				</Show>
			</div>

			<div class="lu-cta">
				<button
					type="button"
					class="lu-btn lu-btnDanger"
					onClick={() => {
						if (window.confirm('End match? Roster is kept; current lineup cleared.')) props.end();
					}}
				>
					End match
				</button>
			</div>

			<SwapSheet
				open={swap() !== null}
				fieldPlayerName={targetName()}
				subs={subPlayers()}
				onPick={performSwap}
				onCancel={() => setSwap(null)}
			/>
		</section>
	);
}
