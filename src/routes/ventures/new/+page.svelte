<script lang="ts">
  import { onMount } from "svelte";
  import {
    Lightbulb, Hammer, Rocket, TrendingUp,
    Palette, Laptop, Package, Briefcase, Heart,
    Users, DollarSign, GraduationCap
  } from "lucide-svelte";

  // optional, if you pass it from +page.server load
  export let data: { user: any } | undefined;

  let step = 1;
  let error = "";

  type Form = {
    stage: string;
    category: string;
    type: string;
    location: string;
    name: string;
    slug: string;
    about: string;
    seeking: string[];
    logo: File | null;
  };

  let form: Form = {
    stage: "",
    category: "",
    type: "",
    location: "",
    name: "",
    slug: "",
    about: "",
    seeking: [],
    logo: null
  };

  const stages = [
    { value: "idea",     label: "Idea",     desc: "A spark of inspiration, notes, early sketches.", icon: Lightbulb },
    { value: "starting", label: "Starting", desc: "Taking first steps, building a prototype, testing.", icon: Hammer },
    { value: "building", label: "Building", desc: "Developing your product, gathering feedback.", icon: Rocket },
    { value: "growing",  label: "Growing",  desc: "Gaining traction, launching publicly, scaling.", icon: TrendingUp }
  ];

  const categories = [
    { value: "creative",         label: "Creative Venture", examples: "Art projects, writing, film, music",           icon: Palette },
    { value: "digital-product",  label: "Digital Product",  examples: "Apps, software, eBooks, online courses",      icon: Laptop },
    { value: "physical-product", label: "Physical Product", examples: "Crafts, clothing, electronics",               icon: Package },
    { value: "service-business", label: "Service Business", examples: "Consulting, coaching, design services",       icon: Briefcase },
    { value: "social-impact",    label: "Social Impact",    examples: "Nonprofits, education, community projects",   icon: Heart }
  ];

  const seekingOptions = [
    { value: "investment",   label: "Investment",   desc: "Looking for funding to grow your venture.",         icon: DollarSign },
    { value: "collaboration",label: "Collaboration",desc: "Seeking partners or co-creators.",                  icon: Users },
    { value: "mentorship",   label: "Mentorship",   desc: "Guidance from experienced founders or experts.",    icon: GraduationCap }
  ];

  const states = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
    "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
    "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
    "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
    "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
    "Wisconsin","Wyoming","Outside USA"
  ];

  // Restore (ignore logo, can't serialize)
  onMount(() => {
    try {
      const saved = typeof localStorage !== "undefined" ? localStorage.getItem("ventureForm") : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        form = { ...form, ...parsed, logo: null };
      }
    } catch (err) {
      console.warn("Error loading form from localStorage", err);
    }
  });

  // Persist (skip logo)
  $: {
    if (typeof localStorage !== "undefined") {
      const { logo, ...serializable } = form;
      localStorage.setItem("ventureForm", JSON.stringify(serializable));
    }
  }

  // Slugify as they type
  $: form.slug = form.name
    ? form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : "";

  function next() {
    error = "";
    if (step === 1 && !form.name.trim()) { error = "Please enter a venture name."; return; }
    if (step === 2 && (!form.about || form.about.length < 60)) { error = "Description must be at least 60 characters."; return; }
    if (step === 3 && !form.stage) { error = "Please select a stage."; return; }
    if (step === 4 && !form.category) { error = "Please select a category."; return; }
    if (step === 5 && !form.type.trim()) { error = "Please enter the type of your venture."; return; }
    if (step === 6 && !form.location) { error = "Please select a location."; return; }
    if (step === 7 && form.seeking.length === 0) { error = "Please select at least one option."; return; }
    // Do NOT auto-submit here; final step has a real submit button
    step = Math.min(8, step + 1);
  }

  function back() { step = Math.max(1, step - 1); }

  function toggleSeeking(value: string) {
    if (form.seeking.includes(value)) {
      form.seeking = form.seeking.filter(v => v !== value);
    } else {
      form.seeking = [...form.seeking, value];
    }
  }
</script>

<form id="create-venture" method="post" enctype="multipart/form-data" class="flex min-h-screen">
  <!-- Left image only on step 1 -->
  {#if step === 1}
    <div class="w-1/2 flex items-start justify-center p-8">
      <img src="/images/phone.png" alt="Phone preview" class="h-[600px] object-contain" />
    </div>
  {/if}

  <div class="{step === 1 ? 'w-1/2 p-12' : 'w-full max-w-xl mx-auto p-12'}">
    {#if step === 1}
      <h1 class="text-2xl font-bold mb-4">
        Get your venture discovered by collaborators, supporters, and future customers.
      </h1>
      <p class="text-gray-500 mb-6">What is the name of this venture?</p>
      <input
        type="text"
        bind:value={form.name}
        name="name"
        class="border p-2 rounded w-full mb-4"
      />
      <div class="text-sm text-gray-500 mb-6">Your profile link: hoook.com/ventures/{form.slug || "your-name"}</div>
    {/if}

    {#if step === 2}
      <h2 class="text-lg font-bold mt-8 mb-2">What is a brief description of your venture?</h2>
      <textarea
        bind:value={form.about}
        name="about"
        rows="5"
        class="border p-2 rounded w-full mb-6"
      ></textarea>
    {/if}

    {#if step === 3}
      <h2 class="text-lg font-bold mt-8 mb-2">Which stage best describes your venture?</h2>
      <p class="text-sm text-gray-500 mb-4">Choose the stage that fits you best right now.</p>
      <div class="grid grid-cols-2 gap-3 mb-6">
        {#each stages as s}
          <button
            type="button"
            class="border p-3 rounded-xl flex items-center gap-3 text-left hover:border-blue-400 transition
              {form.stage === s.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}"
            on:click={() => form.stage = s.value}
          >
            <s.icon class="w-5 h-5" /> 
            <div>
              <div class="font-medium">{s.label}</div>
              <div class="text-sm text-gray-500">{s.desc}</div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    {#if step === 4}
      <h2 class="text-lg font-bold mt-8 mb-2">What category does your venture belong to?</h2>
      <p class="text-sm text-gray-500 mb-4">Pick the category that best represents your work.</p>
      <div class="grid grid-cols-2 gap-3 mb-6">
        {#each categories as c}
          <button
            type="button"
            class="border p-3 rounded-xl flex items-center gap-3 text-left hover:border-blue-400 transition
              {form.category === c.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}"
            on:click={() => form.category = c.value}
          >
            <c.icon class="w-5 h-5" />
            <div>
              <div class="font-medium">{c.label}</div>
              <div class="text-sm text-gray-500">{c.examples}</div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    {#if step === 5}
      <h2 class="text-lg font-bold mt-8 mb-2">What type of venture is this?</h2>
      <input
        type="text"
        bind:value={form.type}
        name="type"
        class="border p-2 rounded w-full mb-6"
      />
    {/if}

    {#if step === 6}
      <h2 class="text-lg font-bold mt-8 mb-2">Where is your venture based?</h2>
      <select
        bind:value={form.location}
        name="location"
        class="border p-2 rounded w-full mb-6"
      >
        <option value="">Select a state</option>
        {#each states as st}
          <option value={st}>{st}</option>
        {/each}
      </select>
    {/if}

    {#if step === 7}
      <h2 class="text-lg font-bold mt-8 mb-2">What are you seeking right now?</h2>
      <p class="text-sm text-gray-500 mb-4">You can select <strong>multiple</strong> options.</p>
      <div class="grid grid-cols-2 gap-3 mb-6">
        {#each seekingOptions as o}
          <button
            type="button"
            class="border p-3 rounded-xl flex items-center gap-3 text-left hover:border-blue-400 transition
              {form.seeking.includes(o.value) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}"
            on:click={() => toggleSeeking(o.value)}
          >
            <o.icon class="w-5 h-5" />
            <div>
              <div class="font-medium">{o.label}</div>
              <div class="text-sm text-gray-500">{o.desc}</div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    {#if step === 8}
      <h2 class="text-lg font-bold mt-8 mb-2">Upload your venture logo</h2>
      <input
        type="file"
        name="logo"
        accept="image/*"
        on:change={(e) => form.logo = (e.target as HTMLInputElement).files?.[0] || null}
        class="mb-6"
      />
    {/if}

    {#if error}
      <div class="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
    {/if}

    <!-- Navigation buttons -->
    <div class="flex justify-between mt-6">
      {#if step > 1}
        <button type="button" on:click={back} class="px-4 py-2 border rounded">Back</button>
      {/if}

      {#if step < 8}
        <button type="button" on:click={next} class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
          Next
        </button>
      {:else}
        <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
          Create Venture
        </button>
      {/if}
    </div>
  </div>

  <!-- Hidden inputs kept in-sync so the action receives everything -->
  <input type="hidden" name="name"     value={form.name} />
  <input type="hidden" name="about"    value={form.about} />
  <input type="hidden" name="stage"    value={form.stage} />
  <input type="hidden" name="category" value={form.category} />
  <input type="hidden" name="type"     value={form.type} />
  <input type="hidden" name="location" value={form.location} />
  <input type="hidden" name="slug"     value={form.slug} />
  {#each form.seeking as s}
    <input type="hidden" name="seeking" value={s} />
  {/each}
</form>
