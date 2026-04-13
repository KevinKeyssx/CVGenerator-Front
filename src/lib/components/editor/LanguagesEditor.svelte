<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);

  const levels = [
    { value: 'native', label: 'Nativo' },
    { value: 'fluent', label: 'Fluido' },
    { value: 'advanced', label: 'Avanzado' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'basic', label: 'Basico' }
  ];
</script>

<div class="card p-6 animate-fade-in animate-stagger-4">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-semibold text-foreground">Idiomas</h2>
        <p class="text-sm text-muted-foreground">{cvStore.cvData.languages.length} idiomas</p>
      </div>
    </div>
    <svg 
      class="w-5 h-5 text-muted-foreground transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isExpanded}
    <div class="mt-6 space-y-4 animate-fade-in-down">
      {#each cvStore.cvData.languages as language, index (language.id)}
        <div class="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-md animate-fade-in" style="animation-delay: {index * 0.05}s">
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input 
              type="text" 
              class="input-field"
              placeholder="Nombre del idioma"
              value={language.name}
              oninput={(e) => cvStore.updateLanguage(language.id, 'name', e.currentTarget.value)}
            />
            <select 
              class="input-field"
              value={language.level}
              onchange={(e) => cvStore.updateLanguage(language.id, 'level', e.currentTarget.value)}
            >
              {#each levels as level}
                <option value={level.value}>{level.label}</option>
              {/each}
            </select>
          </div>
          <button 
            onclick={() => cvStore.removeLanguage(language.id)}
            class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/each}

      <button 
        onclick={() => cvStore.addLanguage()}
        class="w-full btn btn-secondary btn-md border-2 border-dashed border-border hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Idioma
      </button>
    </div>
  {/if}
</div>
