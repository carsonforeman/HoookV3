<script lang="ts">
  import { ArrowLeft, MapPin, Instagram, Linkedin } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;

  const profile = data.profile;
  const ventures = data.ventures ?? [];

  const followerCount = data.followerCount ?? 0;
  const followingCount = data.followingCount ?? 0;
  const isFollowing = data.isFollowing ?? false;

  $: user = $page.data?.user ?? null;
  $: isOwner = user && profile && user.id === profile.id;

  const initials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const possessiveName = profile?.first_name
    ? `${profile.first_name}${profile.first_name.endsWith("s") ? "'" : "'s"}`
    : "Their";

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

  $: displayState = profile?.state
    ? stateMap[profile.state] || profile.state
    : null;
</script>

{#if profile}
  <!-- MOBILE BACK HEADER -->
  <div class="md:hidden flex items-center gap-3 px-4 py-4 border-b bg-white">
    <button on:click={() => goto("/")} class="text-gray-600">
      <ArrowLeft class="w-6 h-6" />
    </button>
    <span class="font-semibold text-lg">
      {profile.first_name} {profile.last_name}
    </span>
  </div>

  <div class="flex-1 md:ml-20 pb-20 md:pb-0">

    <!-- PROFILE HEADER -->
    <section class="max-w-5xl mx-auto px-6 pt-12 flex flex-col md:flex-row gap-10">

      <!-- AVATAR -->
      <div class="flex-shrink-0">
        {#if profile.avatar_url}
          <img
            src={profile.avatar_url}
            alt="Profile avatar"
            class="w-56 h-56 rounded-3xl object-cover shadow-sm"
          />
        {:else}
          <div
            class="w-56 h-56 rounded-3xl bg-gray-200 flex items-center justify-center text-4xl font-bold"
          >
            {initials(`${profile.first_name} ${profile.last_name}`)}
          </div>
        {/if}
      </div>

      <!-- INFO -->
      <div class="flex-1 relative space-y-5">

        <!-- ACTIONS -->
        <div class="hidden md:flex absolute top-0 right-0 gap-3">

          {#if isOwner}
            <a
              href="/profile"
              data-sveltekit-reload
              class="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Edit profile
            </a>

          {:else if user}
            <form method="POST">
              <input type="hidden" name="following_id" value={profile.id} />

              {#if isFollowing}
                <button
                  formaction="?/unfollow"
                  class="px-5 py-2 rounded-xl border font-semibold hover:bg-gray-100"
                >
                  Following
                </button>
              {:else}
                <button
                  formaction="?/follow"
                  class="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Follow
                </button>
              {/if}
            </form>

          {:else}
            <a
              href="/auth/login"
              class="px-5 py-2 rounded-xl border font-semibold hover:bg-gray-100"
            >
              Sign in to follow
            </a>
          {/if}

        </div>

        <h1 class="text-4xl font-bold">
          {profile.first_name} {profile.last_name}
        </h1>

        <!-- LOCATION + FOLLOW STATS -->
        {#if displayState}
          <div class="flex flex-wrap items-center gap-4 text-gray-700">

            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-gray-500" />
              <span>{displayState}, USA</span>
            </div>

            <div class="flex items-center gap-4 text-sm">
              <span>
                <strong>{followerCount}</strong> followers
              </span>
              <span>
                <strong>{followingCount}</strong> following
              </span>
            </div>

          </div>
        {/if}

        <!-- COLLAB INTENT -->
        {#if profile.collaboration_intent}
          <div class="inline-flex px-4 py-2 rounded-xl bg-gray-100 text-sm font-medium w-fit">
            {profile.collaboration_intent === "join"
              ? "Looking to join a venture"
              : "Looking for collaborators"}
          </div>
        {/if}

        <!-- SOCIAL ICONS -->
        <div class="flex gap-6 pt-4">
          {#if profile.instagram_url}
            <a href={profile.instagram_url} target="_blank" aria-label="Instagram">
              <Instagram class="w-7 h-7 text-pink-600 hover:scale-110 transition" />
            </a>
          {/if}

          {#if profile.linkedin_url}
            <a href={profile.linkedin_url} target="_blank" aria-label="LinkedIn">
              <Linkedin class="w-7 h-7 text-blue-600 hover:scale-110 transition" />
            </a>
          {/if}

          {#if profile.tiktok_url}
            <a href={profile.tiktok_url} target="_blank" aria-label="TikTok">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-7 h-7 text-black hover:scale-110 transition"
              >
                <path d="M21 8.1c-1.4 0-2.8-.4-4-1.2-1.1-.7-2-1.7-2.6-2.9v9.7c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6c.4 0 .8 0 1.2.1v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6V3h2.8c.3 1.6 1.2 3 2.5 4 1 .8 2.3 1.3 3.7 1.4v2.7z"/>
              </svg>
            </a>
          {/if}
        </div>

      </div>
    </section>

    <!-- VENTURES -->
    <section class="max-w-5xl mx-auto px-6 mt-16">
      <h2 class="text-2xl font-semibold mb-6">
        {possessiveName} Ventures
      </h2>

      {#if ventures.length === 0}
        <p class="text-gray-500">
          No ventures to show yet.
        </p>
      {:else}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {#each ventures as v}
            <a
              href={`/ventures/${v.slug}`}
              class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md block"
            >
              <h3 class="font-semibold text-lg">{v.name}</h3>
              <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                {v.about || "No description provided."}
              </p>
            </a>
          {/each}
        </div>
      {/if}
    </section>

  </div>
{:else}
  <div class="p-10 text-center text-gray-500">
    Profile not available.
  </div>
{/if}
