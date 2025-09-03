<script lang="ts">
  import { goto } from '$app/navigation';

  // ⬅️ Updated: data comes from +layout.server.ts
  export let user: any = null;
  export let profile: any = null;

  let search = '';
  let menuOpen = false;
  let searchOpen = false;

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }
  function go(path: string) { menuOpen = false; goto(path); }

  function goHome() {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      location.reload();
    } else {
      goto('/');
    }
  }

  function handleYouClick() {
    if (user) goto('/dashboard');
    else goto('/auth/login');
  }

  $: displayName =
    (profile?.first_name || profile?.last_name)
      ? `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim()
      : (user?.email ?? 'Account');

  $: avatarInitial = user?.email?.charAt(0)?.toUpperCase?.() ?? 'U';
</script>

<header class="p-4 border-b border-gray-200 bg-white">
  <!-- MOBILE HEADER -->
  <div class="flex flex-col sm:hidden">
    <div class="flex items-center justify-between">
      {#if searchOpen}
        <button on:click={() => (searchOpen = false)} class="text-gray-600 pr-2">←</button>
        <input
          type="text"
          placeholder="Search ventures..."
          bind:value={search}
          autofocus
          class="flex-1 rounded-full border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      {:else}
        <a href="/" class="flex items-center space-x-2 shrink-0">
          <img src="/images/hoooklogo.png" alt="Hoook Logo" class="h-8 w-auto" />
          <span class="sr-only">Hoook</span>
        </a>
        <button on:click={() => (searchOpen = true)} class="text-gray-600 hover:text-gray-900">🔍</button>
      {/if}
    </div>
  </div>

  <!-- DESKTOP HEADER -->
  <div class="hidden sm:flex items-center justify-between">
    <div class="flex items-center gap-4 flex-1">
      <a href="/" class="flex items-center space-x-2 shrink-0">
        <img src="/images/hoooklogo.png" alt="Hoook Logo" class="h-8 w-auto" />
        <span class="sr-only">Hoook</span>
      </a>

      <div class="w-2/3 max-w-xl">
        <input
          type="text"
          placeholder="Search ventures..."
          bind:value={search}
          class="w-full rounded-full border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      {#if user}
        <button
          on:click={() => goto('/ventures/new')}
          class="border border-gray-400 text-gray-700 bg-gray-100 px-4 py-2 rounded-md
                 hover:bg-gray-200 hover:text-black hover:border-gray-500 transition-colors duration-200 cursor-pointer"
        >
          + New Venture
        </button>

        <button
          class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 overflow-hidden
                 hover:ring-2 hover:ring-blue-600 transition"
          on:click={toggleMenu}
          aria-label="Open account menu"
        >
          {#if profile?.avatar_url}
            <img src={profile.avatar_url} alt="Profile" class="w-10 h-10 rounded-full object-cover" loading="lazy" />
          {:else}
            {avatarInitial}
          {/if}
        </button>
      {:else}
        <button
          on:click={() => goto('/auth/login')}
          class="text-sm text-gray-600 hover:text-gray-900"
        >
          Login
        </button>
      {/if}
    </div>
  </div>
</header>

<!-- SIDE MENU -->
{#if menuOpen}
  <div class="fixed inset-0 bg-black/40 z-40" on:click={closeMenu}></div>

  <aside
    class="fixed inset-y-0 right-0 w-[320px] max-w-[85vw] bg-white z-50 shadow-xl
           transform transition-transform duration-200 translate-x-0"
    role="dialog"
    aria-modal="true"
  >
    <div class="p-4 border-b flex items-center gap-3">
      <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-base font-semibold text-gray-700">
        {#if profile?.avatar_url}
          <img src={profile.avatar_url} alt="Profile" class="w-12 h-12 rounded-full object-cover" />
        {:else}
          {avatarInitial}
        {/if}
      </div>
      <div class="min-w-0">
        <div class="font-semibold truncate">{displayName}</div>
        <div class="text-sm text-gray-500 truncate">{user?.email}</div>
      </div>
      <button class="ml-auto text-gray-500 hover:text-gray-800" on:click={closeMenu} aria-label="Close menu">✕</button>
    </div>

    <nav class="p-2">
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => go('/dashboard')}>
        Dashboard
      </button>
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => go('/ventures')}>
        My Ventures
      </button>
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => go('/profile')}>
        My Profile
      </button>
    </nav>

    <div class="mt-auto p-4 border-t">
      <form method="POST" action="/auth/logout">
        <button
          type="submit"
          class="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
        >
          Log out
        </button>
      </form>
    </div>
  </aside>
{/if}

<!-- MOBILE BOTTOM NAV -->
<nav class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
  <button on:click={goHome} class="flex flex-col items-center text-gray-600 hover:text-gray-900">
    🏠
    <span class="text-xs">Home</span>
  </button>

  {#if user}
    <button
      on:click={() => goto('/ventures/new')}
      class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
    >
      + New Venture
    </button>
  {:else}
    <button
      on:click={() => goto('/mobile-must-signin')}
      class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
    >
      + New Venture
    </button>
  {/if}

  <button on:click={handleYouClick} class="flex flex-col items-center text-gray-600 hover:text-gray-900">
    {#if user}
      {#if profile?.avatar_url}
        <img src={profile.avatar_url} alt="Profile" class="w-6 h-6 rounded-full object-cover" />
      {:else}
        <span class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
          {avatarInitial}
        </span>
      {/if}
    {:else}
      👤
    {/if}
    <span class="text-xs">You</span>
  </button>
</nav>
