<script lang="ts">
  export let venture: {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
    location: string;
    stage: "Idea" | "Starting" | "Building" | "Growing"; // added stage
    image_url: string | null;
  };
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
  <img
    src={venture.image_url || "/default.png"}
    alt={venture.name}
    class="w-full h-48 object-cover rounded-t-lg"
  />

  <div class="p-4">
    <h2 class="text-xl font-semibold mb-1">{venture.name}</h2>
    <p class="text-gray-600 text-sm mb-2">
      {venture.type} • {venture.location}
    </p>
    <p class="text-gray-700 line-clamp-3 mb-3">{venture.description}</p>

    <!-- Stage badge -->
    {#if venture.stage}
      <span
        class="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium"
      >
        {venture.stage}
      </span>
    {/if}
  </div>
</div>
