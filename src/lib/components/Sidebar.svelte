<script lang="ts">
  import TemplateSelector from './TemplateSelector.svelte';
  import { cvStore } from '$lib/stores/cv.svelte';
</script>

<aside class="w-80 border-r border-border bg-card/50 backdrop-blur-sm overflow-y-auto scrollbar-hide">
  <div class="p-6 space-y-8">
    <!-- Template Selector -->
    <TemplateSelector />

    <!-- Quick Stats -->
    <div class="space-y-4 animate-fade-in animate-stagger-2">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Resumen del CV
      </h3>
      
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 rounded-xl bg-primary/5 border border-primary/10 transition-all duration-300 hover:bg-primary/10 hover:scale-105">
          <p class="text-2xl font-bold text-primary">{cvStore.cvData.experiences.length}</p>
          <p class="text-xs text-muted-foreground">Experiencias</p>
        </div>
        <div class="p-3 rounded-xl bg-accent/5 border border-accent/10 transition-all duration-300 hover:bg-accent/10 hover:scale-105">
          <p class="text-2xl font-bold text-accent">{cvStore.cvData.education.length}</p>
          <p class="text-xs text-muted-foreground">Educacion</p>
        </div>
        <div class="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 transition-all duration-300 hover:bg-amber-500/10 hover:scale-105">
          <p class="text-2xl font-bold text-amber-600">{cvStore.cvData.skills.length}</p>
          <p class="text-xs text-muted-foreground">Habilidades</p>
        </div>
        <div class="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 transition-all duration-300 hover:bg-cyan-500/10 hover:scale-105">
          <p class="text-2xl font-bold text-cyan-600">{cvStore.cvData.languages.length}</p>
          <p class="text-xs text-muted-foreground">Idiomas</p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="space-y-4 animate-fade-in animate-stagger-3">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Consejos
      </h3>
      
      <div class="space-y-3">
        <div class="p-3 rounded-xl bg-green-500/5 border border-green-500/20 transition-all duration-300 hover:bg-green-500/10">
          <div class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xs text-muted-foreground">Usa verbos de accion para describir tus logros</p>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 transition-all duration-300 hover:bg-blue-500/10">
          <div class="flex items-start gap-2">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xs text-muted-foreground">Cuantifica tus logros con numeros y porcentajes</p>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 transition-all duration-300 hover:bg-purple-500/10">
          <div class="flex items-start gap-2">
            <svg class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p class="text-xs text-muted-foreground">Adapta tu CV para cada oferta de trabajo</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset Button -->
    <button 
      onclick={() => {
        if (confirm('¿Estas seguro de que quieres reiniciar el CV?')) {
          cvStore.resetCV();
        }
      }}
      class="w-full btn btn-ghost btn-sm text-destructive hover:bg-destructive/10 transition-all duration-300"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reiniciar CV
    </button>
  </div>
</aside>
