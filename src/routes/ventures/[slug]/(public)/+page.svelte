<script lang="ts">
  export let data;
  const showcase = data.showcase ?? [];
</script>

{#if showcase.length === 0}
  <p class="text-gray-500 text-sm">No showcase items yet.</p>
{/if}

<!-- FULL-WIDTH INSTAGRAM / TIKTOK STYLE GRID -->
<div class="
  grid 
  grid-cols-3              <!-- mobile: 3 across -->
  sm:grid-cols-4           <!-- small screens: 4 -->
  md:grid-cols-5           <!-- desktop: 5 -->
  gap-1                    <!-- tight grid like IG -->
  w-full
">

  {#each showcase as item}
    <div class="relative aspect-square overflow-hidden rounded-lg bg-gray-200">

      {#if item.type === "image"}
        <img
          src={item.file_url}
          class="w-full h-full object-cover"
        />
      {/if}

      {#if item.type === "audio"}
        <div class="w-full h-full bg-gray-300 flex items-center justify-center">
          <audio controls src={item.file_url} class="w-full px-1"></audio>
        </div>
      {/if}

      {#if item.title}
        <div class="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 py-0.5 rounded">
          {item.title}
        </div>
      {/if}

    </div>
  {/each}

</div>
