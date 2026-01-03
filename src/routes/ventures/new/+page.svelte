<script lang="ts">
  let step = 1;

  let name = "";
  let type = "";
  let stage: "starting" | "building" | "growing" = "starting";
  let description = "";
  let state = "";
  let logoFile: File | null = null;

  const STATES = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
    "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
    "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
    "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
    "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
    "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ];

  const stageOptions = [
    { value: "starting", label: "Starting", desc: "Early ideas or drafts" },
    { value: "building", label: "Building", desc: "Actively creating" },
    { value: "growing", label: "Growing", desc: "Launched or gaining traction" }
  ];

  $: slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  function next() {
    if (step < 5) step += 1;
  }

  function back() {
    if (step > 1) step -= 1;
  }
</script>

<form method="post" enctype="multipart/form-data" class="min-h-screen bg-white">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-20">

    <!-- LEFT PANEL -->
    <div class="hidden md:flex items-center justify-center">
      <img
        src="/images/New_Venture_Hero.png"
        alt="Hoook venture preview"
        class="max-w-full h-auto"
      />
    </div>

    <!-- RIGHT PANEL -->
    <div class="flex flex-col justify-center space-y-10">

      <!-- STEP HEADERS -->
      {#if step === 1}
        <div>
          <h1 class="text-3xl font-semibold">
            Get your venture discovered on Hoook
          </h1>
          <p class="text-gray-600">
            Enter a few details to get started.
          </p>
        </div>
      {/if}

      {#if step === 2}
        <h1 class="text-2xl font-semibold">
          What kind of venture is this?
        </h1>
      {/if}

      {#if step === 3}
        <h1 class="text-2xl font-semibold">
          What stage is it in right now?
        </h1>
      {/if}

      {#if step === 4}
        <h1 class="text-2xl font-semibold">
          How would you describe it?
        </h1>
      {/if}

      {#if step === 5}
        <h1 class="text-2xl font-semibold">
          Where is this venture based?
        </h1>
      {/if}

      <!-- STEP 1: NAME -->
      {#if step === 1}
        <div class="space-y-6">
          <p class="text-sm font-medium text-gray-600">
            What is the name of your venture?
          </p>

          <input
            type="text"
            name="name"
            bind:value={name}
            placeholder="Sonomi Headphones"
            class="w-full text-lg border-b border-gray-300
                   focus:outline-none focus:border-blue-600 py-2"
            required
          />

          <p class="text-sm text-gray-500">
            hoook.com/ventures/{slug || "your-venture"}
          </p>
        </div>
      {/if}

      <!-- STEP 2: TYPE -->
      {#if step === 2}
        <div class="space-y-4">
          <p class="text-sm font-medium text-gray-600">
            What best describes it?
          </p>

          <input
            type="text"
            bind:value={type}
            placeholder="Web app, album, restaurant, hardware product…"
            class="w-full border-b border-gray-300
                   focus:outline-none focus:border-blue-600 py-2"
            required
          />
        </div>
      {/if}

      <!-- STEP 3: STAGE -->
      {#if step === 3}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {#each stageOptions as s}
            <button
              type="button"
              class="p-4 rounded-xl border text-left transition
                {stage === s.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-400'}"
              on:click={() => (stage = s.value)}
            >
              <div class="font-medium">{s.label}</div>
              <div class="text-xs text-gray-500">{s.desc}</div>
            </button>
          {/each}
        </div>

        <input type="hidden" name="stage" value={stage} />
      {/if}

      <!-- STEP 4: DESCRIPTION -->
      {#if step === 4}
        <div class="space-y-4">
          <textarea
            name="about"
            bind:value={description}
            rows="4"
            maxlength="280"
            placeholder="What is it, and why does it exist?"
            class="w-full border-b border-gray-300
                   focus:outline-none focus:border-blue-600 py-2 resize-none"
            required
          />

          <p class="text-sm text-gray-500">
            {description.length}/280
          </p>
        </div>
      {/if}

      <!-- STEP 5: LOCATION + LOGO -->
      {#if step === 5}
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              State
            </label>

            <select
              name="location"
              bind:value={state}
              class="w-full border-b border-gray-300
                     focus:outline-none focus:border-blue-600 py-2 bg-transparent"
              required
            >
              <option value="">Select a state</option>
              {#each STATES as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Logo (optional)
            </label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              on:change={(e) =>
                (logoFile = (e.target as HTMLInputElement).files?.[0] || null)
              }
            />
          </div>
        </div>
      {/if}

      <!-- NAV -->
      <div class="flex justify-between pt-8">
        {#if step > 1}
          <button
            type="button"
            on:click={back}
            class="text-sm text-gray-500 hover:underline"
          >
            Back
          </button>
        {/if}

        {#if step < 5}
          <button
            type="button"
            on:click={next}
            class="ml-auto px-6 py-2 rounded-full
                   bg-blue-600 text-white font-medium
                   hover:bg-blue-700"
          >
            Continue
          </button>
        {:else}
          <button
            type="submit"
            class="ml-auto px-6 py-2 rounded-full
                   bg-blue-600 text-white font-medium
                   hover:bg-blue-700"
          >
            Create venture
          </button>
        {/if}
      </div>

      <!-- ALWAYS-SUBMITTED HIDDEN FIELDS -->
<input type="hidden" name="name" value={name} />
<input type="hidden" name="slug" value={slug} />
<input type="hidden" name="type" value={type} />
<input type="hidden" name="stage" value={stage} />
<input type="hidden" name="about" value={description} />
<input type="hidden" name="location" value={state} />



    </div>
  </div>
</form>
