<script>
  import ImageCard from "./ImageCard.svelte";

import { paintings } from "../data/paintings";
  let selectedImage = null;
  let overlayVisible = false;

  function handleSelect(image) {
    selectedImage = image;
    overlayVisible = true;
  }

  function closeOverlay() {
    overlayVisible = false;
    setTimeout(() => (selectedImage = null), 300); 
  }
</script>

<div class="grid">
  {#each paintings as painting}
    <ImageCard {...painting} on:click={() => handleSelect(painting)} />
  {/each}
</div>

{#if selectedImage}
  <div
    class="overlay"
    class:visible={overlayVisible}
    role="dialog"
    aria-modal="true">
    <img src={selectedImage.imageUrl} alt={selectedImage.title} />
    <button
      class="close-button"
      on:click={closeOverlay}
      aria-label="Close image view">
      ×
    </button>
  </div>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .overlay img {
    max-height: 90vh;
    max-width: 90vw;
    object-fit: contain;
  }
</style>
