<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';
  import type { Template } from '$lib/types';

  const templatePreviews: Record<string, { gradient: string; icon: string }> = {
    modern: { 
      gradient: 'from-blue-500 to-purple-500',
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
    },
    classic: { 
      gradient: 'from-gray-700 to-gray-900',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    creative: { 
      gradient: 'from-pink-500 to-amber-500',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
    },
    minimal: { 
      gradient: 'from-slate-600 to-slate-800',
      icon: 'M4 6h16M4 12h8m-8 6h16'
    }
  };
</script>

<div class="space-y-4">
  <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
    Selecciona una Plantilla
  </h3>
  
  <div class="grid grid-cols-2 gap-4">
    {#each cvStore.templates as template, index}
      {@const preview = templatePreviews[template.id]}
      <button
        onclick={() => cvStore.selectTemplate(template)}
        class="group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 {cvStore.selectedTemplate.id === template.id ? 'border-primary shadow-xl shadow-primary/20' : 'border-border hover:border-primary/50'} animate-fade-in"
        style="animation-delay: {index * 0.1}s"
      >
        <!-- Preview -->
        <div class="aspect-[3/4] bg-gradient-to-br {preview.gradient} p-4 relative overflow-hidden">
          <!-- Mock CV Lines -->
          <div class="space-y-3 opacity-80">
            <div class="h-8 w-2/3 bg-white/30 rounded animate-pulse"></div>
            <div class="h-4 w-1/2 bg-white/20 rounded"></div>
            <div class="mt-6 space-y-2">
              <div class="h-3 w-full bg-white/20 rounded"></div>
              <div class="h-3 w-5/6 bg-white/20 rounded"></div>
              <div class="h-3 w-4/6 bg-white/20 rounded"></div>
            </div>
            <div class="mt-4 space-y-2">
              <div class="h-4 w-1/3 bg-white/30 rounded"></div>
              <div class="h-3 w-full bg-white/15 rounded"></div>
              <div class="h-3 w-5/6 bg-white/15 rounded"></div>
            </div>
          </div>
          
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
            <span class="text-white font-medium px-4 py-2 bg-white/20 rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {cvStore.selectedTemplate.id === template.id ? 'Seleccionada' : 'Seleccionar'}
            </span>
          </div>

          <!-- Icon -->
          <div class="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={preview.icon} />
            </svg>
          </div>

          <!-- Selected Check -->
          {#if cvStore.selectedTemplate.id === template.id}
            <div class="absolute top-3 left-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          {/if}
        </div>

        <!-- Info -->
        <div class="p-3 bg-card text-left">
          <h4 class="font-semibold text-foreground">{template.name}</h4>
          <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">{template.description}</p>
        </div>
      </button>
    {/each}
  </div>
</div>
