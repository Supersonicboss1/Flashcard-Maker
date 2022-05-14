<script lang="ts">
	// Imports
	import {
		buttonStyle,
		inputStyle,
		disabledButtonStyle,
	} from "./components/Styles.svelte";
	import ResultCard from "./components/ResultCard.svelte";

	// Variables
	let cardData: {title: string; maintext: string}[] = JSON.parse(localStorage.getItem("cardData"));

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
		//stub, replace with actual code
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
</script>

<svelte:head>
	<!-- head -->
	<title>Flashcard Maker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Better Reddit Search" />
	<meta name="theme-color" content="#0f172a" />
</svelte:head>

<div class="dark:bg-slate-900 h-screen w-screen light">
	<div class="dark:bg-slate-900 flex flex-col my-auto items-center bg-cover">
		<h1 class="dark:text-slate-400 text-black text-8xl">Flashcard Maker</h1>
		<div class="my-5" />
		<form
			class="dark:bg-slate-800 bg-gray-100 shadow-xl w-1/2 rounded-xl border-gray-600 p-4 m-2 flex min-h-fit">
			<div class="p-2 w-full relative">
				<label
					for="query"
					class="leading-7 dark:text-slate-400 text-black mb-3"
					>Title</label>
				<input
					name="query"
					placeholder="Lorum Ipsum"
					class={inputStyle + " w-full"}
					bind:value={newCardTitle}
					on:input={() => validateInput()} />
				<div
					class="p-2 self-stretch flex-auto whitespace-pre-line relative">
					<label
						for="subreddit"
						class="leading-7 dark:text-slate-400 text-black mb-3"
						>Text</label>
					<textarea
						name="subreddit"
						placeholder="Hint: Drag this text box at the corner to expand it!"
						class={inputStyle +
							" w-full flex self-stretch items-stretch overflow-visible min-h-fit overflow-y-hidden"}
						bind:value={newCardBack}
						on:input={() => validateInput()} />
				</div>
				<button
					disabled={ErrorMessage != ""}
					class={ErrorMessage == ""
						? "mx-3 bg-center self-center justify-center content-center w-1/3 bg-cyan-200 hover:bg-cyan-100 " +
						  buttonStyle
						: "mx-3 bg-center self-center justify-center content-center w-1/3 text-white " +
						  disabledButtonStyle}
					on:click|preventDefault={() => createNewCard()}
					>Add Card</button>
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
