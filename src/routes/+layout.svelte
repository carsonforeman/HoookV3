<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Filters from "$lib/components/Filters.svelte";
  import { page } from "$app/stores";
</script>

<div class="flex flex-col min-h-screen">
  {#if !$page.url.pathname.startsWith("/auth")}
    <!-- Normal pages -->
    <Header />
	<Filters /> 
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>

  {:else}
    <!-- Auth pages -->
    <!-- Mobile: still show Header + bottom nav -->
    <div class="sm:hidden">
      <Header />
      <main class="flex-1 pb-16">
        <slot />
      </main>
    </div>

    <!-- Desktop: no header/footer -->
    <div class="hidden sm:block">
      <slot />
    </div>
  {/if}
</div>
