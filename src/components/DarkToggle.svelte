<script lang="ts">
	import { fade } from 'svelte/transition';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	// on:message current value and change
	export let LightModeEnabled: boolean = false;

	if (localStorage.getItem('LightModeEnabled') == null) {
		LightModeEnabled = !window.matchMedia('(prefers-color-scheme: dark)')
			.matches;
		localStorage.setItem('LightModeEnabled', LightModeEnabled.toString());
	}
	LightModeEnabled = localStorage.getItem('LightModeEnabled') == 'true';

	function invertLightMode(): void {
		// Light -> Dark and vice versa
		LightModeEnabled = !LightModeEnabled;
		localStorage.setItem('LightModeEnabled', LightModeEnabled.toString());
	}
</script>

<div>
	<button
		title="{`${
			LightModeEnabled ? 'Enable dark mode' : 'Enable light mode'
		}`}"
		on:click="{() => invertLightMode()}"
		checked="{LightModeEnabled}"
		class="{`${LightModeEnabled ? 'bg-slate-700' : 'bg-white'}
relative inline-flex shadow-2xl p-1 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}"
	>
		{#if !LightModeEnabled}
			<div
				in:fade="{{ duration: 200 }}"
				class="{`
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}"
			>
				<FaSun />
			</div>
		{:else}
			<div
				in:fade="{{ duration: 200 }}"
				class="{`pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out invert`}"
			>
				<FaMoon />
			</div>
		{/if}
	</button>
</div>
