<script>
  export let blurImageUrl;
  export let fullImageUrl;
  export let title;
  export let description;

  let fullImageLoaded = false;
</script>

<button type="button" class="card" on:click>
  <div class="image-container">
    <img
      src={blurImageUrl}
      class="blur-thumb"
      alt=""
    />
    <img
      src={fullImageUrl}
      alt={title}
      class:loaded={fullImageLoaded}
      on:load={() => fullImageLoaded = true}
      loading="lazy"
      decoding="async"
    />
  </div>
  
  <div class="info">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
</button>

<style>
  .image-container {
    position: relative;
    aspect-ratio: 3/4;
    width: 100%;
    overflow: hidden;
  }

  .blur-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(10px);
    transform: scale(1.1);
  }

  img:not(.blur-thumb) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .loaded {
    opacity: 1 !important;
  }
</style>