<script lang="ts">
  import { cvStore } from '$lib/stores/cv.svelte';

  let isExpanded = $state(true);

  function handlePhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        cvStore.updatePersonalInfo('photoUrl', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="card p-6 animate-fade-in">
  <button
    onclick={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between group"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-foreground">Informacion Personal</h2>
    </div>
    <svg 
      class="w-5 h-5 text-muted-foreground transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isExpanded}
    <div class="mt-6 space-y-5 animate-fade-in-down">
      <!-- Photo Upload -->
      <div class="flex items-center gap-4">
        <div class="relative group">
          {#if cvStore.cvData.personalInfo.photoUrl}
            <img 
              src={cvStore.cvData.personalInfo.photoUrl} 
              alt="Foto de perfil"
              class="w-20 h-20 rounded-full object-cover border-2 border-border transition-all duration-300 group-hover:border-primary"
            />
          {:else}
            <div class="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground transition-all duration-300 group-hover:bg-primary/10">
              {cvStore.cvData.personalInfo.fullName.charAt(0) || '?'}
            </div>
          {/if}
          <label class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="file" accept="image/*" class="hidden" onchange={handlePhotoUpload} />
          </label>
        </div>
        <div class="text-sm text-muted-foreground">
          <p class="font-medium">Foto de perfil</p>
          <p>Haz clic para cambiar</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Nombre Completo</label>
          <input 
            type="text" 
            class="input-field"
            placeholder="Juan Perez"
            value={cvStore.cvData.personalInfo.fullName}
            oninput={(e) => cvStore.updatePersonalInfo('fullName', e.currentTarget.value)}
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Titulo Profesional</label>
          <input 
            type="text" 
            class="input-field"
            placeholder="Desarrollador Full Stack"
            value={cvStore.cvData.personalInfo.title}
            oninput={(e) => cvStore.updatePersonalInfo('title', e.currentTarget.value)}
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Email</label>
          <input 
            type="email" 
            class="input-field"
            placeholder="email@ejemplo.com"
            value={cvStore.cvData.personalInfo.email}
            oninput={(e) => cvStore.updatePersonalInfo('email', e.currentTarget.value)}
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Telefono</label>
          <input 
            type="tel" 
            class="input-field"
            placeholder="+34 612 345 678"
            value={cvStore.cvData.personalInfo.phone}
            oninput={(e) => cvStore.updatePersonalInfo('phone', e.currentTarget.value)}
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Ubicacion</label>
          <input 
            type="text" 
            class="input-field"
            placeholder="Madrid, Espana"
            value={cvStore.cvData.personalInfo.location}
            oninput={(e) => cvStore.updatePersonalInfo('location', e.currentTarget.value)}
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Sitio Web</label>
          <input 
            type="text" 
            class="input-field"
            placeholder="miweb.com"
            value={cvStore.cvData.personalInfo.website}
            oninput={(e) => cvStore.updatePersonalInfo('website', e.currentTarget.value)}
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-foreground">LinkedIn</label>
        <input 
          type="text" 
          class="input-field"
          placeholder="linkedin.com/in/usuario"
          value={cvStore.cvData.personalInfo.linkedin}
          oninput={(e) => cvStore.updatePersonalInfo('linkedin', e.currentTarget.value)}
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-foreground">Resumen Profesional</label>
        <textarea 
          class="input-field min-h-[120px] resize-y"
          placeholder="Describe tu perfil profesional, experiencia y objetivos..."
          value={cvStore.cvData.personalInfo.summary}
          oninput={(e) => cvStore.updatePersonalInfo('summary', e.currentTarget.value)}
        ></textarea>
      </div>
    </div>
  {/if}
</div>
