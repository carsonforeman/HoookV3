<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";
</script>

<div class="flex flex-col min-h-screen">
  {#if !$page.url.pathname.startsWith("/auth")}
    <!-- Normal pages -->
    <Header />

    <main class="flex-1">
      <slot />
    </main>

    <footer class="p-4 border-t text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Hoook
    </footer>
  {:else}
    <!-- Auth pages get no header/footer -->
    <slot />
  {/if}
</div>
