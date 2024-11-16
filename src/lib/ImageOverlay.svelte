<script>
  export let painting;
  export let paintings;
  export let onClose;
  let dialog;
  let fullImageLoaded = false;

  $: currentIndex = paintings.findIndex(p => p === painting);

  function navigateImages(direction) {
    const newIndex = (currentIndex + direction + paintings.length) % paintings.length;
    painting = paintings[newIndex];
    fullImageLoaded = false;
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowRight') navigateImages(1);
    if (e.key === 'ArrowLeft') navigateImages(-1);
    if (e.key === 'Escape') dialog?.close();
  }

  $: if (dialog) dialog.showModal();
</script>

<svelte:window on:keydown={handleKeydown}/>

<dialog bind:this={dialog} class="overlay" on:close={onClose}>
  <div class="content">
    <div class="image-wrapper">
      <div class="image-navigation">
        <button class="nav-button prev" on:click={() => navigateImages(-1)} aria-label="Previous">‹</button>
        
        <div class="image-container">
          <img 
            src={painting.blurImageUrl}
            class="blur-thumb"
            class:hidden={fullImageLoaded}
            alt=""
          />
          <img
            src={painting.fullImageUrl}
            alt={painting.title}
            class:loaded={fullImageLoaded}
            on:load={() => fullImageLoaded = true}
          />
        </div>

        <button class="nav-button next" on:click={() => navigateImages(1)} aria-label="Next">›</button>
      </div>

      <div class="info">
        <h2>{painting.title}</h2>
        <p>{painting.description}</p>
      </div>
    </div>

    <button class="close-button" on:click={() => dialog.close()} aria-label="Close">×</button>
  </div>
</dialog>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.94);
    border: none;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .image-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blur-thumb {
    max-height: 70vh;
    max-width: 70vw;
    filter: blur(10px);
    transform: scale(1.05);
    transition: opacity 0.5s ease;
  }

  img:not(.blur-thumb) {
    position: absolute;
    max-height: 70vh;
    max-width: 70vw;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .nav-button {
    background: none;
    border: none;
    color: rgb(71, 71, 71);
    font-size: 4rem;
    cursor: pointer;
    transition: color 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 1rem;
  }

  .nav-button:hover {
    color: rgb(40, 40, 40);
  }

  .close-button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: rgb(40, 40, 40);
    font-size: 2rem;
    cursor: pointer;
  }

  .info {
    text-align: center;
    color: rgb(40, 40, 40);
    padding: 2rem;
  }

  .info h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  .info p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }

  .hidden {
    opacity: 0;
  }

  .loaded {
    opacity: 1 !important;
  }
</style>