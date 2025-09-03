<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Filters from "$lib/components/Filters.svelte";
  import VentureCard from "$lib/components/VentureCard.svelte";

  export let data: { user: any; profile: any; ventures: any[] };

  // Filter states
  let location = "";
  let stage = "";
  let seeking = "";

  // Reactive filtered list
  $: filteredVentures = data.ventures.filter((v) => {
    const locMatch = !location || (v.location && v.location.toLowerCase() === location.toLowerCase());
    const stageMatch = !stage || (v.stage && v.stage.toLowerCase() === stage.toLowerCase());
    const seekingMatch = !seeking || (v.seeking && v.seeking.map(s => s.toLowerCase()).includes(seeking.toLowerCase()));

    return locMatch && stageMatch && seekingMatch;
  });
</script>

<!-- Homepage header -->
<Header user={data.user} profile={data.profile} />

<!-- Filters -->
<Filters bind:location bind:stage bind:seeking />

<!-- Venture cards -->
<div class="min-h-screen py-12">
  <div class="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#if filteredVentures.length === 0}
      <p class="col-span-full text-center text-gray-600">
        No ventures match your filter criteria.
      </p>
    {:else}
      {#each filteredVentures as venture}
        <VentureCard {venture} />
      {/each}
    {/if}
  </div>
</div>
