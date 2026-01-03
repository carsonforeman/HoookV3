<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  import GlobalNav from "$lib/components/GlobalNav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  // IMPORTANT:
  // - user + viewerProfile come from root +layout.server.ts
  // - profile is PAGE-LEVEL ONLY and should NOT be declared here
  export let data: {
    user: any;
    viewerProfile: any;
  };
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
