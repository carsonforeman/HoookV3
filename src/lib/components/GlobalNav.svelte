<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Plus, User } from "lucide-svelte";

  $: user = $page.data?.user ?? null;
  $: profile = $page.data?.profile ?? null;
</script>

<header class="w-full bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

    <!-- Logo -->
    <button
      on:click={() => goto("/")}
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

        <!-- Profile -->
        <button
          on:click={() => goto(`/profile/${profile.id}`)}
          class="flex items-center"
        >
          {#if profile?.avatar_url}
            <img
              src={profile.avatar_url}
              class="w-8 h-8 rounded-full object-cover"
            />
          {:else}
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
              {user.email.charAt(0).toUpperCase()}
            </div>
          {/if}
        </button>

      {:else}
        <!-- Sign in -->
        <button
          on:click={() => goto("/auth/login")}
          class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        >
          <User class="w-4 h-4" />
          Sign in
        </button>
      {/if}

    </div>
  </div>
</header>
