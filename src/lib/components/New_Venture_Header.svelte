<script lang="ts">
  import { goto } from '$app/navigation';

  export let user: any = null;
  export let profile: any = null;

  let menuOpen = false;

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  $: displayName =
    (profile?.first_name || profile?.last_name)
      ? `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim()
      : (user?.email ?? 'Account');

  $: avatarInitial = user?.email?.charAt(0)?.toUpperCase?.() ?? 'U';
</script>

<header class="p-4 border-b border-gray-200 bg-white shadow-md shadow-gray-300/60">
  <!-- MOBILE HEADER -->
  <div class="flex items-center justify-center sm:hidden">
    <a href="/" class="flex items-center space-x-2 shrink-0">
      <img src="/images/hoooklogo.png" alt="Hoook Logo" class="h-8 w-auto" />
      <span class="sr-only">Hoook</span>
    </a>
  </div>

  <!-- DESKTOP HEADER -->
  <div class="hidden sm:flex items-center justify-between">
    <a href="/" class="flex items-center space-x-2 shrink-0">
      <img src="/images/hoooklogo.png" alt="Hoook Logo" class="h-8 w-auto" />
      <span class="sr-only">Hoook</span>
    </a>

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
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => goto('/dashboard')}>
        Dashboard
      </button>
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => goto('/ventures')}>
        My Ventures
      </button>
      <button class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" on:click={() => goto('/profile')}>
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
