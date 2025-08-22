<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";

  let name = "";
  let description = "";
  let category = "business";
  let type = "";
  let location = "";
  let stage = "Idea"; // NEW field
  let imageFile: File | null = null;
  let error: string | null = null;
  let submitting = false;

  const states = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
    "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
    "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
    "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
    "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
    "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
    "Wisconsin","Wyoming"
  ];

  const stages = ["Idea", "Starting", "Building", "Growing"];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (submitting) return;
    submitting = true;
    error = null;

    if (description.length < 60) {
      error = "Description must be at least 60 characters long.";
      submitting = false;
      return;
    }

    const { data: existing } = await supabase
      .from("ventures")
      .select("id")
      .eq("name", name)
      .maybeSingle();

    if (existing) {
      error = "That venture name is already taken.";
      submitting = false;
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      error = "You must be logged in to create a venture.";
      submitting = false;
      return;
    }

    let image_url: string | null = null;

    // if user selected an image
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("venture-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        error = uploadError.message;
        submitting = false;
        return;
      }

      // get full public URL
      const { data: publicUrlData } = supabase.storage
        .from("venture-images")
        .getPublicUrl(filePath);

      image_url = publicUrlData.publicUrl;
    }

    // insert venture
    const { error: insertError } = await supabase
      .from("ventures")
      .insert({
        name,
        description,
        category,
        type,
        location,
        stage, // NEW field
        user_id: user.id,
        image_url
      });

    if (insertError) {
      error = insertError.message;
      submitting = false;
      return;
    }

    goto("/");
  }
</script>


<div class="min-h-screen bg-[#f0f8ff] py-12">
  <div class="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
    <h1 class="text-3xl font-bold mb-2 text-left">
      Create a new venture profile
    </h1>
    <p class="text-gray-600 mb-8 text-left">
      Give your idea a digital home while it develops. A venture profile makes it easy 
      to be discovered, attract interest, and manage collaboration as it grows.
    </p>

    {#if error}
      <p class="text-red-600 mb-4">{error}</p>
    {/if}

    <form on:submit={handleSubmit} class="space-y-6">
      <div>
        <label class="block text-sm font-medium mb-1">Venture name</label>
        <input type="text" bind:value={name} required
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea bind:value={description} rows="3" required minlength="60"
          placeholder="A short description of your venture..."
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Category</label>
        <select bind:value={category}
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500">
          <option value="business">Business</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Type</label>
        <input type="text" bind:value={type}
          placeholder="e.g. music album, restaurant"
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Location of venture</label>
        <select bind:value={location} required
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>Select a state</option>
          {#each states as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Stage</label>
        <select bind:value={stage} required
          class="w-full border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500">
          {#each stages as st}
            <option value={st}>{st}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Upload image (optional)</label>
        <input type="file" accept="image/*" on:change={(e:any)=> imageFile = e.target.files[0]}
          class="w-full text-sm text-gray-600"/>
      </div>

      <div class="flex justify-end pt-4 mb-20 sm:mb-0">
        <button type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting}>
          {submitting ? "Creating..." : "Create venture profile"}
        </button>
      </div>
    </form>
  </div>
</div>
