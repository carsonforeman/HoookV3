<script lang="ts">
  import { Globe, Share2, ArrowLeft } from "lucide-svelte";
  import { goto } from "$app/navigation";

  export let data;
  const profile = data.profile;
  const ventures = data.ventures ?? [];

  // initials fallback
  const initials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  let showShare = false;
  const shareUrl = typeof window !== "undefined" 
    ? window.location.href 
    : "";
</script>

<!-- MOBILE BACK HEADER -->
<div class="md:hidden flex items-center gap-3 px-4 py-4 border-b bg-white">
  <button on:click={() => goto("/")} class="text-gray-600">
    <ArrowLeft class="w-6 h-6" />
  </button>
  <span class="font-semibold text-lg">{profile.first_name} {profile.last_name}</span>
</div>

<div class="flex-1 md:ml-20 pb-20 md:pb-0">

  <!-- HEADER -->
  <section class="max-w-5xl mx-auto px-6 pt-10 flex flex-col md:flex-row gap-8">

    <!-- AVATAR -->
    <div class="flex-shrink-0">
      {#if profile.avatar_url}
        <img
          src={profile.avatar_url}
          alt="Profile avatar"
          class="w-40 h-40 rounded-2xl object-cover bg-white shadow-sm border"
        />
      {:else}
        <div
          class="w-40 h-40 rounded-2xl bg-gray-200 flex items-center justify-center text-3xl font-bold"
        >
          {initials(`${profile.first_name} ${profile.last_name}`)}
        </div>
      {/if}
    </div>

    <!-- INFO -->
    <div class="flex-1 relative">

      <!-- DESKTOP BUTTONS -->
      <div class="hidden md:flex absolute top-0 right-0 gap-3">
        <button
          class="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Connect
        </button>

        <button
          on:click={() => (showShare = true)}
          class="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
        >
          Share
        </button>
      </div>

      <h1 class="text-3xl font-bold">
        {profile.first_name} {profile.last_name}
      </h1>

      <p class="text-gray-600 mt-1 text-sm">
        Based in {profile.state || "Unknown"}
      </p>

      {#if profile.role}
        <p class="text-blue-600 font-medium mt-1 capitalize">{profile.role}</p>
      {/if}

      <!-- ABOUT -->
      {#if profile.about}
        <p class="text-gray-800 mt-4 whitespace-pre-line leading-relaxed">
          {profile.about}
        </p>
      {:else}
        <p class="text-gray-500 mt-4 text-sm italic">
          This user hasn’t added a bio yet.
        </p>
      {/if}

      <!-- MOBILE BUTTONS -->
      <div class="md:hidden mt-5 flex gap-3">
        <button class="flex-1 py-2 rounded-xl bg-blue-600 text-white font-semibold">
          Connect
        </button>

        <button
          on:click={() => (showShare = true)}
          class="px-4 py-2 rounded-xl border text-gray-700"
        >
          Share
        </button>
      </div>
    </div>
  </section>

  <!-- SHARE MODAL -->
  {#if showShare}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 class="font-semibold text-lg mb-4">Share Profile</h2>

        <div class="border rounded-lg px-3 py-2 bg-gray-50 text-sm break-all mb-4">
          {shareUrl}
        </div>

        <div class="flex justify-end gap-3">
          <button on:click={() => (showShare = false)} class="px-4 py-2 rounded-lg border">
            Close
          </button>
          <button
            on:click={() => navigator.clipboard.writeText(shareUrl)}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- VENTURES SECTION -->
  <section class="max-w-5xl mx-auto px-6 mt-12">
    <h2 class="text-xl font-semibold mb-4">Ventures</h2>

    {#if ventures.length === 0}
      <p class="text-gray-500">This user is not part of any ventures yet.</p>
    {:else}
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each ventures as v}
          <a
            href={`/ventures/${v.slug}`}
            class="border rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition block"
          >
            <h3 class="font-semibold text-lg">{v.name}</h3>
            <p class="text-sm text-gray-600 mt-1 line-clamp-2">
              {v.about || "No description provided."}
            </p>
            <p class="text-xs mt-3 text-blue-600 font-medium">
              {v.owner_id === profile.id ? "Owner" : "Contributor"}
            </p>
          </a>
        {/each}
      </div>
    {/if}
  </section>

</div>
