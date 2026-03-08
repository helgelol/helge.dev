import './Hamburger.css';

interface HamburgerProps {
	open: boolean;
	onClick: () => void;
}

export default function Hamburger(props: HamburgerProps) {
	return (
		<button
			aria-label="menu-burger-button"
			class={`hamburger${props.open ? ' open' : ''}`}
			// eslint-disable-next-line solid/reactivity
			onClick={props.onClick}
		>
			<svg width="32" height="24">
				<line id="top" x1="0" y1="2" x2="32" y2="2" />
				<line id="middle" x1="0" y1="12" x2="32" y2="12" />
				<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
			</svg>
		</button>
	);
}
