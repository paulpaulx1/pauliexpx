<!-- App.svelte -->
<script>
 import ImageCard from './lib/ImageCard.svelte';
 import ImageOverlay from './lib/ImageOverlay.svelte';
 import { paintings } from './data/paintings'
 
 let selectedPainting = null;
</script>

<main>
 <h1>paulmneenan@gmail.com</h1>
 <div class="gallery">
   {#each paintings as painting}
     <ImageCard 
       blurImageUrl={painting.blurImageUrl}
       fullImageUrl={painting.fullImageUrl}
       title={painting.title}
       description={painting.description}
       on:click={() => selectedPainting = painting}
     />
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
    grid-template-columns: repeat(3, 1fr);  /* Force 3 columns */
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 1200px) {
    .gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: 1fr;
    }
  }

  .gallery-item {
    width: 100%;
  }
</style>