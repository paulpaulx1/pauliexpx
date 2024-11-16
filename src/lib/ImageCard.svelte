<script>
    export let imageUrl;
    export let title;
    export let description;
  
    let imageLoaded = false;
  
    function handleLoad() {
      imageLoaded = true;
    }
  </script>
  
  <div
    class="card"
    on:click
    role="button"
    tabindex="0"
  >
    <div class="image-container">
      {#if !imageLoaded}
        <div class="skeleton"></div>
      {/if}
      <img
        src={imageUrl}
        alt={title}
        on:load={handleLoad}
        class:loaded={imageLoaded}
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
    </div>
  
    <div class="info">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
  
  <style>
    .card {
      cursor: pointer;
    }
  
    .image-container {
      position: relative;
    }
  
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s;
    }
  
    .loaded {
      opacity: 1;
    }
  
    .skeleton {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #eee;
    }
  
    .info {
      padding: 1rem;
    }
  </style>