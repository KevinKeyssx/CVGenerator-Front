<script lang="ts">
    import { cvStore } from '$lib/stores/cv.svelte';
    import { generateTemplate } from '$lib/templates';

    let scale = $state( 0.60 );

    const htmlContent = $derived( generateTemplate( cvStore.selectedTemplate.id, cvStore.cvData ) );
</script>

<div class="h-full flex flex-col">
    <!-- Preview Header -->
    <div class="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>

            <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Zoom:</span>

            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button 
                onclick={ () => scale = Math.max( 0.3, scale - 0.1 ) }
                class="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
            </button>

            <span class="text-sm font-mono text-foreground w-12 text-center">{ Math.round( scale * 100 ) }%</span>

            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button 
                onclick={ () => scale = Math.min( 1.2, scale + 0.1 ) }
                class="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>

        <div class="flex items-center gap-2">
            <span class="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                { cvStore.selectedTemplate.name }
            </span>
        </div>
    </div>

    <!-- Preview Content -->
    <div class="flex-1 overflow-auto bg-muted/30 p-8 scrollbar-hide flex flex-col items-center">
        <div 
            class="transition-transform duration-500 ease-out origin-top shrink-0"
            style="transform: scale( { scale } ); width: 800px;"
        >
            <div 
                class="bg-white shadow-2xl shadow-black/20 rounded-lg overflow-hidden transition-all duration-500"
                id="cv-preview"
            >
                {@html htmlContent}
            </div>
        </div>
    </div>
</div>
