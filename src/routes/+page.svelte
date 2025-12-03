<script lang="ts">
  import VentureCard from "$lib/components/VentureCard.svelte";

  export let data: { user: any; profile: any; ventures: any[] };

  // ------- SEARCH -------
  let searchTab: "ventures" | "people" = "ventures";
  let query = "";

  // ------- FILTERS -------
  let location = "";
  let stage = "";
  let seeking = "";

  const states = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
    "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
    "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
    "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ];

  const stages = ["Idea", "Starting", "Building", "Growing"];
  const seekings = ["Collaboration", "Mentorship", "Investment"];

  $: filteredVentures = data.ventures.filter((v) => {
    const searchMatch =
      !query ||
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      (v.about && v.about.toLowerCase().includes(query.toLowerCase()));

    const locMatch =
      !location ||
      (v.location && v.location.toLowerCase() === location.toLowerCase());

    const stageMatch =
      !stage ||
      (v.stage && v.stage.toLowerCase() === stage.toLowerCase());

    const seekingMatch =
      !seeking ||
      (v.seeking &&
        v.seeking.map((s) => s.toLowerCase()).includes(seeking.toLowerCase()));

    return searchMatch && locMatch && stageMatch && seekingMatch;
  });

  // Dynamic hero text
  $: heroText =
    searchTab === "ventures"
      ? "Explore Ventures Seeking Collaboration"
      : "Explore Creators Open to Collaboration";
</script>

<!-- ====================== -->
<!-- 🌟 HERO -->
<!-- ====================== -->
<section class="max-w-6xl mx-auto px-4 pt-6 sm:px-6 sm:pt-5">


  <!-- ====================== -->
  <!-- 🔍 SEARCH BAR -->
  <!-- ====================== -->
  <div class="bg-white border rounded-xl shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    <!-- Tabs -->
    <div class="flex gap-4 text-sm font-medium">
      <button
        class="pb-1 border-b-2"
        class:border-blue-600={searchTab === "ventures"}
        class:border-transparent={searchTab !== "ventures"}
        on:click={() => (searchTab = "ventures")}
      >
        Ventures
      </button>

      <button
        class="pb-1 border-b-2"
        class:border-blue-600={searchTab === "people"}
        class:border-transparent={searchTab !== "people"}
        on:click={() => (searchTab = "people")}
      >
        People
      </button>
    </div>

    <!-- Search Input -->
    <div class="flex-1">
      <input
        type="text"
        bind:value={query}
        placeholder={searchTab === "ventures" ? "Search ventures..." : "Search creators..."}
        class="w-full border rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
      />
    </div>
  </div>

  <!-- ====================== -->
  <!-- 🧰 FILTERS (NEW STYLE) -->
  <!-- ====================== -->
<div class="mt-6 flex gap-3 overflow-x-auto pb-2 no-scrollbar">

    <!-- State -->
    <select
      bind:value={location}
      class="rounded-full bg-gray-100 border border-gray-300 text-sm px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All States</option>
      {#each states as s}
        <option value={s}>{s}</option>
      {/each}
    </select>

    <!-- Stage -->
    <select
      bind:value={stage}
      class="rounded-full bg-gray-100 border border-gray-300 text-sm px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Stages</option>
      {#each stages as st}
        <option value={st}>{st}</option>
      {/each}
    </select>

    <!-- Seeking -->
    <select
      bind:value={seeking}
      class="rounded-full bg-gray-100 border border-gray-300 text-sm px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Seeking</option>
      {#each seekings as sk}
        <option value={sk}>{sk}</option>
      {/each}
    </select>

  </div>
</section>

<!-- ====================== -->
<!-- 📦 VENTURE GRID -->
<!-- ====================== -->
<section class="py-12 px-4 sm:px-6">
  <div class="max-w-6xl mx-auto grid gap-6 
              sm:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4">

    {#if searchTab === "people"}
      <p class="col-span-full text-center text-gray-700 text-lg font-medium py-10">
        Searching for creators is coming soon 👤
      </p>

    {:else if filteredVentures.length === 0}
      <p class="col-span-full text-center text-gray-600">
        No ventures match your filters.
      </p>

    {:else}
      {#each filteredVentures as venture}
        <VentureCard {venture} />
      {/each}
    {/if}

  </div>
</section>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
