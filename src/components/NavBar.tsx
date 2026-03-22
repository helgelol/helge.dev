import { createSignal, createEffect, onCleanup } from 'solid-js';
import { For } from 'solid-js';
import { useLocation } from '@solidjs/router';
import Hamburger from './Hamburger';
import routes from '../lib/NavRoutes';
import Logo from '../assets/logo.svg';
import './NavBar.css';

export default function NavBar() {
	const [opened, setOpened] = createSignal(false);
	const location = useLocation();
	let navRef: HTMLDivElement | undefined;

	createEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		location.pathname; // track for reactivity
		setOpened(false);
	});

	createEffect(() => {
		if (opened()) {
			const handleClickOutside = (e: MouseEvent) => {
				if (navRef && !navRef.contains(e.target as Node)) {
					setOpened(false);
				}
			};
			document.addEventListener('click', handleClickOutside);
			onCleanup(() => document.removeEventListener('click', handleClickOutside));
		}
	});

	const isActive = (href: string) => location.pathname === href;

	return (
		<div ref={navRef} class={opened() ? 'NavBar open' : 'NavBar'}>
			<div class="innerContainer">
				<a href="/">
					<img src={Logo} alt="logo" class="logo" />
				</a>
				<div class="burger">
					<Hamburger open={opened()} onClick={() => setOpened(!opened())} />
				</div>
				<div class="buttons">
					<For each={routes}>
						{(route) => (
							<a class={`button${isActive(route.href) ? ' selected' : ''}`} href={route.href}>
								{route.label}
							</a>
						)}
					</For>
				</div>
			</div>
			<div class="responsiveButtons buttons">
				<For each={routes}>
					{(route) => (
						<a class={`button${isActive(route.href) ? ' selected' : ''}`} href={route.href}>
							{route.label}
						</a>
					)}
				</For>
			</div>
		</div>
	);
}
