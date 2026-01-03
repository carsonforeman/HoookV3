<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Plus, User, LogOut } from "lucide-svelte";
  import { supabase } from "$lib/supabaseClient";

  // AUTH USER (from root layout)
  $: user = $page.data?.user ?? null;

  // LOGGED-IN USER PROFILE ONLY (never page profile)
  $: viewerProfile = $page.data?.viewerProfile ?? null;

  let showMenu = false;

  const goHome = () => {
    showMenu = false;
    goto("/");
  };

  const goToMyProfile = () => {
    showMenu = false;
    if (viewerProfile?.username) {
      goto(`/u/${viewerProfile.username}`);
    }
  };

  const signOut = async () => {
    showMenu = false;
    await supabase.auth.signOut();
    goto("/auth/login");
  };
</script>

<header class="w-full bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

    <!-- Logo -->
    <button
      on:click={goHome}
      class="text-xl font-semibold tracking-tight text-blue-600 select-none"
    >
      HO<span class="lowercase">o</span>OK
    </button>

    <!-- Right actions -->
    <div class="flex items-center gap-4">

      {#if user}
        <!-- Create -->
        <button
          on:click={() => goto("/ventures/new")}
          class="flex items-center gap-2 px-3 py-1.5
                 rounded-md text-sm font-medium
                 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus class="w-4 h-4" />
          Create
        </button>

        <!-- Avatar + Dropdown -->
        <div class="relative">

          <!-- Avatar button -->
          <button
            on:click={() => (showMenu = !showMenu)}
            class="flex items-center focus:outline-none"
          >
            {#if viewerProfile?.avatar_url}
              <img
                src={viewerProfile.avatar_url}
                alt="Your profile avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
            {:else}
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            {/if}
          </button>

          {#if showMenu}
            <!-- Click-away backdrop -->
            <div
              class="fixed inset-0 z-40"
              on:click={() => (showMenu = false)}
            />

            <!-- Dropdown menu -->
            <div
              class="absolute right-0 mt-2 w-44 z-50
                     rounded-xl border bg-white shadow-lg overflow-hidden"
            >
              <button
                on:click={goToMyProfile}
                class="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                My profile
              </button>

              <button
                on:click={signOut}
                class="w-full px-4 py-2 text-sm text-left
                       text-red-600 hover:bg-gray-100
                       flex items-center gap-2"
              >
                <LogOut class="w-4 h-4" />
                Sign out
              </button>
            </div>
          {/if}

        </div>

      {:else}
        <!-- Sign in -->
        <button
          on:click={() => goto("/auth/login")}
          class="flex items-center gap-2 text-sm font-medium
                 text-gray-700 hover:text-blue-600 transition"
        >
          <User class="w-4 h-4" />
          Sign in
        </button>
      {/if}

    </div>
  </div>
</header>
