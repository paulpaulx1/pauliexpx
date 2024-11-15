<script>
  import ImageCard from './lib/ImageCard.svelte';
  import { paintings } from './data/paintings';
  
  let selectedImage = null;

</script>

<main>
  <h1>paulpaulxart</h1>
  <div class="gallery">
    {#each paintings as painting}
      <ImageCard {...painting} on:click={() => selectedImage = painting} />
    {/each}
  </div>
</main>

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