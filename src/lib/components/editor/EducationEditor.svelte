<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);
</script>

<div class="card p-6 animate-fade-in animate-stagger-2">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-green-500/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-semibold text-foreground">Educacion</h2>
        <p class="text-sm text-muted-foreground">{cvStore.cvData.education.length} titulaciones</p>
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
      {#each cvStore.cvData.education as edu, index (edu.id)}
        <div class="p-5 bg-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-md animate-scale-in" style="animation-delay: {index * 0.1}s">
          <div class="flex items-start justify-between mb-4">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-600 text-sm font-semibold">
              {index + 1}
            </span>
            <button 
              onclick={() => cvStore.removeEducation(edu.id)}
              class="p-2 rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Institucion</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Universidad / Centro educativo"
                value={edu.institution}
                oninput={(e) => cvStore.updateEducation(edu.id, 'institution', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Titulo</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Grado, Master, etc."
                value={edu.degree}
                oninput={(e) => cvStore.updateEducation(edu.id, 'degree', e.currentTarget.value)}
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Campo de estudio</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Especialidad"
                value={edu.field}
                oninput={(e) => cvStore.updateEducation(edu.id, 'field', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Fecha Inicio</label>
              <input 
                type="month" 
                class="input-field"
                value={edu.startDate}
                oninput={(e) => cvStore.updateEducation(edu.id, 'startDate', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Fecha Fin</label>
              <input 
                type="month" 
                class="input-field"
                value={edu.endDate}
                oninput={(e) => cvStore.updateEducation(edu.id, 'endDate', e.currentTarget.value)}
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Descripcion</label>
            <textarea 
              class="input-field min-h-[80px] resize-y"
              placeholder="Informacion adicional sobre tus estudios..."
              value={edu.description}
              oninput={(e) => cvStore.updateEducation(edu.id, 'description', e.currentTarget.value)}
            ></textarea>
          </div>
        </div>
      {/each}

      <button 
        onclick={() => cvStore.addEducation()}
        class="w-full btn btn-secondary btn-md border-2 border-dashed border-border hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Educacion
      </button>
    </div>
  {/if}
</div>
