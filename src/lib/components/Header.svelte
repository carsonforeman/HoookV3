<script>
  import { goto } from '$app/navigation';
  import { user, profile, loadProfile } from '$lib/stores/user';
  import { supabase } from '$lib/supabaseClient';

  let search = '';
  let menuOpen = false;

  async function handleLogout() {
    await supabase.auth.signOut();
    loadProfile();
    menuOpen = false;
    goto('/auth/login');
  }

  function openMenu() {
    if ($profile) menuOpen = true;
  }
  function closeMenu() {
    menuOpen = false;
  }
  function go(path) {
    menuOpen = false;
    goto(path);
  }

  // Display name fallback
  $: displayName =
    ($profile?.first_name || $profile?.last_name)
      ? `${$profile?.first_name ?? ''} ${$profile?.last_name ?? ''}`.trim()
      : ($user?.email ?? 'Account');

  // Avatar fallback initial
  $: avatarInitial = ($user?.email?.charAt(0)?.toUpperCase?.() ?? 'U');
</script>

<header class="p-4 border-b border-gray-200 bg-white">
  <!-- MOBILE layout -->
  <div class="flex flex-col sm:hidden">
    <!-- Row 1: Logo + Right side (auth/actions) -->
    <div class="flex items-center justify-between">
      <a href="/" class="flex items-center space-x-2 shrink-0">
        <img src="/images/hoooklogo.png" alt="Hoook Logo" class="h-8 w-auto" />
        <span class="sr-only">Hoook</span>
      </a>

      <!-- Right side actions -->
      <div class="flex items-center gap-3">
        {#if $profile}
          <!-- New Venture (outline, flips on hover) -->
          <button
            on:click={() => goto('/ventures/new')}
            class="border border-blue-600 text-blue-600 bg-white px-3 py-2 rounded-md
                   hover:bg-blue-600 hover:text-white hover:border-blue-600
                   transition-colors duration-200 cursor-pointer"
            aria-label="Create new venture"
          >
            + New Venture
          </button>

          <!-- Avatar (bigger), opens menu -->
          <button
            class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 overflow-hidden
                   hover:ring-2 hover:ring-blue-600 transition"
            on:click={openMenu}
            aria-label="Open account menu"
          >
            {#if $profile?.avatar_url}
              <img
                src="{$profile.avatar_url}"
                alt="Profile"
                class="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
            {:else}
              {avatarInitial}
            {/if}
          </button>
        {:else}
          <button
            on:click={() => goto('/auth/login')}
            class="text-gray-700 text-sm font-medium hover:underline shrink-0"
          >
            Login
          </button>
        {/if}
      </div>
    </div>

    <!-- Row 2: Search -->
    <div class="mt-3">
      <input
        type="text"
        placeholder="Search ventures..."
        bind:value={search}
        class="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <!-- DESKTOP layout -->
  <div class="hidden sm:flex items-center justify-between">
    <!-- Left: Logo + Search -->
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
          class="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-4">
      {#if $profile}
        <!-- New Venture (outline, flips on hover) -->
        <button
          on:click={() => goto('/ventures/new')}
          class="border border-blue-600 text-blue-600 bg-white px-4 py-2 rounded-md
                 hover:bg-blue-600 hover:text-white hover:border-blue-600
                 transition-colors duration-200 cursor-pointer"
        >
          + New Venture
        </button>

        <!-- Avatar (bigger), opens menu -->
        <button
          class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 overflow-hidden
                 hover:ring-2 hover:ring-blue-600 transition"
          on:click={openMenu}
          aria-label="Open account menu"
        >
          {#if $profile?.avatar_url}
            <img
              src="{$profile.avatar_url}"
              alt="Profile"
              class="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
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

<!-- Slide-over / Drawer -->
{#if menuOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black/40 z-40"
    on:click={closeMenu}
  ></div>

  <!-- Panel -->
  <aside
    class="fixed inset-y-0 right-0 w-[320px] max-w-[85vw] bg-white z-50 shadow-xl
           transform transition-transform duration-200 translate-x-0"
    role="dialog"
    aria-modal="true"
  >
    <!-- Header -->
    <div class="p-4 border-b flex items-center gap-3">
      <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-base font-semibold text-gray-700">
        {#if $profile?.avatar_url}
          <img src="{$profile.avatar_url}" alt="Profile" class="w-12 h-12 rounded-full object-cover" />
        {:else}
          {avatarInitial}
        {/if}
      </div>
      <div class="min-w-0">
        <div class="font-semibold truncate">{displayName}</div>
        <div class="text-sm text-gray-500 truncate">{$user?.email}</div>
      </div>
      <button
        class="ml-auto text-gray-500 hover:text-gray-800"
        on:click={closeMenu}
        aria-label="Close menu"
      >
        ✕
      </button>
    </div>

    <!-- Menu items -->
    <nav class="p-2">
      <button
        class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
        on:click={() => go('/dashboard')}
      >
        Dashboard
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
        on:click={() => go('/ventures')}
      >
        My Ventures
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
        on:click={() => go('/profile')}
      >
        My Profile
      </button>
    </nav>

    <!-- Footer (logout) -->
    <div class="mt-auto p-4 border-t">
      <button
        class="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
        on:click={handleLogout}
      >
        Log out
      </button>
    </div>
  </aside>
{/if}
