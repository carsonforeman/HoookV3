<script lang="ts">
  import VentureCard from "$lib/components/VentureCard.svelte";
  export let data;
</script>

<div class="min-h-screen bg-[#f0f8ff] py-12">
  <div class="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#if data.ventures.length === 0}
      <p class="col-span-full text-center text-gray-600">
        No ventures yet. Be the first to create one!
      </p>
    {:else}
      {#each data.ventures as venture}
        <VentureCard {venture} />
      {/each}
    {/if}
  </div>
</div>
