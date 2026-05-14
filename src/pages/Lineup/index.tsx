import { Title } from '@solidjs/meta';
import { createSignal, createEffect, Show, onMount } from 'solid-js';
import Logo from '../../assets/rana-fk.svg';
import { load, save, clearAll } from './storage';
import { LineupStore, emptyStore } from './types';
import Roster from './Roster';
import Setup from './Setup';
import Match from './Match';
import './Lineup.css';

type View = 'roster' | 'setup' | 'match';

export default function Lineup() {
	const [store, setStoreInternal] = createSignal<LineupStore>(emptyStore());
	const [view, setView] = createSignal<View>('roster');
	const [hydrated, setHydrated] = createSignal(false);

	onMount(() => {
		const loaded = load();
		setStoreInternal(loaded);
		if (loaded.match) setView('match');
		else if (loaded.players.length > 0) setView('setup');
		else setView('roster');
		setHydrated(true);
	});

	createEffect(() => {
		if (!hydrated()) return;
		save(store());
	});

	const update = (mut: (s: LineupStore) => LineupStore) => {
		setStoreInternal((prev) => mut({ ...prev }));
	};

	const reset = () => {
		const yes = window.confirm('Clear all players and current match?');
		if (!yes) return;
		clearAll();
		setStoreInternal(emptyStore());
		setView('roster');
	};

	return (
		<>
			<Title>helge - lineup</Title>
			<div class="lu-page">
				<header class="lu-header">
					<button
						type="button"
						class="lu-logoBtn"
						onClick={() => setView('roster')}
						aria-label="Home"
					>
						<img src={Logo} alt="Rana FK" class="lu-logo" />
					</button>
					<h1 class="lu-title">Lineup</h1>
					<button type="button" class="lu-resetBtn" onClick={reset}>
						Reset
					</button>
				</header>

				<Show when={hydrated()}>
					<Show when={view() === 'roster'}>
						<Roster
							store={store}
							update={update}
							next={() => setView(store().players.length > 0 ? 'setup' : 'roster')}
						/>
					</Show>
					<Show when={view() === 'setup'}>
						<Setup
							store={store}
							update={update}
							back={() => setView('roster')}
							start={() => setView('match')}
						/>
					</Show>
					<Show when={view() === 'match'}>
						<Match
							store={store}
							update={update}
							end={() => {
								update((s) => ({ ...s, match: null }));
								setView('setup');
							}}
						/>
					</Show>
				</Show>
			</div>
		</>
	);
}
