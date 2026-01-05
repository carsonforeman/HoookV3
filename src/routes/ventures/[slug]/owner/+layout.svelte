<script lang="ts">
  import { Globe, MapPin } from "lucide-svelte";
  import { page } from "$app/stores";

  export let data;
  const venture = data.venture;

  let editing = false;

  let name = venture.name;
  let type = venture.type;
  let location = venture.location ?? "";
  let about = venture.about;

  let website = venture.website_url ?? "";
  let instagram = venture.instagram_url ?? "";
  let tiktok = venture.tiktok_url ?? "";

  let logoPreview: string | null = null;

  function handleLogoChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) {
      logoPreview = URL.createObjectURL(input.files[0]);
    }
  }

  const states: Record<string, string> = {
    AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California",
    CO:"Colorado", CT:"Connecticut", DE:"Delaware", FL:"Florida", GA:"Georgia",
    HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana", IA:"Iowa",
    KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland",
    MA:"Massachusetts", MI:"Michigan", MN:"Minnesota", MS:"Mississippi",
    MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire",
    NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
    ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania",
    RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota", TN:"Tennessee",
    TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia", WA:"Washington",
    WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming"
  };

  const fullLocation =
    venture.location && states[venture.location]
      ? `${states[venture.location]}, USA`
      : null;

  $: segments = $page.url.pathname.split("/").filter(Boolean);
  $: ownerIndex = segments.indexOf("owner");
  $: ownerSubroute = segments[ownerIndex + 1] ?? null;

  $: isArtifacts = ownerSubroute === null || ownerSubroute === "artifacts";
  $: isTeam = ownerSubroute === "team";
</script>

<div class="flex-1 pb-24">
  <header class="bg-blue-50/60">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-6">

      {#if editing}
        <!-- ================= EDIT MODE ================= -->
        <form
          method="POST"
          action={`/ventures/${venture.slug}/owner`}
          enctype="multipart/form-data"
          class="grid grid-cols-1 sm:grid-cols-[128px_1fr] gap-6"
        >
          <!-- LOGO -->
          <label class="relative cursor-pointer w-32">
            {#if logoPreview || venture.logo_url}
              <img
                src={logoPreview ?? venture.logo_url}
                alt={venture.name}
                class="w-32 h-32 rounded-xl object-cover border shadow-sm"
              />
            {:else}
              <div class="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center text-2xl font-bold">
                {venture.name.slice(0, 2).toUpperCase()}
              </div>
            {/if}

            <input
              type="file"
              name="logo"
              accept="image/*"
              class="hidden"
              on:change={handleLogoChange}
            />

            <div class="absolute inset-0 bg-black/40 text-white text-sm flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition">
              Change logo
            </div>
          </label>

          <!-- FORM -->
          <div class="space-y-5 max-w-xl">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Venture name</label>
              <input
                name="name"
                bind:value={name}
                class="text-3xl font-bold w-full border-b bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Venture type</label>
              <input
                name="type"
                bind:value={type}
                class="border px-3 py-2 w-full text-sm rounded"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <select
                name="location"
                bind:value={location}
                class="border px-3 py-2 w-full text-sm rounded"
              >
                <option value="">Select a venture location</option>
                {#each Object.keys(states) as code}
                  <option value={code}>{states[code]}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea
                name="about"
                bind:value={about}
                rows="3"
                class="border px-3 py-2 w-full text-sm rounded resize-none"
              />
            </div>

            <div class="space-y-3">
              <input name="website_url" bind:value={website} placeholder="Website URL" class="border px-3 py-2 w-full text-sm rounded" />
              <input name="instagram_url" bind:value={instagram} placeholder="Instagram URL" class="border px-3 py-2 w-full text-sm rounded" />
              <input name="tiktok_url" bind:value={tiktok} placeholder="TikTok URL" class="border px-3 py-2 w-full text-sm rounded" />
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="text-sm text-blue-600 font-medium hover:underline">Save</button>
              <button type="button" class="text-sm text-gray-500 hover:underline" on:click={() => editing = false}>Cancel</button>
            </div>
          </div>
        </form>

      {:else}
  <!-- VIEW MODE -->
  <div class="flex flex-col gap-6">

    <!-- HEADER ROW -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
      <!-- LEFT COLUMN -->
      <div class="flex gap-6 max-w-xl">
        <!-- LOGO -->
        {#if venture.logo_url}
          <img
            src={venture.logo_url}
            alt={venture.name}
            class="w-32 h-32 rounded-xl object-cover border shadow-sm shrink-0"
          />
        {:else}
          <div class="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center text-2xl font-bold shrink-0">
            {venture.name.slice(0, 2).toUpperCase()}
          </div>
        {/if}

        <!-- TEXT STACK -->
        <div class="space-y-2">
          <h1 class="text-3xl font-bold">{venture.name}</h1>

          {#if venture.type}
            <div class="text-sm text-gray-600">{venture.type}</div>
          {/if}

          {#if fullLocation}
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <MapPin class="w-5 h-5" />
              {fullLocation}
            </div>
          {/if}

          {#if venture.about}
            <p class="text-sm text-gray-700 leading-relaxed">
              {venture.about}
            </p>
          {/if}

          <!-- ICONS INLINE UNDER DESCRIPTION -->
          <div class="flex gap-5 pt-1 items-center">
            {#if venture.website_url}
              <a href={venture.website_url} target="_blank" class="text-gray-600 hover:text-black">
                <Globe class="w-6 h-6" />
              </a>
            {/if}

            {#if venture.instagram_url}
              <a href={venture.instagram_url} target="_blank" class="text-pink-500 hover:opacity-80">
                <!-- Instagram (large, clean) -->
                <svg
                  class="w-9 h-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
            {/if}

            {#if venture.tiktok_url}
              <a href={venture.tiktok_url} target="_blank" class="text-black hover:opacity-80">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 7.5a5.5 5.5 0 01-5.5-5.5h-3v13.1a2.6 2.6 0 11-2.6-2.6c.4 0 .8.1 1.1.2V9.3a5.5 5.5 0 102.9 5V8.8a8.4 8.4 0 005.1 1.7V7.5z"/>
                </svg>
              </a>
            {/if}
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <a
        href={`/ventures/${venture.slug}`}
        class="text-sm font-medium text-blue-600 hover:underline shrink-0"
      >
        View Public Profile
      </a>
    </div>

    <button
      class="text-sm text-blue-600 hover:underline"
      on:click={() => editing = true}
    >
      Edit venture
    </button>
  </div>
{/if}


      <!-- OWNER NAV -->
      <nav class="mt-8 flex gap-6 text-sm border-b border-gray-200">
        <a href="./" class={`pb-3 ${isArtifacts ? "font-semibold border-b-2 border-black" : "text-gray-600"}`}>Artifacts</a>
        <a href="team" class={`pb-3 ${isTeam ? "font-semibold border-b-2 border-black" : "text-gray-600"}`}>Team</a>
      </nav>
    </div>
  </header>

  <main class="p-6 max-w-5xl mx-auto bg-white">
    <slot />
  </main>
</div>
