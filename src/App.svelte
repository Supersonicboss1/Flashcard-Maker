<script lang="ts">
	// Imports
	import {Switch} from "@rgossiaux/svelte-headlessui";
	import {fly} from "svelte/transition";
	import ResultCard from "./components/ResultCard.svelte";
	import FaMoon from "svelte-icons/fa/FaMoon.svelte";
	import FaSun from "svelte-icons/fa/FaSun.svelte";
	// Variables
	// prefers dark mode

	let LightModeEnabled: boolean = false
	let cardData: any[] = [
		{
			title: "Card 1",
			maintext: "This is card 1",
		},
	];
	let newCardBack: string = "";
	let newCardTitle: string = "";
	// Set Light Mode
	if (localStorage.getItem("LightModeEnabled") == null) {
		LightModeEnabled = !window.matchMedia("(prefers-color-scheme: dark)").matches;
		localStorage.setItem("LightModeEnabled", LightModeEnabled.toString());
	}
	LightModeEnabled = localStorage.getItem("LightModeEnabled") == "true";

	// Set Card Data
	if (localStorage.getItem("cardData") == null) {
		localStorage.setItem("cardData", JSON.stringify(cardData));
	}

	cardData = JSON.parse(localStorage.getItem("cardData") || "[]");

	let ErrorMessage: string = "";

	// Functions
	function executeDelete(event: {detail: {index: number}}) {
		// Delete Card
		console.log(event.detail.index);
		cardData.splice(event.detail.index, 1);
		cardData = cardData;
		localStorage.setItem("cardData", JSON.stringify(cardData));
	}

	// New Card

	function validateInput() {
		// Validate User Input
		if (newCardTitle == "") {
			ErrorMessage = "Please enter a title";
		} else if (newCardBack == "") {
			ErrorMessage = "Please enter a text";
		} else ErrorMessage = "";
	}
	function createNewCard() {
		// Create New Card and add it to the array, then push it to local storage
		if (ErrorMessage == "" && newCardTitle != "" && newCardBack != "") {
			cardData.push({
				title: newCardTitle,
				maintext: newCardBack,
			});
			newCardBack = "";
			newCardTitle = "";
			cardData = cardData;
			localStorage.setItem("cardData", JSON.stringify(cardData));
		} else {
			ErrorMessage = "Please enter a title and text";
		}
	}

	function invertLightMode() {
		// Light -> Dark and vice versa
		LightModeEnabled = !LightModeEnabled;
		localStorage.setItem("LightModeEnabled", LightModeEnabled.toString());
	}
	import Button from "./components/Button.svelte";
</script>

<svelte:head>
	<title>Flashcard Maker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Better Reddit Search" />
	<meta name="theme-color" content="#0f172a" />
</svelte:head>

<html lang="en-GB" class={LightModeEnabled ? "" : "dark"}>
	<div class="dark:bg-slate-900 h-screen w-screen">
		<div
			class="dark:bg-slate-900 flex flex-col my-auto items-center bg-cover">
			<div class="absolute right-2 top-2">
				<Switch
					on:change={() => invertLightMode()}
					checked={LightModeEnabled}
					class={`${
						LightModeEnabled ? "bg-yellow-400" : "bg-blue-400"
					}
relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
					{#if LightModeEnabled}
						<div
							in:fly={{x: -40, duration: 200}}
							class={`${
								LightModeEnabled
									? "translate-x-9"
									: "translate-x-0"
							}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}>
							<FaSun />
						</div>
					{:else}
						<div
							in:fly={{x: 40, duration: 200}}
							class={`${
								LightModeEnabled
									? "translate-x-9"
									: "translate-x-0"
							}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}>
							<FaMoon />
						</div>
					{/if}
				</Switch>
			</div>
			<h1 class="dark:text-slate-400 text-black text-8xl">
				Flashcard Maker
			</h1>
			<div class="my-5" />
			<form
				class="dark:bg-slate-800 bg-gray-100 shadow-xl w-1/2 rounded-xl border-gray-600 p-4 m-2 flex min-h-fit">
				<div class="p-2 w-full relative">
					<label
						for="title"
						class="leading-7 dark:text-slate-400 text-black mb-3"
						>Title</label>
					<input
						name="title"
						placeholder="Lorum Ipsum"
						class={" input-primary w-full"}
						bind:value={newCardTitle}
						on:input={() => validateInput()} />
					<div
						class="p-2 self-stretch flex-auto whitespace-pre-line relative">
						<label
							for="maincardtext"
							class="leading-7 dark:text-slate-400 text-black mb-3"
							>Text</label>
						<textarea
							name="maincardtext"
							placeholder="Hint: Drag this text box at the corner to expand it!"
							class={"input-primary w-full flex self-stretch items-stretch overflow-visible min-h-fit overflow-y-hidden"}
							bind:value={newCardBack}
							on:input={() => validateInput()} />
					</div>
					<Button
						isDisabled={ErrorMessage != ""}
						type={ErrorMessage == "" ? "primary" : "disabled"}
						on:click={() => createNewCard()}>Add Card</Button>
					<Button class="danger">Test</Button>
				</div>
			</form>
			{#if ErrorMessage != ""}
				<div
					class="w-auto p-4 bg-red-500 rounded-lg border-gray-600 shadow-2xl flex">
					<p class="text-white text-5xl select-none">!</p>
					<p class="text-white ml-6 my-3">
						{ErrorMessage}
					</p>
				</div>
			{/if}
		</div>
		<div class="dark:bg-slate-900 grid grid-cols-3 gap-4">
			{#each cardData as card}
				<ResultCard
					backText={card.title}
					bodyText={card.maintext}
					index={cardData.indexOf(card)}
					on:message={executeDelete} />
			{/each}
		</div>
	</div>
</html>
