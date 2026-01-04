<script lang="ts">
  import { Globe, Instagram, MapPin } from "lucide-svelte";
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

  // ---------- ROUTE AWARENESS (ROBUST) ----------
  $: segments = $page.url.pathname.split("/").filter(Boolean);

  // Example paths:
  // /ventures/mindmeld/owner
  // /ventures/mindmeld/owner/artifacts/new
  // /ventures/mindmeld/owner/team

  $: ownerIndex = segments.indexOf("owner");
  $: ownerSubroute = segments[ownerIndex + 1] ?? null;

  // Artifacts is DEFAULT and includes nested routes
  $: isArtifacts =
    ownerSubroute === null ||
    ownerSubroute === "artifacts";

  $: isTeam = ownerSubroute === "team";
</script>


<div class="flex-1 pb-20 md:pb-0">

  <!-- OWNER HEADER (FULL LIGHT BLUE SURFACE) -->
  <header class="bg-blue-50/60">
    <div class="max-w-5xl mx-auto px-6 pt-6">

      <!-- TOP ROW -->
      <div class="flex items-start justify-between gap-6">

        {#if editing}
          <!-- EDIT MODE -->
          <form
            method="POST"
            action="?/updateVenture"
            enctype="multipart/form-data"
            class="flex items-start gap-6 w-full"
          >
            <!-- LOGO -->
            <label class="relative cursor-pointer shrink-0">
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

            <!-- META -->
            <div class="flex-1 max-w-xl space-y-4">
              <input
                name="name"
                bind:value={name}
                placeholder="Venture name"
                class="text-3xl font-bold w-full border-b bg-transparent focus:outline-none"
              />

              <input
                name="type"
                bind:value={type}
                placeholder="Venture type"
                class="border px-3 py-2 w-full text-sm rounded"
              />

              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-gray-400" />
                <select
                  name="location"
                  bind:value={location}
                  class="border px-3 py-2 w-full text-sm rounded"
                >
                  <option value="">Select a state</option>
                  {#each Object.keys(states) as code}
                    <option value={code}>{states[code]}</option>
                  {/each}
                </select>
              </div>

              <textarea
                name="about"
                bind:value={about}
                rows="3"
                placeholder="Describe what this venture is about"
                class="border px-3 py-2 w-full text-sm rounded"
              />

              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <Globe class="w-4 h-4 text-gray-400" />
                  <input
                    name="website_url"
                    bind:value={website}
                    placeholder="Add website or MVP URL"
                    class="border px-3 py-2 w-full text-sm rounded"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <Instagram class="w-4 h-4 text-pink-500" />
                  <input
                    name="instagram_url"
                    bind:value={instagram}
                    placeholder="Add Instagram URL"
                    class="border px-3 py-2 w-full text-sm rounded"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 text-gray-400">🎵</span>
                  <input
                    name="tiktok_url"
                    bind:value={tiktok}
                    placeholder="Add TikTok URL"
                    class="border px-3 py-2 w-full text-sm rounded"
                  />
                </div>
              </div>

              <div class="flex gap-4 pt-3">
                <button class="text-sm text-blue-600 font-medium hover:underline">
                  Save
                </button>
                <button
                  type="button"
                  class="text-sm text-gray-500 hover:underline"
                  on:click={() => editing = false}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

        {:else}
          <!-- VIEW MODE -->
          <div class="flex items-start gap-6 w-full">
            {#if venture.logo_url}
              <img
                src={venture.logo_url}
                alt={venture.name}
                class="w-32 h-32 rounded-xl object-cover border shadow-sm"
              />
            {:else}
              <div class="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center text-2xl font-bold">
                {venture.name.slice(0, 2).toUpperCase()}
              </div>
            {/if}

            <div class="flex-1 space-y-2">
              <h1 class="text-3xl font-bold">{venture.name}</h1>
              <p class="text-sm text-gray-600">
                {venture.type}{fullLocation ? ` • ${fullLocation}` : ""}
              </p>

              {#if venture.about}
                <p class="text-sm text-gray-700">{venture.about}</p>
              {/if}

              <button
                class="text-sm text-blue-600 hover:underline pt-2"
                on:click={() => editing = true}
              >
                Edit venture
              </button>
            </div>
          </div>
        {/if}

        <a
          href={`/ventures/${venture.slug}`}
          class="text-sm font-medium text-blue-600 hover:underline shrink-0"
        >
          View Public Profile
        </a>
      </div>

      <!-- OWNER MENU -->
      <nav class="mt-8 flex gap-6 text-sm border-b border-gray-200">
        <a
          href="./"
          class={`pb-3 ${
            isArtifacts
              ? "font-semibold text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Artifacts
        </a>

        <a
          href="team"
          class={`pb-3 ${
            isTeam
              ? "font-semibold text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Team
        </a>
      </nav>

    </div>
  </header>

  <!-- PAGE CONTENT (WHITE CANVAS) -->
  <main class="p-6 max-w-5xl mx-auto bg-white">
    <slot />
  </main>
</div>
