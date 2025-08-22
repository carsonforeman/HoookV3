<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Filters from "$lib/components/Filters.svelte"; // new filter component
  import { page } from "$app/stores";

  let location = "";
  let stage = "";
</script>

<div class="flex flex-col min-h-screen">
  {#if !$page.url.pathname.startsWith("/auth")}
    <!-- Normal pages -->
    <Header />

    <!-- Filters bar (shows on all non-auth pages) -->
    <Filters bind:location bind:stage />

    <!-- Add pb-16 so content clears the fixed mobile bottom nav -->
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>
  {:else}
    <!-- Auth pages get no header/footer -->
    <slot />
  {/if}
</div>
