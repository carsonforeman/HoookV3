<script lang="ts">
  import { Globe, Instagram } from "lucide-svelte";

  export let data;

  let venture: any = null;
  let user: any = null;
  let isOwner = false;

  let showShareModal = false;
  let copied = false;

  $: {
    venture = data?.venture ?? null;
    user = data?.user ?? null;

    if (user && venture) {
      isOwner = user.id === venture.owner_id;
    } else {
      isOwner = false;
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

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

  $: fullLocation =
    venture?.location && states[venture.location]
      ? `${states[venture.location]}, USA`
      : null;

  $: shareUrl =
    typeof window !== "undefined" && venture
      ? `${window.location.origin}/ventures/${venture.slug}`
      : "";

  async function copyShareUrl() {
    await navigator.clipboard.writeText(shareUrl);
    copied = true;
    setTimeout(() => {
      copied = false;
      showShareModal = false;
    }, 900);
  }
</script>


{#if venture}
  <!-- SHARE MODAL -->
  {#if showShareModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 class="font-semibold text-lg mb-4">Share Venture</h2>

        <div class="border rounded-lg px-3 py-2 bg-gray-50 text-sm break-all mb-4">
          {shareUrl}
        </div>

        <div class="flex justify-end gap-3">
          <button
            on:click={() => (showShareModal = false)}
            class="px-4 py-2 rounded-lg border"
          >
            Close
          </button>

          <button
            on:click={copyShareUrl}
            class="px-4 py-2 rounded-lg text-white
              {copied ? 'bg-green-600' : 'bg-blue-600'}"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- HEADER -->
  <header class="bg-blue-50/60 border-b">
    <div class="max-w-5xl mx-auto px-6 py-6">

      <div class="flex items-start justify-between gap-6">

        <!-- LEFT -->
        <div class="flex items-start gap-6 min-w-0">

          <!-- LOGO -->
          {#if venture.logo_url}
            <img
              src={venture.logo_url}
              alt={venture.name}
              class="w-32 h-32 rounded-xl object-cover border shadow-sm shrink-0"
            />
          {:else}
            <div class="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center text-2xl font-bold shrink-0">
              {getInitials(venture.name)}
            </div>
          {/if}

          <!-- META -->
          <div class="flex-1 min-w-0 space-y-2">
            <h1 class="text-3xl font-bold">{venture.name}</h1>

            <p class="text-sm text-gray-600">
              {venture.type}{fullLocation ? ` • ${fullLocation}` : ""}
            </p>

            {#if venture.about}
              <p class="text-sm text-gray-700 max-w-2xl">
                {venture.about}
              </p>
            {/if}

            <!-- LINKS -->
            <div class="flex items-center gap-5 pt-3">

              {#if venture.website_url}
                <a
                  href={venture.website_url}
                  target="_blank"
                  class="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                >
                  <Globe class="w-5 h-5" />
                  Website
                </a>
              {/if}

              {#if venture.instagram_url}
                <a
                  href={venture.instagram_url}
                  target="_blank"
                  aria-label="Instagram"
                >
                  <Instagram class="w-7 h-7 text-pink-500 hover:scale-110 transition" />
                </a>
              {/if}

              {#if venture.tiktok_url}
                <a
                  href={venture.tiktok_url}
                  target="_blank"
                  aria-label="TikTok"
                >
                  <svg
                    class="w-7 h-7 hover:scale-110 transition"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 8.1c-1.4 0-2.8-.4-4-1.2-1.1-.7-2-1.7-2.6-2.9v9.7c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6c.4 0 .8 0 1.2.1v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6V3h2.8c.3 1.6 1.2 3 2.5 4 1 .8 2.3 1.3 3.7 1.4v2.7z"/>
                  </svg>
                </a>
              {/if}
            </div>
          </div>
        </div>

        <!-- RIGHT ACTIONS (DESKTOP) -->
        <div class="hidden md:flex gap-3 shrink-0">

          {#if isOwner}
            <a
              href={`/ventures/${venture.slug}/owner`}
              class="px-5 py-2 rounded-xl border font-semibold hover:bg-gray-100"
            >
              Venture Dashboard
            </a>
          {:else}
            <button
              on:click={() => {
                if (!user) window.location.href = "/auth/login";
                else console.log("Track venture");
              }}
              class="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Track Venture
            </button>
          {/if}

          <button
            on:click={() => (showShareModal = true)}
            class="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
          >
            Share
          </button>
        </div>
      </div>

      <!-- MOBILE ACTIONS -->
      <div class="md:hidden mt-6 flex flex-col gap-3">
        {#if isOwner}
          <a
            href={`/ventures/${venture.slug}/owner`}
            class="w-full py-2 rounded-xl border font-semibold text-center"
          >
            Venture Dashboard
          </a>
        {:else}
          <button
            class="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Track Venture
          </button>
        {/if}

        <button
          on:click={() => (showShareModal = true)}
          class="w-full py-2 rounded-xl border text-gray-700"
        >
          Share
        </button>
      </div>

    </div>
  </header>

  <!-- CONTENT -->
  <main class="max-w-5xl mx-auto px-6 py-10">
    <slot />
  </main>
{/if}
