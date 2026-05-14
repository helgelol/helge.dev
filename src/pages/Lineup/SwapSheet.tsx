import { For, Show } from 'solid-js';
import { Player } from './types';

type Props = {
	open: boolean;
	fieldPlayerName: string;
	subs: Player[];
	onPick: (subId: string) => void;
	onCancel: () => void;
};

export default function SwapSheet(props: Props) {
	return (
		<Show when={props.open}>
			<div
				class="lu-sheetBackdrop"
				role="button"
				tabindex={-1}
				onClick={() => props.onCancel()}
				aria-label="Close swap"
			>
				<div class="lu-sheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
					<h3 class="lu-sheetTitle">
						Swap <span class="lu-sheetName">{props.fieldPlayerName}</span> with…
					</h3>
					<Show when={props.subs.length > 0} fallback={<p class="lu-muted">No subs available.</p>}>
						<div class="lu-sheetGrid">
							<For each={props.subs}>
								{(sub) => (
									<button
										type="button"
										class="lu-chip lu-chipSub lu-chipLarge"
										onClick={() => props.onPick(sub.id)}
									>
										<span class="lu-chipNum">{sub.number != null ? `#${sub.number}` : ''}</span>
										<span class="lu-chipName">{sub.name}</span>
									</button>
								)}
							</For>
						</div>
					</Show>
					<button
						type="button"
						class="lu-btn lu-btnSecondary lu-sheetCancel"
						onClick={() => props.onCancel()}
					>
						Cancel
					</button>
				</div>
			</div>
		</Show>
	);
}
