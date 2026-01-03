<script lang="ts">
  import { ArrowLeft, Instagram, Linkedin } from "lucide-svelte";
  import { goto } from "$app/navigation";

  export let data;

  const profile = data.profile;
  const ventures = data.ventures ?? [];

  const stateMap: Record<string, string> = {
    AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
    CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
    HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",
    KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",
    MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
    NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",
    NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",
    OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
    SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
    VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"
  };

  const reverseStateMap = Object.fromEntries(
    Object.entries(stateMap).map(([abbr, name]) => [name, abbr])
  );

  let state = stateMap[profile.state] || profile.state || "";
  let instagramUrl = profile.instagram_url ?? "";
  let linkedinUrl = profile.linkedin_url ?? "";
  let tiktokUrl = profile.tiktok_url ?? "";
  let collaborationIntent = profile.collaboration_intent ?? "";

  let avatarFile: File | null = null;
  let avatarPreviewUrl: string | null = null;

  let saving = false;
  let error = "";

  const states = Object.values(stateMap);

  const initials = (name: string) =>
    name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  function handleAvatarChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      avatarFile = input.files[0];
      avatarPreviewUrl = URL.createObjectURL(input.files[0]);
    }
  }

  async function saveProfile() {
    saving = true;
    error = "";

    try {
      const formData = new FormData();
      const stateToSave = reverseStateMap[state] || state;

      formData.append("state", stateToSave);
      formData.append("instagram_url", instagramUrl);
      formData.append("linkedin_url", linkedinUrl);
      formData.append("tiktok_url", tiktokUrl);
      formData.append("collaboration_intent", collaborationIntent);

      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await fetch("/profile", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result?.error || "Failed to save profile");
      }

      location.reload();
    } catch (e) {
      error = e.message;
    } finally {
      saving = false;
    }
  }
</script>

<!-- MOBILE HEADER -->
<div class="md:hidden flex items-center gap-3 px-4 py-4 border-b bg-white">
  <button on:click={() => goto("/")} class="text-gray-600">
    <ArrowLeft class="w-6 h-6" />
  </button>
  <span class="font-semibold text-lg">Edit Profile</span>
</div>

<div class="flex-1 md:ml-20 pb-20 md:pb-0">
  <section class="max-w-4xl mx-auto px-6 pt-12">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row gap-10">

      <!-- AVATAR -->
      <div class="flex-shrink-0 text-center">
        {#if avatarPreviewUrl}
          <img src={avatarPreviewUrl} class="w-56 h-56 rounded-3xl object-cover shadow-sm" />
        {:else if profile.avatar_url}
          <img src={profile.avatar_url} class="w-56 h-56 rounded-3xl object-cover shadow-sm" />
        {:else}
          <div class="w-56 h-56 rounded-3xl bg-gray-200 flex items-center justify-center text-4xl font-bold">
            {initials(`${profile.first_name} ${profile.last_name}`)}
          </div>
        {/if}

        <label class="block mt-4 text-sm font-medium cursor-pointer text-blue-600">
          Change photo
          <input type="file" accept="image/*" class="hidden" on:change={handleAvatarChange} />
        </label>
      </div>

      <!-- FORM -->
      <div class="flex-1 space-y-8 relative">

        <!-- DESKTOP ACTION -->
        <div class="hidden md:block absolute top-0 right-0">
  <a
    href={`/u/${profile.username}`}
    data-sveltekit-reload
    class="text-sm text-blue-600 hover:underline"
  >
    View public profile
  </a>
</div>


        <h1 class="text-2xl font-bold">
          {profile.first_name} {profile.last_name}
        </h1>

        <!-- LOCATION -->
        <div class="max-w-sm">
          <label class="block text-sm font-medium mb-1">Location</label>
          <select
            bind:value={state}
            class="w-full px-0 py-2 border-b focus:outline-none bg-transparent"
          >
            <option value="">Select a state</option>
            {#each states as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </div>

        <!-- COLLAB INTENT -->
        <div>
          <label class="block text-sm font-medium mb-2">Collaboration intent</label>
          <div class="flex gap-3">
            <button
              class={`px-4 py-2 rounded-xl text-sm ${
                collaborationIntent === "join"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              on:click={() => (collaborationIntent = "join")}
            >
              Looking to join a venture
            </button>

            <button
              class={`px-4 py-2 rounded-xl text-sm ${
                collaborationIntent === "build"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              on:click={() => (collaborationIntent = "build")}
            >
              Looking for collaborators
            </button>
          </div>
        </div>

        <!-- SOCIAL LINKS -->
        <div class="space-y-4 max-w-xl">
          <label class="block text-sm font-medium">Social links</label>

          <div class="flex items-center gap-3">
            <Instagram class="w-5 h-5 text-gray-500" />
            <input bind:value={instagramUrl} placeholder="Instagram profile URL"
              class="flex-1 bg-transparent border-b py-2 focus:outline-none" />
          </div>

          <div class="flex items-center gap-3">
            <Linkedin class="w-5 h-5 text-gray-500" />
            <input bind:value={linkedinUrl} placeholder="LinkedIn profile URL"
              class="flex-1 bg-transparent border-b py-2 focus:outline-none" />
          </div>

          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor" class="w-5 h-5 text-gray-500">
              <path d="M21 8.1c-1.4 0-2.8-.4-4-1.2-1.1-.7-2-1.7-2.6-2.9v9.7c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6c.4 0 .8 0 1.2.1v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6V3h2.8c.3 1.6 1.2 3 2.5 4 1 .8 2.3 1.3 3.7 1.4v2.7z"/>
            </svg>
            <input bind:value={tiktokUrl} placeholder="TikTok profile URL"
              class="flex-1 bg-transparent border-b py-2 focus:outline-none" />
          </div>
        </div>

        {#if error}
          <p class="text-red-600 text-sm">{error}</p>
        {/if}

        <div>
          <button
            on:click={saveProfile}
            disabled={saving}
            class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        <!-- MOBILE ACTION -->
        <div class="md:hidden pt-4">
          <a
            href={`/profile/${profile.username}`}
            data-sveltekit-reload
            class="block text-center text-blue-600 font-medium"
          >
            View public profile
          </a>
        </div>

      </div>
    </div>

    <!-- MY VENTURES -->
    <section class="mt-16">
      <h2 class="text-xl font-semibold mb-4">My Ventures</h2>

      {#if ventures.length === 0}
        <button
          on:click={() => goto("/ventures/new")}
          class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Create New Venture
        </button>
      {:else}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {#each ventures as v}
            <a href={`/ventures/${v.slug}`}
              class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md block">
              <h3 class="font-semibold text-lg">{v.name}</h3>
              <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                {v.about || "No description provided."}
              </p>
            </a>
          {/each}
        </div>
      {/if}
    </section>

  </section>
</div>
