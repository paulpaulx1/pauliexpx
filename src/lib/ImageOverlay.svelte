<script>
    export let painting;
    export let paintings; 
    export let onClose;
    let dialog;
  
    // Track current position in array
    $: currentIndex = paintings.findIndex(p => p === painting);
  
    function navigateImages(direction) {
      const newIndex = (currentIndex + direction + paintings.length) % paintings.length;
      painting = paintings[newIndex];
    }
  
    function handleKeydown(e) {
      if (e.key === 'ArrowRight') navigateImages(1);
      if (e.key === 'ArrowLeft') navigateImages(-1);
      if (e.key === 'Escape') dialog?.close();
    }
  
    $: if (dialog) dialog.showModal();
  </script>
  
  <svelte:window on:keydown={handleKeydown}/>

<dialog
  bind:this={dialog}
  class="overlay"
  on:close={onClose}
>
  <div class="content">
    <button 
      class="nav-button prev"
      on:click={() => navigateImages(-1)}
      aria-label="Previous"
    >
      ‹
    </button>

    <div class="image-container">
      <img 
        src={painting.fullImageUrl} 
        alt={painting.title} 
      />
      <div class="info">
        <h2>{painting.title}</h2>
        <p>{painting.description}</p>
      </div>
    </div>

    <button 
      class="nav-button next"
      on:click={() => navigateImages(1)}
      aria-label="Next"
    >
      ›
    </button>

    <button 
      class="close-button"
      on:click={() => dialog.close()}
      aria-label="Close"
    >
      ×
    </button>
  </div>
</dialog>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.94);
    border: none;
    padding: 0;
    display: grid;
    place-items: center;
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
  }

  .content {
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  img {
    max-height: 70vh;
    max-width: 100%;
    object-fit: contain;
  }

  .info {
    color: rgb(40, 40, 40);
    text-align: center;
    position: relative;
    width: 100%;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: rgb(40, 40, 40);
    font-size: 2rem;
    cursor: pointer;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgb(71, 71, 71);
    font-size: 4rem;
    padding: 2rem;
    cursor: pointer;
    transition: color 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .nav-button:hover {
    color: rgb(40, 40, 40);
  }

  .prev {
    left: 2rem;
  }

  .next {
    right: 2rem;
  }
</style>
