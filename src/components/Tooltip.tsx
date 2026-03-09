import { JSX } from 'solid-js';
import './Tooltip.css';

interface TooltipProps {
	tooltip: string;
	children: JSX.Element;
}

export default function Tooltip(props: TooltipProps) {
	return (
		<div data-tooltip={props.tooltip} class="tooltip-container">
			{props.children}
		</div>
	);
}
