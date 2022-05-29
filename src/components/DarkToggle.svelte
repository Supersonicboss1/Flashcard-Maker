<script lang="ts">
	import { fade } from 'svelte/transition';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	// on:message current value and change
	export let lightModeEnabled: boolean = false;

	if (localStorage.getItem('lightModeEnabled') == null) {
		lightModeEnabled = !window.matchMedia('(prefers-color-scheme: dark)').matches;
		localStorage.setItem('lightModeEnabled', lightModeEnabled.toString());
	}
	lightModeEnabled = localStorage.getItem('lightModeEnabled') == 'true';

	function invertLightMode(): void {
		// Light -> Dark and vice versa
		lightModeEnabled = !lightModeEnabled;
		localStorage.setItem('lightModeEnabled', lightModeEnabled.toString());
	}
</script>

<div>
	<button
		title={`${lightModeEnabled ? 'Enable dark mode' : 'Enable light mode'}`}
		on:click={() => invertLightMode()}
		checked={lightModeEnabled}
		class={`${lightModeEnabled ? 'bg-slate-700' : 'bg-white'}
relative inline-flex shadow-2xl p-1 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
	>
		{#if !lightModeEnabled}
			<div
				in:fade={{ duration: 200 }}
				class={`
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}
			>
				<FaSun />
			</div>
		{:else}
			<div
				in:fade={{ duration: 200 }}
				class={`pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out invert`}
			>
				<FaMoon />
			</div>
		{/if}
	</button>
</div>
