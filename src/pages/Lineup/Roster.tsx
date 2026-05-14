import { Accessor, createSignal, For, Show } from 'solid-js';
import { LineupStore, Player } from './types';
import { newId } from './storage';

type Props = {
	store: Accessor<LineupStore>;
	update: (mut: (s: LineupStore) => LineupStore) => void;
	next: () => void;
};

export default function Roster(props: Props) {
	const [name, setName] = createSignal('');
	const [number, setNumber] = createSignal('');
	const [editId, setEditId] = createSignal<string | null>(null);
	const [editName, setEditName] = createSignal('');
	const [editNumber, setEditNumber] = createSignal('');

	const add = () => {
		const n = name().trim();
		if (!n) return;
		const num = number().trim();
		const player: Player = {
			id: newId(),
			name: n,
			number: num ? Number(num) : undefined
		};
		props.update((s) => ({ ...s, players: [...s.players, player] }));
		setName('');
		setNumber('');
	};

	const remove = (id: string) => {
		const p = props.store().players.find((x) => x.id === id);
		if (!p) return;
		if (!window.confirm(`Remove ${p.name}?`)) return;
		props.update((s) => ({ ...s, players: s.players.filter((x) => x.id !== id) }));
	};

	const startEdit = (p: Player) => {
		setEditId(p.id);
		setEditName(p.name);
		setEditNumber(p.number != null ? String(p.number) : '');
	};

	const saveEdit = () => {
		const id = editId();
		if (!id) return;
		const n = editName().trim();
		if (!n) {
			setEditId(null);
			return;
		}
		const numStr = editNumber().trim();
		props.update((s) => ({
			...s,
			players: s.players.map((p) =>
				p.id === id ? { ...p, name: n, number: numStr ? Number(numStr) : undefined } : p
			)
		}));
		setEditId(null);
	};

	return (
		<section class="lu-section">
			<h2 class="lu-h2">Players ({props.store().players.length})</h2>

			<ul class="lu-list">
				<For each={props.store().players}>
					{(p) => (
						<li class="lu-listRow">
							<Show
								when={editId() === p.id}
								fallback={
									<>
										<button
											type="button"
											class="lu-rowMain"
											onClick={() => startEdit(p)}
											aria-label={`Edit ${p.name}`}
										>
											<span class="lu-rowNum">{p.number != null ? `#${p.number}` : '–'}</span>
											<span class="lu-rowName">{p.name}</span>
										</button>
										<button
											type="button"
											class="lu-iconBtn"
											aria-label={`Remove ${p.name}`}
											onClick={() => remove(p.id)}
										>
											✕
										</button>
									</>
								}
							>
								<input
									class="lu-input lu-editName"
									value={editName()}
									onInput={(e) => setEditName(e.currentTarget.value)}
									autofocus
								/>
								<input
									class="lu-input lu-editNum"
									type="number"
									inputMode="numeric"
									value={editNumber()}
									onInput={(e) => setEditNumber(e.currentTarget.value)}
								/>
								<button type="button" class="lu-iconBtn" onClick={saveEdit} aria-label="Save">
									✓
								</button>
								<button
									type="button"
									class="lu-iconBtn"
									onClick={() => setEditId(null)}
									aria-label="Cancel"
								>
									✕
								</button>
							</Show>
						</li>
					)}
				</For>
			</ul>

			<form
				class="lu-addRow"
				onSubmit={(e) => {
					e.preventDefault();
					add();
				}}
			>
				<input
					class="lu-input lu-addName"
					placeholder="Player name"
					value={name()}
					onInput={(e) => setName(e.currentTarget.value)}
				/>
				<input
					class="lu-input lu-addNum"
					placeholder="#"
					type="number"
					inputMode="numeric"
					value={number()}
					onInput={(e) => setNumber(e.currentTarget.value)}
				/>
				<button type="submit" class="lu-btn lu-btnSecondary">
					Add
				</button>
			</form>

			<div class="lu-cta">
				<button
					type="button"
					class="lu-btn lu-btnPrimary"
					disabled={props.store().players.length < 1}
					onClick={() => props.next()}
				>
					Continue →
				</button>
			</div>
		</section>
	);
}
