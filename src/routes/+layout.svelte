<script lang="ts">
    import '../app.css';

    import { generatePDF }  from '$lib/utils/pdf';
    import { cvStore }      from '$lib/stores/cv.svelte';
    import Header           from '$lib/components/Header.svelte';


    interface Props {
        children: import( 'svelte' ).Snippet;
    }


    let { children }: Props = $props();
    let isGenerating = $state( false );


    async function handleDownload() {
        isGenerating = true;

        try {
            const fileName = `CV_${ cvStore.cvData.personalInfo.fullName.replace( /\s+/g, '_' ) }.pdf`;

            await generatePDF( 'cv-preview', fileName );
        } catch ( error ) {
            console.error( 'Error generating PDF:', error );

            alert( 'Error al generar el PDF. Por favor, intenta de nuevo.' );
        } finally {
            isGenerating = false;
        }
    }
</script>


<svelte:head>
    <title>CV Generator - Crea tu curriculum profesional</title>

    <meta
        name="description"
        content="Genera tu curriculum vitae profesional con multiples plantillas y descargalo en PDF"
    />
</svelte:head>


<main class="h-screen bg-background flex flex-col overflow-hidden">
    <Header onDownload={ handleDownload } { isGenerating } />

    {@render children()}
</main>
