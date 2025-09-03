<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  // matches +layout.server.ts
  export let data: { user: any; profile: any };
</script>

<div class="flex flex-col min-h-screen">
  {#if !$page.url.pathname.startsWith("/auth")}
    <!-- Normal pages -->
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>

  {:else}
    <!-- Auth pages -->
    <!-- Mobile: still no header now -->
    <div class="sm:hidden">
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
