<script lang="ts">
  import VentureCard from "$lib/components/VentureCard.svelte";
  import PeopleCard from "$lib/components/PeopleCard.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let data: {
    user: any;
    profile: any;
    ventures: any[];
    people?: any[];
  };

  $: query = $page.url.searchParams.get("q") ?? "";
  $: isSearchMode = $page.url.searchParams.has("q");

  let activeTab: "ventures" | "people" = "ventures";
  let searchInput: HTMLInputElement;

  function runSearch() {
    const q = query.trim();
    if (q) goto(`/?q=${encodeURIComponent(q)}`);
  }

  function clearSearch() {
    goto("/");
  }

  onMount(() => {
    searchInput?.focus();
  });
</script>

<!-- ====================== -->
<!-- 🟦 SEARCH MODE HEADER -->
<!-- ====================== -->
{#if isSearchMode}
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">

      <!-- Logo -->
      <button
        class="text-2xl font-semibold text-blue-600 select-none"
        on:click={clearSearch}
      >
        HO<span class="lowercase">o</span>OK
      </button>

      <!-- Search Input -->
      <input
        bind:this={searchInput}
        type="text"
        bind:value={query}
        placeholder="Search ventures or people"
        class="flex-1 max-w-xl rounded-full px-5 py-2 text-sm
               bg-white border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-blue-500"
        on:keydown={(e) => e.key === "Enter" && runSearch()}
      />
    </div>

    <!-- Tabs -->
    <div class="max-w-6xl mx-auto px-4 flex gap-6 text-sm">
      <button
        class={`py-3 border-b-2 ${
          activeTab === "ventures"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500"
        }`}
        on:click={() => (activeTab = "ventures")}
      >
        Ventures
      </button>

      <button
        class={`py-3 border-b-2 ${
          activeTab === "people"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500"
        }`}
        on:click={() => (activeTab = "people")}
      >
        People
      </button>
    </div>
  </header>

  <!-- SEARCH RESULTS -->
  <section class="max-w-6xl mx-auto px-4 py-8">
    {#if activeTab === "people"}
      {#if data.people && data.people.length > 0}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {#each data.people as person}
            <PeopleCard person={person} />
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-sm">No people found.</p>
      {/if}
    {/if}

    {#if activeTab === "ventures"}
      {#if data.ventures.length > 0}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {#each data.ventures as venture}
            <VentureCard {venture} />
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-sm">No ventures found.</p>
      {/if}
    {/if}
  </section>

{:else}

<!-- ====================== -->
<!-- 🟨 LANDING MODE -->
<!-- ====================== -->
<section class="max-w-6xl mx-auto px-4 pt-28 sm:px-6">

  <!-- BIG CENTER LOGO -->
  <div class="mb-12 text-center select-none">
    <h1 class="text-7xl sm:text-8xl font-semibold tracking-tight text-blue-600">
      HO<span class="lowercase">o</span>OK
    </h1>
  </div>

  <!-- SEARCH -->
  <div class="flex flex-col items-center gap-6">

    <input
      bind:this={searchInput}
      type="text"
      bind:value={query}
      placeholder="Search ventures or people"
      class="w-full max-w-2xl rounded-full px-6 py-3 text-sm
             bg-white border border-gray-300
             focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:keydown={(e) => e.key === "Enter" && runSearch()}
    />

    <button
      on:click={runSearch}
      class="px-6 py-2 text-sm rounded-md
             bg-gray-100 text-gray-700
             hover:bg-gray-200 hover:text-gray-900
             transition"
    >
      Hoook Search
    </button>
  </div>
</section>

<!-- DEFAULT VENTURES -->
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

{/if}
