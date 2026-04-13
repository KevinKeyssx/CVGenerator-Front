<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);
  let newTech = $state<Record<string, string>>({});
</script>

<div class="card p-6 animate-fade-in animate-stagger-5">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-rose-500/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-semibold text-foreground">Proyectos</h2>
        <p class="text-sm text-muted-foreground">{cvStore.cvData.projects.length} proyectos</p>
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
      {#each cvStore.cvData.projects as project, index (project.id)}
        <div class="p-5 bg-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:border-rose-500/30 hover:shadow-md animate-scale-in" style="animation-delay: {index * 0.1}s">
          <div class="flex items-start justify-between mb-4">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 text-sm font-semibold">
              {index + 1}
            </span>
            <button 
              onclick={() => cvStore.removeProject(project.id)}
              class="p-2 rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Nombre del Proyecto</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="Mi proyecto increible"
                value={project.name}
                oninput={(e) => cvStore.updateProject(project.id, 'name', e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">URL</label>
              <input 
                type="text" 
                class="input-field"
                placeholder="github.com/usuario/proyecto"
                value={project.url}
                oninput={(e) => cvStore.updateProject(project.id, 'url', e.currentTarget.value)}
              />
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <label class="text-sm font-medium text-foreground">Descripcion</label>
            <textarea 
              class="input-field min-h-[80px] resize-y"
              placeholder="Describe tu proyecto..."
              value={project.description}
              oninput={(e) => cvStore.updateProject(project.id, 'description', e.currentTarget.value)}
            ></textarea>
          </div>

          <div class="space-y-3">
            <label class="text-sm font-medium text-foreground">Tecnologias</label>
            <div class="flex flex-wrap gap-2">
              {#each project.technologies as tech, techIndex}
                <span class="inline-flex items-center gap-1 px-3 py-1 bg-rose-500/10 text-rose-600 rounded-full text-sm font-medium transition-all duration-300 hover:bg-rose-500/20 animate-scale-in">
                  {tech}
                  <button 
                    onclick={() => cvStore.removeTechnology(project.id, techIndex)}
                    class="ml-1 hover:text-rose-800 transition-colors duration-300"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              {/each}
            </div>
            <div class="flex gap-2">
              <input 
                type="text" 
                class="input-field flex-1"
                placeholder="Agregar tecnologia..."
                bind:value={newTech[project.id]}
                onkeydown={(e) => {
                  if (e.key === 'Enter' && newTech[project.id]?.trim()) {
                    cvStore.addTechnology(project.id, newTech[project.id].trim());
                    newTech[project.id] = '';
                  }
                }}
              />
              <button 
                onclick={() => {
                  if (newTech[project.id]?.trim()) {
                    cvStore.addTechnology(project.id, newTech[project.id].trim());
                    newTech[project.id] = '';
                  }
                }}
                class="btn btn-primary btn-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}

      <button 
        onclick={() => cvStore.addProject()}
        class="w-full btn btn-secondary btn-md border-2 border-dashed border-border hover:border-rose-500/50 hover:bg-rose-500/5 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Proyecto
      </button>
    </div>
  {/if}
</div>
