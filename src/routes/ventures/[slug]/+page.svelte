<script lang="ts">
  export let data;
  const showcase = data.showcase ?? [];
  let showModal = false;

  // FIX: get slug from layout data
  const slug = data.venture.slug;
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <form
      method="post"
      action={`/ventures/${slug}?/uploadShowcase`}   
      enctype="multipart/form-data"
      class="bg-white p-6 rounded-xl w-96 shadow-xl"
    >
      <h2 class="font-semibold text-xl mb-2">New Showcase Item</h2>
      <p class="text-sm text-gray-600 mb-4">
        Upload an audio or image file. Optional title.
      </p>

      <input
        type="text"
        name="title"
        placeholder="Title (optional)"
        class="w-full border rounded-lg px-3 py-2 mb-4"
      />

      <input
        type="file"
        name="file"
        accept="audio/*,image/*"
        required
        class="mb-4"
      />

      <div class="flex justify-end gap-3">
        <button type="button" on:click={() => showModal = false}>Cancel</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      </div>
    </form>
  </div>
{/if}

<h2 class="text-xl font-semibold mb-4">Showcase</h2>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">

  <div
    class="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
    on:click={() => showModal = true}
  >
    <div class="text-3xl">+</div>
    <div class="text-xs mt-1">Add</div>
  </div>

  {#each showcase as item}
    <div class="relative">

      {#if item.type === "image"}
        <img src={item.file_url} class="w-full h-32 object-cover" />
      {/if}

      {#if item.type === "audio"}
        <div class="w-full h-32 bg-gray-200 flex items-center justify-center">
          <audio controls src={item.file_url} class="w-full px-2"></audio>
        </div>
      {/if}

      {#if item.title}
        <div class="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-2 py-1 rounded">
          {item.title}
        </div>
      {/if}
    </div>
  {/each}

</div>
