import { JSX, Show, createSignal } from 'solid-js';
import { modalOpened, setModalOpened } from '../lib/store';
import './Modal.css';

interface ModalProps {
	children: JSX.Element;
}

export default function Modal(props: ModalProps) {
	const [closing, setClosing] = createSignal(false);

	const close = () => {
		setClosing(true);
		setTimeout(() => {
			setModalOpened(false);
			setClosing(false);
		}, 300);
	};

	return (
		<Show when={modalOpened()}>
			<div class={`modal${closing() ? ' closing' : ''}`}>
				<div class="backdrop" onClick={close} role="button" tabindex={0} onKeyPress={close} />
				<div class="content-wrapper">
					<div class="content">{props.children}</div>
				</div>
			</div>
		</Show>
	);
}
