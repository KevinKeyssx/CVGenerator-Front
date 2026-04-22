<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
</script>

<button
	onclick={ () => themeStore.toggle() }
	class="btn btn-ghost w-11 h-11 p-0 rounded-xl relative overflow-hidden"
	aria-label="Toggle theme"
>
	<div class="relative w-6 h-6">
		<!-- Sun Icon -->
		<svg
			class="absolute inset-0 transform transition-all duration-500 ease-spring { themeStore.isDark ? '-rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100' }"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
		
		<!-- Moon Icon -->
		<svg
			class="absolute inset-0 transform transition-all duration-500 ease-spring { themeStore.isDark ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0' }"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</div>
</button>

<style>
	.ease-spring {
		transition-timing-function: cubic-bezier( 0.34, 1.56, 0.64, 1 );
	}
</style>
