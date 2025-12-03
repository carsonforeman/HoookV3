<script lang="ts">
  export let data;

  const venture = data.venture;
  const user = data.user;

  let showShareModal = false;

  const titleCase = (str: string) =>
    str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/ventures/${venture.slug}`
    : "";

  const copyShareUrl = () => navigator.clipboard.writeText(shareUrl);
</script>

<!-- SHARE MODAL -->
{#if showShareModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-xl w-80">
      <h2 class="font-semibold text-lg mb-4">Share Venture</h2>

      <div class="border rounded-lg px-3 py-2 bg-gray-50 text-sm break-all mb-4">
        {shareUrl}
      </div>

      <div class="flex justify-end gap-3">
        <button on:click={() => (showShareModal = false)} class="px-4 py-2 rounded-lg border">
          Close
        </button>
        <button on:click={copyShareUrl} class="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Copy
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- =============== -->
<!--  HEADER AREA   -->
<!-- =============== -->
<div class="max-w-5xl mx-auto px-6 pt-10 pb-4 flex flex-col md:flex-row gap-6">

  <!-- LOGO -->
  <div class="flex-shrink-0">
    {#if venture.logo_url}
      <img
        src={venture.logo_url}
        alt="{venture.name} logo"
        class="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover bg-white shadow-sm border"
      />
    {:else}
      <div
        class="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gray-200 flex items-center justify-center text-2xl font-bold"
      >
        {getInitials(venture.name)}
      </div>
    {/if}
  </div>

  <!-- VENTURE INFO -->
  <div class="flex-1 relative">

    <!-- DESKTOP ACTIONS -->
    <div class="hidden md:flex absolute top-0 right-0 gap-3">
      <form method="post" action="?/connect">
        <button class="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Connect
        </button>
      </form>

      <button
        on:click={() => (showShareModal = true)}
        class="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
      >
        Share
      </button>
    </div>

    <!-- NAME -->
    <h1 class="text-3xl font-bold">{venture.name}</h1>

    <!-- TYPE + LOCATION -->
    <p class="text-blue-600 font-medium mt-1">{titleCase(venture.type)}</p>
    <p class="text-gray-600 text-sm">{titleCase(venture.location)}</p>

    <!-- DESCRIPTION -->
    <p class="text-gray-800 mt-4 whitespace-pre-line leading-relaxed">
      {venture.about}
    </p>

    <!-- MOBILE BUTTONS -->
    <div class="md:hidden mt-5 flex gap-3">
      <form method="post" action="?/connect" class="flex-1">
        <button class="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold">
          Connect
        </button>
      </form>

      <button
        on:click={() => (showShareModal = true)}
        class="px-4 py-2 rounded-xl border text-gray-700"
      >
        Share
      </button>
    </div>

    <!-- LINKS -->
    <div class="mt-6">
      <h3 class="text-sm font-semibold text-gray-600 mb-2">Links</h3>

      <div class="flex flex-wrap gap-3">
        {#if venture.instagram}
          <a href={venture.instagram} class="px-4 py-2 rounded-full bg-pink-100 text-pink-700 flex items-center gap-2 text-sm font-medium">
            Instagram
          </a>
        {/if}

        {#if venture.tiktok}
          <a href={venture.tiktok} class="px-4 py-2 rounded-full bg-black text-white flex items-center gap-2 text-sm font-medium">
            TikTok
          </a>
        {/if}

        {#if venture.website}
          <a href={venture.website} class="px-4 py-2 rounded-full bg-blue-100 text-blue-700 flex items-center gap-2 text-sm font-medium">
            Website
          </a>
        {/if}

        {#if venture.mvp_url}
          <a href={venture.mvp_url} class="px-4 py-2 rounded-full bg-purple-100 text-purple-700 flex items-center gap-2 text-sm font-medium">
            MVP
          </a>
        {/if}
      </div>
    </div>

  </div>
</div>

<!-- =============== -->
<!--   CONTENT      -->
<!-- =============== -->
<div class="max-w-5xl mx-auto px-6 py-10">
  <slot />
</div>
