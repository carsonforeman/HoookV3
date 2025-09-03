<script lang="ts">
  import { MapPin, Lightbulb, Hammer, Rocket, TrendingUp, Target } from "lucide-svelte";

  export let venture: {
    id: string;
    uid: string;
    name: string;
    slug: string;   // Make sure your DB has this
    type: string; 
    about: string;
    category: string;
    location: string;
    stage: string;
    seeking: string[];
    logo_url: string | null;
  };

  const stageMap: Record<string, { icon: any; label: string; color: string }> = {
    Idea:       { icon: Lightbulb, label: "Idea", color: "bg-gray-100 text-gray-700" },
    Starting:   { icon: Hammer, label: "Starting", color: "bg-yellow-100 text-yellow-700" },
    Building:   { icon: Rocket, label: "Building", color: "bg-green-100 text-green-700" },
    Growing:    { icon: TrendingUp, label: "Growing", color: "bg-blue-100 text-blue-700" }
  };

  const seekingColors: Record<string, string> = {
    Investment: "bg-green-100 text-green-700",
    Mentorship: "bg-purple-100 text-purple-700",
    Collaboration: "bg-yellow-100 text-yellow-700"
  };

  function titleCase(str: string): string {
    return str
      ? str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
      : "";
  }

  $: stageData = venture.stage ? stageMap[titleCase(venture.stage)] : null;
</script>

<a href={`/ventures/${venture.slug}`} class="block">
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 flex flex-col cursor-pointer hover:scale-105">
    <!-- Venture image -->
    <img
      src={venture.logo_url ?? "/default.png"}
      alt={venture.name}
      class="w-full h-48 object-cover rounded-t-lg"
    />

    <div class="p-4 flex flex-col flex-1">
      <!-- Venture name -->
      <h2 class="text-xl font-semibold mb-1">{venture.name}</h2>

      <!-- Type -->
      <p class="text-blue-600 text-sm font-medium mb-1">{titleCase(venture.type)}</p>

      <!-- Location -->
      <p class="text-gray-500 text-xs mb-3 flex items-center gap-1">
        <MapPin class="w-3 h-3" />
        {titleCase(venture.location)}
      </p>

      <!-- About -->
      <p class="text-gray-700 mb-3 flex-1 line-clamp-3">{venture.about}</p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 mt-auto">
        {#if stageData}
          <span
            class={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium ${stageData.color}`}
          >
            <svelte:component this={stageData.icon} class="w-3 h-3" />
            {stageData.label} Stage
          </span>
        {/if}

        {#each venture.seeking ?? [] as s}
          <span
            class={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium ${seekingColors[titleCase(s)] ?? 'bg-blue-100 text-blue-700'}`}
          >
            <Target class="w-3 h-3" />
            {titleCase(s)}
          </span>
        {/each}
      </div>
    </div>
  </div>
</a>
