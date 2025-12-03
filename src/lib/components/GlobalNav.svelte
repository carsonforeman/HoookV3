<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import { Compass, LayoutGrid, User, Plus } from "lucide-svelte";

  // ❌ OLD (remove)
  // export let data;
  // const user = data?.user ?? null;
  // const profile = data?.profile ?? null;

  // ✅ NEW (reactive to auth state)
  $: user = $page.data?.user ?? null;
  $: profile = $page.data?.profile ?? null;

  let hover = false;

  const COLLAPSED = "9rem";
  const EXPANDED = "16rem";
  $: sidebarWidth = hover ? EXPANDED : COLLAPSED;

  function go(path: string) {
    goto(path);
  }

  function clickOutside(e: MouseEvent) {
    const el = document.getElementById("global-sidebar");
    if (el && !el.contains(e.target as Node)) {
      hover = false;
    }
  }

  onMount(() => {
    window.addEventListener("click", clickOutside);
  });
</script>


<style>
  .nav-item-hover:hover {
    background-color: rgba(59,130,246,0.09);
  }
</style>

<!-- ============================= -->
<!-- DESKTOP SIDEBAR -->
<!-- ============================= -->
<aside
  id="global-sidebar"
  class="hidden md:flex flex-col bg-white py-6 px-3 fixed h-screen transition-all duration-200 ease-out z-50"
  style="width: {sidebarWidth}"
  on:mouseenter={() => (hover = true)}
  on:mouseleave={() => (hover = false)}
>
  <!-- LOGO -->
  <a href="/" class="mb-10 flex items-center pl-3">
    <img src="/images/round_logo.png" class="w-11 h-11" alt="Hoook logo" />
  </a>

  <nav class="flex flex-col gap-6 mt-2 text-gray-700">

    <!-- Explore -->
    <button
      on:click={() => go("/")}
      class="nav-item-hover rounded-lg py-2 pl-4 flex items-center gap-3"
    >
      <Compass class="w-7 h-7" />
      {#if hover}<span class="text-sm font-medium">Explore</span>{/if}
    </button>

    <!-- Dashboard (only when logged in) -->
    {#if user}
      <button
        on:click={() => go("/dashboard")}
        class="nav-item-hover rounded-lg py-2 pl-4 flex items-center gap-3"
      >
        <LayoutGrid class="w-7 h-7" />
        {#if hover}<span class="text-sm font-medium">Dashboard</span>{/if}
      </button>
    {/if}

    <!-- New Venture -->
    <button
      on:click={() => go(user ? "/ventures/new" : "/auth/login")}
      class="nav-item-hover rounded-lg py-2 pl-4 flex items-center gap-3"
    >
      <Plus class="w-7 h-7" />
      {#if hover}<span class="text-sm font-medium">New Venture</span>{/if}
    </button>
  </nav>

  <!-- PROFILE -->
  <div class="mt-auto pt-8">
    {#if user}
      <!-- Avatar -->
      <button
        on:click={() => go(`/profile/${profile.id}`)}
        class="nav-item-hover rounded-lg py-2 pl-4 flex items-center gap-3"
      >
        {#if profile?.avatar_url}
          <img src={profile.avatar_url} class="w-9 h-9 rounded-full object-cover" />
        {:else}
          <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
            {user.email.charAt(0).toUpperCase()}
          </div>
        {/if}
      </button>

    {:else}
      <!-- Sign In -->
      <button
        on:click={() => go("/auth/login")}
        class="nav-item-hover rounded-lg py-2 pl-4 flex items-center gap-3"
      >
        <User class="w-7 h-7" />
        {#if hover}<span class="text-sm font-medium">Sign In</span>{/if}
      </button>
    {/if}
  </div>
</aside>

<!-- ============================= -->
<!-- MOBILE NAV (pinned bottom) -->
<!-- ============================= -->
<nav
  class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
         flex justify-around items-center py-3 z-50"
>
  <!-- Explore -->
  <button
    on:click={() => go("/")}
    class="relative flex items-center justify-center w-12 h-12"
  >
    <Compass
      class="w-7 h-7 { $page.url.pathname === '/' ? 'text-blue-600' : 'text-gray-700' }"
    />
    {#if $page.url.pathname === '/'}
      <div class="absolute inset-0 rounded-full bg-blue-100 -z-10"></div>
    {/if}
  </button>

  {#if user}
    <!-- Dashboard -->
    <button
      on:click={() => go("/dashboard")}
      class="relative flex items-center justify-center w-12 h-12"
    >
      <LayoutGrid
        class="w-7 h-7 { $page.url.pathname.startsWith('/dashboard') ? 'text-blue-600' : 'text-gray-700' }"
      />
      {#if $page.url.pathname.startsWith('/dashboard')}
        <div class="absolute inset-0 rounded-full bg-blue-100 -z-10"></div>
      {/if}
    </button>

    <!-- Profile -->
    <button
      on:click={() => go(`/profile/${profile.id}`)}
      class="relative flex items-center justify-center w-12 h-12"
    >
      {#if profile?.avatar_url}
        <img
          src={profile.avatar_url}
          class="w-7 h-7 rounded-full object-cover { $page.url.pathname.startsWith('/profile') ? 'ring-2 ring-blue-600' : '' }"
        />
        {#if $page.url.pathname.startsWith('/profile')}
          <div class="absolute inset-0 rounded-full bg-blue-100 -z-10"></div>
        {/if}
      {:else}
        <User
          class="w-7 h-7 { $page.url.pathname.startsWith('/profile') ? 'text-blue-600' : 'text-gray-700' }"
        />
        {#if $page.url.pathname.startsWith('/profile')}
          <div class="absolute inset-0 rounded-full bg-blue-100 -z-10"></div>
        {/if}
      {/if}
    </button>

  {:else}
    <!-- SIGN IN (if logged out) -->
    <button
      on:click={() => go("/auth/login")}
      class="relative flex items-center justify-center w-12 h-12"
    >
      <User class="w-7 h-7 text-gray-700" />
    </button>
  {/if}
</nav>
