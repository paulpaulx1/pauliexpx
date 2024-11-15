<!-- App.svelte -->
<script>
  import ImageCard from './lib/ImageCard.svelte';
  import ImageOverlay from './lib/ImageOverlay.svelte';
  import { paintings } from './data/paintings';
  
  let selectedPainting = null;
</script>

<main>
  <h1>paulmneenan@gmail.com</h1>
  <div class="gallery">
    {#each paintings as painting}
      <ImageCard {...painting} on:click={() => selectedPainting = painting} />
    {/each}
  </div>
</main>

{#if selectedPainting}
  <ImageOverlay
    painting={selectedPainting}
    paintings={paintings}
    onClose={() => selectedPainting = null}
  />
{/if}

<style>
  main {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
</style>