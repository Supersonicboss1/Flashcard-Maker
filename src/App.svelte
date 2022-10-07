<script lang="ts">
	// Imports
	import ResultCard from './components/ResultCard.svelte';
	// Variables
	/** Current status of light/dark mode - change is handled in component `DarkModeToggle`.*/
	let lightModeEnabled: boolean = false;
	/** Current data of any stored flashcards. Fetched from `localstorage` if available. */
	let cardData: any[] = [
		{
			title: 'Example Flashcard',
			maintext: 'This is an example flashcard.'
		}
	];
	let newCardBack: string = '';
	let newCardTitle: string = '';

	// Set Card Data
	if (localStorage.getItem('cardData') == null) {
		localStorage.setItem('cardData', JSON.stringify(cardData));
	}

	cardData = JSON.parse(localStorage.getItem('cardData') || '[]');
	/** Current error message - shows error component if there is any string.*/
	let isTitle: boolean = false;
	let isBack: boolean = false;

	// Functions
	/** Deletes a flashcard from `cardData` then pushes to `localstorage`*/
	function executeFlashcardDeletion(event: { detail: { index: number } }) {
		cardData.splice(event.detail.index, 1);
		// makes svelte to react to change in `cardData`
		cardData = cardData;
		localStorage.setItem('cardData', JSON.stringify(cardData));
	}

	// New Card
	/** Checks whether input is valid and sets booleans accordingly.
	 * 1. Title is not empty
	 * 2. Back/body is not empty
	 */
	function validateInput(): void {
		// Validate User Input
		newCardTitle == '' ? (isTitle = false) : (isTitle = true);
		newCardBack == '' ? (isBack = false) : (isBack = true);
	}
	/** Creates a new card from user data, and pushes it to the `cardData` array, then `localstorage`*/
	function createNewCard(): void {
		// Create New Card and add it to the array, then push it to local storage
		if (isTitle && isBack && newCardTitle != '' && newCardBack != '') {
			cardData.push({
				title: newCardTitle,
				maintext: newCardBack
			});
			newCardBack = '';
			newCardTitle = '';
			cardData = cardData;
			localStorage.setItem('cardData', JSON.stringify(cardData));
		} else {
			validateInput();
		}
	}

	import DarkModeToggle from './components/DarkToggle.svelte';
	import Button from './components/Button.svelte';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Flashcard Maker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Better Reddit Search" />
	<meta name="theme-color" content="#0f172a" />
</svelte:head>

<div
	lang="en-GB"
	class={`${lightModeEnabled ? 'App ' : 'App dark bg-slate-900 '}  min-h-screen min-w-screen "`}
>
	<div class="dark:bg-slate-900 flex flex-col my-auto items-center bg-cover">
		<div class="absolute right-2 top-2">
			<DarkModeToggle bind:lightModeEnabled />
		</div>
		<h1 class="dark:text-slate-400 text-black md:text-7xl lg:text-8xl text-4xl">Flashcard Maker</h1>
		<div class="my-5" />
		<!-- Flashcard Maker Box -->
		<form
			class="dark:bg-slate-800 bg-gray-100 shadow-xl md:w-1/2 w-4/5 rounded-xl border-gray-600 p-4 m-2 flex min-h-fit"
		>
			<div class="p-2 w-full relative">
				<label for="title" class="leading-7 dark:text-slate-400 text-black mb-3">Title</label>
				<input
					type="text"
					name="title"
					placeholder="Lorum Ipsum"
					class={' input-primary w-full'}
					bind:value={newCardTitle}
					on:input={() => validateInput()}
				/>
				<div class="p-2 w-full relative -translate-x-2">
					<label for="maincardtext" class="leading-7 dark:text-slate-400 text-black mb-3"
						>Text</label
					>
					<textarea
						type="text"
						name="maincardtext"
						placeholder="Hint: Drag this text box at the corner to expand it!"
						class={'input-primary w-full h-max self-stretch items-stretch overflow-visible min-h-fit overflow-y-hidden block resize'}
						bind:value={newCardBack}
						on:input={() => validateInput()}
					/>
				</div>
				<Button
					isDisabled={!isTitle || !isBack}
					type={!isBack || !isTitle ? 'primary' : 'disabled'}
					on:click={() => createNewCard()}>Add Card</Button
				>
			</div>
		</form>
		<!-- Error message - pops up below the entry box if the entered text is invalid. -->
		{#if !isBack || !isTitle}
			<div
				transition:fade={{ duration: 200 }}
				class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
				role="alert"
			>
				<svg
					aria-hidden="true"
					class="flex-shrink-0 inline w-5 h-5 mr-3"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
				<span class="sr-only">Danger</span>
				<div>
					<span class="font-medium">Ensure that these requirements are met:</span>
					<ul class="mt-1.5 ml-4 text-red-700 list-disc list-inside">
						<li>
							Title
							{#if isTitle}
								✅
							{:else}
								❌
							{/if}
						</li>
						<li>
							Body Text
							{#if isBack}
								✅
							{:else}
								❌
							{/if}
						</li>
					</ul>
				</div>
			</div>
		{/if}
	</div>
	<!-- Flashcard Grid Area -->
	<div class="dark:bg-slate-900 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mr-6">
		{#each cardData as card}
			<ResultCard
				backText={card.title}
				bodyText={card.maintext}
				index={cardData.indexOf(card)}
				on:message={executeFlashcardDeletion}
			/>
		{/each}
	</div>
</div>

<style>
	.App {
		font-family: 'Poppins', sans-serif;
	}
</style>
