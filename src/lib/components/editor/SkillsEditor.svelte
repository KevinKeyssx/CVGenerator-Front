<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools', 'Soft Skills', 'Otro'];
</script>

<div class="card p-6 animate-fade-in animate-stagger-3">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-semibold text-foreground">Habilidades</h2>
        <p class="text-sm text-muted-foreground">{cvStore.cvData.skills.length} habilidades</p>
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
      {#each cvStore.cvData.skills as skill, index (skill.id)}
        <div class="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:border-amber-500/30 hover:shadow-md animate-fade-in" style="animation-delay: {index * 0.05}s">
          <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <input 
              type="text" 
              class="input-field"
              placeholder="Nombre de la habilidad"
              value={skill.name}
              oninput={(e) => cvStore.updateSkill(skill.id, 'name', e.currentTarget.value)}
            />
            <select 
              class="input-field"
              value={skill.category}
              onchange={(e) => cvStore.updateSkill(skill.id, 'category', e.currentTarget.value)}
            >
              <option value="">Categoria</option>
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground whitespace-nowrap">Nivel:</span>
              <div class="flex gap-1">
                {#each [1, 2, 3, 4, 5] as level}
                  <button
                    onclick={() => cvStore.updateSkill(skill.id, 'level', level)}
                    class="w-6 h-6 rounded-full transition-all duration-300 transform hover:scale-110 {skill.level >= level ? 'bg-amber-500 shadow-md shadow-amber-500/30' : 'bg-muted hover:bg-amber-500/30'}"
                  ></button>
                {/each}
              </div>
            </div>
          </div>
          <button 
            onclick={() => cvStore.removeSkill(skill.id)}
            class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/each}

      <button 
        onclick={() => cvStore.addSkill()}
        class="w-full btn btn-secondary btn-md border-2 border-dashed border-border hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Habilidad
      </button>
    </div>
  {/if}
</div>
