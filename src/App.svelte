<script lang="ts">
	// Imports
	import {Switch} from "@rgossiaux/svelte-headlessui";
	import { fly } from "svelte/transition";
	import ResultCard from "./components/ResultCard.svelte";
	
	// Variables
	let LightModeEnabled: boolean = false;
	let cardData: any[] = [
		{
			title: "Card 1",
			maintext: "This is card 1",
		},
	];
	if (localStorage.getItem("LightModeEnabled") == null) {
		localStorage.setItem("LightModeEnabled", LightModeEnabled.toString());
	}
	LightModeEnabled = localStorage.getItem("LightModeEnabled") == "true";
	if (localStorage.getItem("cardData") == null) {
		localStorage.setItem("cardData", JSON.stringify(cardData));
	}
	cardData = JSON.parse(localStorage.getItem("cardData"));

	let ErrorMessage: string = "";
	

	function executeDelete(event: {detail: {index: number}}) {
		console.log(event.detail.index);
		cardData.splice(event.detail.index, 1);
		cardData = cardData;
		localStorage.setItem("cardData", JSON.stringify(cardData));
	}

	// new Card
	let newCardBack: string = "";
	let newCardTitle: string = "";
	function validateInput() {
		if (newCardTitle == "") {
			ErrorMessage = "Please enter a title";
		} else if (newCardBack == "") {
			ErrorMessage = "Please enter a text";
		} else ErrorMessage = "";
	}
	function createNewCard() {
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
		LightModeEnabled = !LightModeEnabled;
		localStorage.setItem("LightModeEnabled", LightModeEnabled.toString());
	}
</script>

<svelte:head>
	<!-- head -->
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
				class={`${LightModeEnabled ? "bg-yellow-400" : "bg-blue-400"}
  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
  {#if LightModeEnabled}
				<svg 
					xmlns="http://www.w3.org/2000/svg"
					in:fly="{{ x: -40, duration: 200 }}"
					viewBox="0 0 512 512"
					class={`${
						LightModeEnabled ? "translate-x-9" : "translate-x-0"
					}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}>
					<path
						d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
				</svg>
				{:else}
				<svg in:fly="{{ x: 40, duration: 200 }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class={`${
					LightModeEnabled ? "translate-x-9" : "translate-x-0"
				}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-transparent shadow-lg ring-0 transition duration-200 ease-in-out`}>
					<path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"/>
					</svg>
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
					<button
						disabled={ErrorMessage != ""}
						class={ErrorMessage == ""
							? "mx-3 bg-center self-center justify-center content-center w-1/3 bg-cyan-200 hover:bg-cyan-100 btn-primary"
							: "mx-3 bg-center self-center justify-center content-center w-1/3 text-white btn-disabled"}
						on:click={() => createNewCard()}>Add Card</button>
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
