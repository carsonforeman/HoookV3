<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  import GlobalNav from "$lib/components/GlobalNav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data: { user: any; profile: any };
</script>

{#if !$page.url.pathname.startsWith("/auth")}

  <!-- GLOBAL HEADER -->
  <GlobalNav />

  <!-- MAIN CONTENT -->
  <main class="min-h-screen">
    <slot />
  </main>

  <!-- FOOTER -->
  <Footer />

{:else}

  <!-- AUTH PAGES (no nav, no footer) -->
  <main class="min-h-screen">
    <slot />
  </main>

{/if}
