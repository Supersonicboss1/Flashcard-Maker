<script lang="ts">
	let buttonProps = {
		class: [$$restProps.class]
	};
	/** Applies disabled styling to the button if true.*/
	export let isDisabled: boolean = false;
	export let type: 'primary' | 'danger' | 'disabled' = 'primary';
</script>

<button on:click disabled={isDisabled} class={type + ' ' + buttonProps.class}>
	<slot />
</button>

<style lang="postcss">
	.primary {
		@apply inline-flex justify-center px-4 py-2 text-sm text-black font-medium border border-transparent  rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 bg-cyan-200 hover:bg-cyan-50;
	}
	.disabled {
		@apply inline-flex px-4 py-2 text-sm font-medium bg-gray-600 border border-transparent rounded-md bg-center self-center justify-center content-center text-white;
	}
	.danger {
		@apply inline-flex justify-center px-4 py-2 text-sm text-black font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-2 hover:bg-red-400 bg-red-600;
	}
</style>
