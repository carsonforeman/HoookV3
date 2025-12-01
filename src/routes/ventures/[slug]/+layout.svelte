<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import {
    House,
    Compass,
    User,
    Globe,
    Instagram,
    Music2,
    Rocket
  } from "lucide-svelte";

  export let data;

  const venture = data.venture;
  const user = data.user;

  let showShareModal = false;
  let hoverMenu = false;

  // Client-only values
  let shareUrl = "";
  let isOwner = false;
  let inOwnerView = false;

  // SAFE owner+URL logic
  onMount(() => {
    shareUrl = `${window.location.origin}/ventures/${venture.slug}`;

    // CORRECT ownership check
    isOwner = Boolean(user && user.id === venture.uid);

    inOwnerView = $page.url.pathname.includes("/owner");
  });

  const titleCase = (s: string) =>
    s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  function hashString(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = str.charCodeAt(i) + ((h << 5) - h);
    }
    return h;
  }

  const gradients = [
    "from-pink-500 to-red-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500"
  ];

  const gradient = gradients[Math.abs(hashString(venture.name)) % gradients.length];

  const initials = venture.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function copyShareUrl() {
    navigator.clipboard.writeText(shareUrl);
  }
</script>

<div class="flex">

  <!-- LEFT SIDEBAR -->
  <aside
    class="hidden md:flex flex-col bg-white py-6 px-3 fixed h-screen transition-all duration-200 ease-out"
    on:mouseenter={() => (hoverMenu = true)}
    on:mouseleave={() => (hoverMenu = false)}
    style="width: {hoverMenu ? '12rem' : '5rem'}"
  >
    <a href="/" class="mb-8 flex items-center gap-3 pl-2">
      <img src="/images/round_logo.png" alt="Hoook" class="w-10 h-10" />
    </a>

    <nav class="flex flex-col gap-6 mt-4 text-gray-700">

      <a href="/" class="flex items-center gap-3 hover:text-blue-600 pl-2">
        <Compass class="w-7 h-7" />
        {#if hoverMenu}<span class="text-sm">Explore</span>{/if}
      </a>

      <a href="/ventures" class="flex items-center gap-3 hover:text-blue-600 pl-2">
        <House class="w-7 h-7" />
        {#if hoverMenu}<span class="text-sm">My Ventures</span>{/if}
      </a>

      <a href="/profile" class="flex items-center gap-3 hover:text-blue-600 pl-2">
        <User class="w-7 h-7" />
        {#if hoverMenu}<span class="text-sm">Profile</span>{/if}
      </a>

    </nav>
  </aside>

  <!-- MAIN CONTENT -->
  <div class="flex-1 md:ml-20">

    <!-- SHARE MODAL -->
    {#if showShareModal}
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl shadow-xl w-96">
          <h2 class="font-semibold text-xl mb-4">Share Venture</h2>

          <div class="border rounded-lg px-3 py-2 bg-gray-50 text-sm break-all mb-4">
            {shareUrl}
          </div>

          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 rounded-lg border" on:click={() => (showShareModal = false)}>
              Close
            </button>

            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" on:click={copyShareUrl}>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- VENTURE HEADER -->
    <div class="max-w-5xl mx-auto px-6 pt-10 pb-6 flex gap-10 items-start">

      <!-- AVATAR -->
      <div class="flex-shrink-0">
        {#if venture.logo_url}
          <img
            src={venture.logo_url}
            class="w-40 h-40 rounded-xl object-contain bg-white p-2 border shadow"
          />
        {:else}
          <div
            class={`w-40 h-40 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white text-4xl font-bold shadow`}
          >
            {initials}
          </div>
        {/if}
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex-1 relative">

        <div class="absolute top-0 right-0 flex gap-3">

          <!-- SHARE -->
          <button
            on:click={() => (showShareModal = true)}
            class="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
          >
            Share
          </button>

          <!-- OWNER VIEW / EXIT OWNER VIEW -->
          {#if isOwner}
            {#if !inOwnerView}
              <button
                on:click={() => goto(`/ventures/${venture.slug}/owner/dashboard`)}
                class="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-semibold"
              >
                Owner View
              </button>
            {:else}
              <button
                on:click={() => goto(`/ventures/${venture.slug}`)}
                class="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
              >
                Exit Owner View
              </button>
            {/if}
          {/if}

          <!-- CONNECT -->
          <form method="post" action="?/connect">
            <button class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Connect
            </button>
          </form>
        </div>

        <!-- TITLE -->
        <h1 class="text-xl md:text-2xl font-bold">{venture.name}</h1>

        <p class="text-blue-600 font-medium mt-1">{titleCase(venture.type)}</p>
        <p class="text-gray-600 text-sm mt-1">{titleCase(venture.location)}</p>

        <p class="text-gray-800 mt-4 whitespace-pre-line leading-relaxed">
          {venture.about}
        </p>

        <!-- OFFICIAL LINKS -->
        <div class="mt-6 flex flex-col gap-3">
          <h3 class="text-sm font-semibold text-gray-600">Official Links</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <a href="#" class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow">
              <Instagram class="w-6 h-6" />
              <div>
                <div class="font-semibold">Instagram</div>
                <div class="text-xs opacity-90">instagram.com/example</div>
              </div>
            </a>

            <a href="#" class="flex items-center gap-3 p-4 rounded-xl bg-black text-white shadow">
              <Music2 class="w-6 h-6" />
              <div>
                <div class="font-semibold">TikTok</div>
                <div class="text-xs opacity-90">tiktok.com/@example</div>
              </div>
            </a>

            <a href="#" class="flex items-center gap-3 p-4 rounded-xl border bg-white shadow">
              <Globe class="w-6 h-6 text-blue-600" />
              <div>
                <div class="font-semibold text-gray-800">Website</div>
                <div class="text-xs text-gray-500">www.example.com</div>
              </div>
            </a>

            <a href="#" class="flex items-center gap-3 p-4 rounded-xl bg-purple-600 text-white shadow">
              <Rocket class="w-6 h-6" />
              <div>
                <div class="font-semibold">MVP</div>
                <div class="text-xs opacity-90">example.vercel.app</div>
              </div>
            </a>

          </div>
        </div>

      </div>
    </div>

    <!-- VENTURE TABS -->
    <div class="max-w-5xl mx-auto px-6 mt-6 border-b flex gap-6 text-gray-600 text-sm">

      <a href="/ventures/{venture.slug}"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname === `/ventures/${venture.slug}`}
        class:font-semibold={$page.url.pathname === `/ventures/${venture.slug}`}
      >Showcase</a>

      <a href="/ventures/{venture.slug}/progress"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname.includes('/progress')}
        class:font-semibold={$page.url.pathname.includes('/progress')}
      >Progress</a>

      <a href="/ventures/{venture.slug}/ideas"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname.includes('/ideas')}
        class:font-semibold={$page.url.pathname.includes('/ideas')}
      >Ideas</a>

      <a href="/ventures/{venture.slug}/sessions"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname.includes('/sessions')}
        class:font-semibold={$page.url.pathname.includes('/sessions')}
      >Sessions</a>

      <a href="/ventures/{venture.slug}/tasks"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname.includes('/tasks')}
        class:font-semibold={$page.url.pathname.includes('/tasks')}
      >Tasks</a>

      <a href="/ventures/{venture.slug}/team"
        class="pb-3 hover:text-blue-600"
        class:text-blue-600={$page.url.pathname.includes('/team')}
        class:font-semibold={$page.url.pathname.includes('/team')}
      >Team</a>
    </div>

    <!-- PAGE CONTENT -->
    <div class="max-w-5xl mx-auto px-6 py-10">
      <slot />
    </div>

  </div>
</div>
