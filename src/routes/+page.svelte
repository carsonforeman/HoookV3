<script lang="ts">
  import VentureCard from "$lib/components/VentureCard.svelte";

  export let data: { user: any; profile: any; ventures: any[] };

  // UI only for now
  let query = "";
</script>

<!-- ====================== -->
<!-- 🌟 HERO / SEARCH -->
<!-- ====================== -->
<section class="max-w-6xl mx-auto px-4 pt-16 sm:px-6">

  <!-- Logo -->
  <div class="mb-8 text-center select-none">
    <h1 class="text-5xl sm:text-6xl font-semibold tracking-tight text-blue-600">
      HO<span class="lowercase">o</span>OK
    </h1>
    <p class="mt-3 text-gray-500 text-sm">
      Discover what people are building
    </p>
  </div>

  <!-- Search (visual only) -->
  <div class="flex flex-col items-center gap-4">
    <input
      type="text"
      bind:value={query}
      placeholder="Search ventures or people…"
      class="w-full max-w-2xl border rounded-full px-6 py-3 text-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-gray-50 shadow-sm"
    />

    <button
      class="px-6 py-2 text-sm rounded-md border bg-gray-100
             hover:bg-gray-200 transition shadow-sm"
    >
      Hoook Search
    </button>
  </div>

</section>

<!-- ====================== -->
<!-- 📦 VENTURE GRID (ORIGINAL BEHAVIOR) -->
<!-- ====================== -->
<section class="py-12 px-4 sm:px-6">
  <div
    class="max-w-6xl mx-auto grid gap-6
           sm:grid-cols-2
           lg:grid-cols-3
           xl:grid-cols-4"
  >
    {#each data.ventures as venture}
      <VentureCard {venture} />
    {/each}
  </div>
</section>
