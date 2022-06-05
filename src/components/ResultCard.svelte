<script lang="ts">
	/** Text shown on the flashcard after flipping.*/
	export let bodyText: string = 'TITLE HERE';
	/** Text shown on the flashcard before flipping.*/
	export let backText: string = 'SNIPPET HERE';
	/** Whether the card has been flipped. Inverted on button click. */
	let isFlipped: boolean = false;
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	/** The index number of the card in the `cardData` array. Used for deletion.*/
	export let index: number;
	const dispatch = createEventDispatcher();
	/** Sends message to parent with `index` to delete specified flashcard */
	function executeDelete(): void {
		console.log(index);
		dispatch('message', {
			index: index
		});
	}
</script>

<div
	class="dark:bg-slate-800 inline-block w-full max-w-md p-6 mx-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl items-stretch"
>
	{#if isFlipped === false}
		<h3 class="dark:text-white text-lg font-medium leading-6 text-gray-900 mb-4">
			{backText}
		</h3>
	{/if}

	{#if isFlipped === true}
		<div class="mt-2">
			<p class="text-lg dark:text-slate-300 overflow-hidden">
				{bodyText}
			</p>
		</div>
		<div class="mt-4" />
	{/if}
	<Button on:click={() => (isFlipped = !isFlipped)} type="primary">Flip</Button>
	<Button type="danger" on:click={() => executeDelete()}>Remove Card</Button>
</div>
