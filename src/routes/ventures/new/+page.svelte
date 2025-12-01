<script lang="ts">
  export let data: { user: any; profile: any } | undefined;

  // Form fields
  let name = "";
  let description = "";
  let stage: "starting" | "building" | "growing" = "starting";
  let type = "";
  let location = "";
  let useProfileLocation = false;
  let seeking: string[] = [];
  let logoFile: File | null = null;

  const stageOptions = [
    { value: "starting", label: "Starting", desc: "Early drafts, ideas, or planning." },
    { value: "building", label: "building", desc: "Creating, producing, or prototyping." },
    { value: "growing", label: "growing", desc: "Launching, sharing, gaining traction." }
  ];

  const seekingOptions = [
    { value: "collaboration", label: "Collaboration" },
    { value: "mentorship", label: "Mentorship" },
    { value: "feedback", label: "Feedback" },
    { value: "investment", label: "Investment" }
  ];

  // Handle profile location shortcut
  $: if (useProfileLocation && data?.profile?.city) {
    location = data.profile.city;
  }

  // Slug preview
  $: slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
</script>

<form method="post" enctype="multipart/form-data" class="max-w-2xl mx-auto p-8 space-y-8">

  <h1 class="text-3xl font-bold">Create Your Venture</h1>
  <p class="text-gray-600">All fields are required except logo.</p>

  <!-- Venture Name -->
  <div>
    <label class="block font-medium mb-1">Venture Name</label>
    <input
      type="text"
      name="name"
      bind:value={name}
      required
      placeholder="Sonomi Headphones, Rap Album, Mobile App..."
      class="border p-2 rounded w-full"
    />
    <p class="text-xs text-gray-500 mt-1">hoook.com/ventures/{slug || "your-venture"}</p>
  </div>

  <!-- Description -->
  <div>
    <label class="block font-medium mb-1">Short Description</label>
    <textarea
      name="about"
      bind:value={description}
      rows="4"
      maxlength="280"
      required
      placeholder="Describe your project in 1–2 sentences."
      class="border p-2 rounded w-full"
    ></textarea>
    <p class="text-xs text-gray-500 mt-1">{description.length}/280</p>
  </div>

  <!-- Stage -->
  <div>
    <label class="block font-medium mb-2">Stage of Your Venture</label>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      {#each stageOptions as s}
        <button
          type="button"
          class="border rounded-lg p-3 text-left hover:border-blue-500 transition
            {stage === s.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}"
          on:click={() => (stage = s.value)}
        >
          <div class="font-semibold">{s.label}</div>
          <div class="text-xs text-gray-500">{s.desc}</div>
        </button>
      {/each}
    </div>
    <input type="hidden" name="stage" value={stage} />
  </div>

  <!-- Type -->
  <div>
    <label class="block font-medium mb-1">What type of venture is this?</label>
    <input
      type="text"
      name="type"
      bind:value={type}
      required
      placeholder="app, restaurant, EP, clothing brand, nonprofit…"
      class="border p-2 rounded w-full"
    />
  </div>

  <!-- Location -->
  <div>
    <label class="block font-medium mb-1">Location</label>

    <div class="flex items-center gap-2 mb-2">
      <input
        type="checkbox"
        id="useLocation"
        bind:checked={useProfileLocation}
      />
      <label for="useLocation" class="text-sm">Use my profile location</label>
    </div>

    <input
      type="text"
      name="location"
      bind:value={location}
      required
      placeholder="Chicago, IL"
      class="border p-2 rounded w-full"
    />
  </div>

  <!-- Seeking -->
  <div>
    <label class="block font-medium mb-2">What resources are you seeking?</label>
    <div class="grid grid-cols-2 gap-2">
      {#each seekingOptions as opt}
        <label class="flex items-center gap-2 border p-2 rounded cursor-pointer">
          <input
            type="checkbox"
            value={opt.value}
            checked={seeking.includes(opt.value)}
            on:change={(e) => {
              const checked = (e.target as HTMLInputElement).checked;
              if (checked) seeking = [...seeking, opt.value];
              else seeking = seeking.filter((s) => s !== opt.value);
            }}
          />
          {opt.label}
        </label>
      {/each}
    </div>
    <!-- Required: at least one -->
    <input type="hidden" name="seeking" value={JSON.stringify(seeking)} />
  </div>

  <!-- Logo upload -->
  <div>
    <label class="block font-medium mb-1">Logo (optional)</label>
    <input
      type="file"
      name="logo"
      accept="image/*"
      on:change={(e) => (logoFile = (e.target as HTMLInputElement).files?.[0] || null)}
      class="w-full"
    />
  </div>

  <button
    type="submit"
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    Create Venture
  </button>

  <!-- Hidden fields -->
  <input type="hidden" name="slug" value={slug} />
  <input type="hidden" name="seekingList" value={JSON.stringify(seeking)} />

</form>
