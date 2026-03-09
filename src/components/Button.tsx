import { JSX } from 'solid-js';
import { Email } from '../lib/Constants';
import './Button.css';

interface ButtonProps {
	children: JSX.Element;
}

export default function Button(props: ButtonProps) {
	const handleClick = () => {
		window.location.href = `mailto:${Email}`;
	};

	return (
		<div
			class="email-button"
			role="button"
			tabindex={0}
			onClick={handleClick}
			onKeyPress={(e) => e.key === 'Enter' && handleClick()}
		>
			{props.children}
		</div>
	);
}
