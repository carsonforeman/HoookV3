<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  import GlobalNav from "$lib/components/GlobalNav.svelte";

  export let data: { user: any; profile: any };
</script>

<div class="flex min-h-screen">

  {#if !$page.url.pathname.startsWith("/auth")}

    <!-- GLOBAL NAV -->
    <GlobalNav {data} />

    <!-- Shift content by 10rem so collapsed sidebar never overlaps -->
    <main
      class="flex-1 min-h-screen pb-20 md:pb-0 md:ml-[10rem]"
    >
      <slot />
    </main>

  {:else}

    <!-- AUTH PAGES -->
    <main class="flex-1 min-h-screen">
      <slot />
    </main>

  {/if}
</div>
