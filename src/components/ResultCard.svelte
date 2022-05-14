<script lang="ts">
	import {buttonStyle} from "./Styles.svelte";
    export let bodyText: string = "TITLE HERE"
    export let backText: string = "SNIPPET HERE"
	let isFlipped: boolean = false
	import { createEventDispatcher } from 'svelte';
	export let index: number = 0
	const dispatch = createEventDispatcher();
	function executeDelete() {
		console.log(index);
		dispatch('message', {
			index: index,
		});
	}
</script>

<div
	class="dark:bg-slate-800 inline-block w-full max-w-md p-6 mx-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl items-stretch">
	{#if isFlipped == false}
	<h3
		class="dark:text-white text-lg font-medium leading-6 text-gray-900 mb-4">
		{backText}
	</h3>
	{/if}

	{#if isFlipped == true}
	<div class="mt-2">
		<p class="text-lg dark:text-slate-300 overflow-hidden">
			{bodyText}
		</p>
	</div>
	<div class="mt-4" />
	{/if}
	<button class={buttonStyle + " bg-cyan-200 hover:bg-cyan-50 "} on:click={() => isFlipped = !isFlipped}>Flip</button>
	<button class={buttonStyle + " ml-2 bg-red-600 hover:bg-red-400"} on:click={() => executeDelete()}>Remove Card</button>

</div>
