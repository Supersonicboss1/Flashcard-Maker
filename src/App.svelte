<script lang="ts">
	// Imports
	import ResultCard from './components/ResultCard.svelte';
	import FaExclamationCircle from 'svelte-icons/fa/FaExclamationCircle.svelte';
	// Variables
	/** Current status of light/dark mode - change is handled in component `DarkModeToggle`.*/
	let lightModeEnabled: boolean = false;
	/** Current data of any stored flashcards. Fetched from `localstorage` if available. */
	let cardData: any[] = [
		{
			title: 'Card 1',
			maintext: 'This is card 1'
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
	let errorMessage: string = '';

	// Functions
	/** Deletes a flashcard from `cardData` then pushes to `localstorage`*/
	function executeDelete(event: { detail: { index: number } }) {
		// Delete Card
		console.log(event.detail.index);
		cardData.splice(event.detail.index, 1);
		cardData = cardData;
		localStorage.setItem('cardData', JSON.stringify(cardData));
	}

	// New Card
	/** Checks whether input is valid and sets `errorMessage` accordingly.
	 * 1. Title is not empty
	 * 2. Back/body is not empty
	 */
	function validateInput(): void {
		// Validate User Input
		if (newCardTitle == '') {
			errorMessage = 'Please enter a title!';
		} else if (newCardBack == '') {
			errorMessage = 'Please enter some text!';
		} else errorMessage = '';
	}
	/** Creates a new card from user data, and pushes it to the `cardData` array, then `localstorage`*/
	function createNewCard(): void {
		// Create New Card and add it to the array, then push it to local storage
		if (errorMessage == '' && newCardTitle != '' && newCardBack != '') {
			cardData.push({
				title: newCardTitle,
				maintext: newCardBack
			});
			newCardBack = '';
			newCardTitle = '';
			cardData = cardData;
			localStorage.setItem('cardData', JSON.stringify(cardData));
		} else {
			errorMessage = 'Please enter a title and text!';
		}
	}

	import DarkModeToggle from './components/DarkToggle.svelte';
	import Button from './components/Button.svelte';
</script>

<svelte:head>
	<title>Flashcard Maker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Better Reddit Search" />
	<meta name="theme-color" content="#0f172a" />
</svelte:head>

<html lang="en-GB" class={lightModeEnabled ? 'App' : 'App dark'}>
	<div class="dark:bg-slate-900 h-screen w-screen">
		<div class="dark:bg-slate-900 flex flex-col my-auto items-center bg-cover">
			<div class="absolute right-2 top-2">
				<DarkModeToggle bind:lightModeEnabled />
			</div>
			<h1 class="dark:text-slate-400 text-black md:text-7xl lg:text-8xl text-4xl">
				Flashcard Maker
			</h1>
			<div class="my-5" />
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
						isDisabled={errorMessage != ''}
						type={errorMessage == '' ? 'primary' : 'disabled'}
						on:click={() => createNewCard()}>Add Card</Button
					>
				</div>
			</form>
			{#if errorMessage != ''}
				<div class="w-auto p-4 bg-red-500 rounded-lg border-gray-600 shadow-2xl flex">
					<div class="text-white w-14 h-14">
						<FaExclamationCircle class="w-2 h-2" />
					</div>
					<p class="text-white ml-6 my-3">
						{errorMessage}
					</p>
				</div>
			{/if}
		</div>
		<div class="dark:bg-slate-900 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mr-6">
			{#each cardData as card}
				<ResultCard
					backText={card.title}
					bodyText={card.maintext}
					index={cardData.indexOf(card)}
					on:message={executeDelete}
				/>
			{/each}
		</div>
	</div>
</html>

<style>
	.App {
		font-family: 'Poppins', sans-serif;
	}
</style>
