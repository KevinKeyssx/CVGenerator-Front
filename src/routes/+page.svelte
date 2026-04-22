<script lang="ts">
    import Sidebar              from '$lib/components/Sidebar.svelte';
    import CVPreview            from '$lib/components/CVPreview.svelte';
    import PersonalInfoEditor   from '$lib/components/editor/PersonalInfoEditor.svelte';
    import ExperienceEditor     from '$lib/components/editor/ExperienceEditor.svelte';
    import EducationEditor      from '$lib/components/editor/EducationEditor.svelte';
    import SkillsEditor         from '$lib/components/editor/SkillsEditor.svelte';
    import LanguagesEditor      from '$lib/components/editor/LanguagesEditor.svelte';
    import ProjectsEditor       from '$lib/components/editor/ProjectsEditor.svelte';
    import { cvStore }          from '$lib/stores/cv.svelte';


    let showPreview = $state( false );
</script>

<div class="flex-1 flex overflow-hidden">
    <!-- Sidebar - Hidden on mobile -->
    <div class="hidden lg:block">
        <Sidebar />
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <!-- Editor Section -->
        <section class="flex-1 lg:w-2/3 overflow-y-auto min-h-0 p-6 space-y-6 editor-scrollbar { showPreview ? 'hidden lg:block' : '' }">
            <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
                <!-- Mobile Template Selector -->
                <div class="lg:hidden card p-4 animate-fade-in">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Plantilla: { cvStore.selectedTemplate.name }
                        </h3>

                        <div class="flex gap-2">
                            {#each cvStore.templates as template }
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button
                                    onclick={ () => cvStore.selectTemplate( template ) }
                                    class="w-8 h-8 rounded-lg transition-all duration-300 { cvStore.selectedTemplate.id === template.id ? 'ring-2 ring-primary ring-offset-2' : 'opacity-60 hover:opacity-100' }"
                                    style="background: linear-gradient( 135deg, { template.primaryColor }, { template.accentColor } )"
                                ></button>
                            {/each }
                        </div>
                    </div>
                </div>

                <PersonalInfoEditor />
                <ExperienceEditor />
                <EducationEditor />
                <SkillsEditor />
                <LanguagesEditor />
                <ProjectsEditor />
            </div>
        </section>

        <!-- Preview Panel -->
        <div class="flex-1 lg:w-1/2 border-l border-border bg-muted/20 { showPreview ? '' : 'hidden lg:block' }">
            <CVPreview />
        </div>
    </main>
</div>

<!-- Mobile Preview Toggle -->
<div class="lg:hidden fixed bottom-6 right-6 z-50">
    <button
        onclick={ () => showPreview = !showPreview }
        class="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
    >
        {#if showPreview }
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        {:else}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        {/if}
    </button>
</div>

<!-- Mobile Stats Bar -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
    <div class="flex justify-around">
        <div class="text-center">
            <p class="text-lg font-bold text-primary">{ cvStore.cvData.experiences.length }</p>

            <p class="text-xs text-muted-foreground">Exp.</p>
        </div>

        <div class="text-center">
            <p class="text-lg font-bold text-accent">{ cvStore.cvData.education.length }</p>

            <p class="text-xs text-muted-foreground">Edu.</p>
        </div>

        <div class="text-center">
            <p class="text-lg font-bold text-amber-600">{ cvStore.cvData.skills.length }</p>

            <p class="text-xs text-muted-foreground">Skills</p>
        </div>

        <div class="text-center">
            <p class="text-lg font-bold text-cyan-600">{ cvStore.cvData.languages.length }</p>

            <p class="text-xs text-muted-foreground">Idiomas</p>
        </div>
    </div>
</div>
