<script>
  //props are declared with export
  export let imageUrl;
  export let title;
  export let description;

  //local state
  let isExpanded = false;
  let imageLoaded = false;

  //this runs when isExpanded changes
  $: console.log("Image expanded:", isExpanded);

  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  function handleLoad() {
    imageLoaded = true;
  }
</script>

<div class="card"
class:expanded={isExpanded} 
on:click={toggleExpand}
on:keydown={e => e.key === 'Enter' && toggleExpand()}
role="button"
tabindex="0"
>
  <div class="image-container">
    {#if !imageLoaded}
    <div class="skeleton"></div>
    {/if}
    <img src="imageUrl" alt="title" on:load{handleLoad} class:loaded={imageLoaded} />
  </div>

  <div class="info">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  </div>

  <style>
    .card {
      cursor: pointer;
      transition: transform 0.3s;
    }
    
    .expanded {
      transform: scale(1.05);
    }
    
    .image-container {
      position: relative;
      aspect-ratio: 1;
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