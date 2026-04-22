<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';

  interface Props {
    onDownload: () => void;
    isGenerating: boolean;
  }

  let { onDownload, isGenerating }: Props = $props();
</script>

<header class="sticky top-0 z-50 glass border-b border-border/50">
  <div class="max-w-[1800px] mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/25">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold gradient-text animate-shimmer bg-[length:200%_auto]">CV Generator</h1>
          <p class="text-xs text-muted-foreground">Crea tu curriculum perfecto</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <ThemeToggle />
        <button 
          onclick={ onDownload }
          disabled={ isGenerating }
          class="btn btn-primary btn-md gap-2 relative overflow-hidden group"
        >
          {#if isGenerating }
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generando...</span>
          {:else}
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Descargar PDF</span>
          {/if}
          <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
        </button>
      </div>
    </div>
  </div>
</header>
