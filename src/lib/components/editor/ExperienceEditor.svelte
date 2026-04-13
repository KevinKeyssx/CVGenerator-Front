<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);
</script>

<div class="card p-6 animate-fade-in animate-stagger-1">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-semibold text-foreground">Experiencia Laboral</h2>
        <p class="text-sm text-muted-foreground">{cvStore.cvData.experiences.length} posiciones</p>
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
    <div class="mt-6 space-y-6 animate-fade-in-down">
      {#each cvStore.cvData.experiences as experience, index (experience.id)}
        <div class="p-5 bg-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-md animate-scale-in" style="animation-delay: {index * 0.1}s">
          <div class="flex items-start justify-between mb-4">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              {index + 1}
            </span>
            <button 
              onclick={() => cvStore.removeExperience(experience.id)}
              class="p-2 rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Empresa</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Nombre de la empresa"
                value={experience.company}
                oninput={(e) => cvStore.updateExperience(experience.id, 'company', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Cargo</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Tu posicion"
                value={experience.position}
                oninput={(e) => cvStore.updateExperience(experience.id, 'position', e.currentTarget.value)}
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Fecha Inicio</label>
              <input 
                type="month" 
                class="input-field"
                value={experience.startDate}
                oninput={(e) => cvStore.updateExperience(experience.id, 'startDate', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Fecha Fin</label>
              <input 
                type="month" 
                class="input-field"
                value={experience.endDate}
                disabled={experience.current}
                oninput={(e) => cvStore.updateExperience(experience.id, 'endDate', e.currentTarget.value)}
              />
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  class="w-5 h-5 rounded border-border text-primary focus:ring-primary transition-all duration-300"
                  checked={experience.current}
                  onchange={(e) => cvStore.updateExperience(experience.id, 'current', e.currentTarget.checked)}
                />
                <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Trabajo actual</span>
              </label>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <label class="text-sm font-medium text-foreground">Descripcion</label>
            <textarea 
              class="input-field min-h-[80px] resize-y"
              placeholder="Describe tus responsabilidades y funciones..."
              value={experience.description}
              oninput={(e) => cvStore.updateExperience(experience.id, 'description', e.currentTarget.value)}
            ></textarea>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-foreground">Logros</label>
              <button 
                onclick={() => cvStore.addAchievement(experience.id)}
                class="btn btn-ghost btn-sm text-accent"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </button>
            </div>
            {#each experience.achievements as achievement, achIndex}
              <div class="flex items-center gap-2 animate-fade-in">
                <input 
                  type="text" 
                  class="input-field flex-1"
                  placeholder="Describe un logro..."
                  value={achievement}
                  oninput={(e) => cvStore.updateAchievement(experience.id, achIndex, e.currentTarget.value)}
                />
                <button 
                  onclick={() => cvStore.removeAchievement(experience.id, achIndex)}
                  class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            {/each}
          </div>
        </div>
      {/each}

      <button 
        onclick={() => cvStore.addExperience()}
        class="w-full btn btn-secondary btn-md border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Experiencia
      </button>
    </div>
  {/if}
</div>
