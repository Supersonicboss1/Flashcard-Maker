<script lang="ts">
	export let bodyText: string = 'TITLE HERE';
	export let backText: string = 'SNIPPET HERE';
	let isFlipped: boolean = false;
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	export let index: number;
	const dispatch = createEventDispatcher();
	function executeDelete(): void {
		console.log(index);
		dispatch('message', {
			index: index,
		});
	}
</script>

<div
	class="dark:bg-slate-800 inline-block w-full max-w-md p-6 mx-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl items-stretch"
>
	{#if isFlipped === false}
		<h3
			class="dark:text-white text-lg font-medium leading-6 text-gray-900 mb-4"
		>
			{backText}
		</h3>
	{/if}

	{#if isFlipped === true}
		<div class="mt-2">
			<p class="text-lg dark:text-slate-300 overflow-hidden">
				{bodyText}
			</p>
		</div>
		<div class="mt-4"></div>
	{/if}
	<Button on:click="{() => (isFlipped = !isFlipped)}" type="primary">
		Flip
	</Button>
	<Button type="danger" on:click="{() => executeDelete()}">
		Remove Card
	</Button>
</div>
