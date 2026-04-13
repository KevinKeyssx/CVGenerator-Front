<script lang="ts">
  import '../app.css';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <title>CV Generator - Crea tu curriculum profesional</title>
  <meta name="description" content="Genera tu curriculum vitae profesional con multiples plantillas y descargalo en PDF" />
</svelte:head>

{@render children()}
