<script>
	/*global window */
	import { browser } from '$app/environment';
	import { Email } from '$lib/Constants';

	function handleClick() {
		if (browser) {
			window.location.href = `mailto:${Email}`;
		}
	}
</script>

<div
	class="button"
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keypress={(e) => e.key === 'Enter' && handleClick()}
>
	<slot />
</div>

<style>
	.button {
		cursor: pointer;
		height: 40px;
		max-width: 200px;
		border-radius: 10px;
		background: #ca3c25;

		background-size: 150% 150%;

		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
	}

	.button:hover {
		animation: gradient 2s ease infinite;
	}
</style>
