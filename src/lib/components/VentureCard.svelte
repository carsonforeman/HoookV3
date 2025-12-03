<script lang="ts">
  import { MapPin } from "lucide-svelte";
  export let venture;

  /* ------------------------
      Title Case Helper
  ------------------------ */
  function titleCase(str: string = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  /* ------------------------
      FIX: Format Location
      Always → City, ST
  ------------------------ */
  function formatLocation(loc: string = "") {
    const parts = loc.split(",").map(s => s.trim());

    if (parts.length === 2) {
      const city = titleCase(parts[0]);
      const state = parts[1].substring(0, 2).toUpperCase();  // FORCE 2-letter code
      return `${city}, ${state}`;
    }

    return titleCase(loc);
  }

  /* Stage badge styles */
  const stageStyles = {
    starting:  { label: "Starting",  color: "bg-yellow-500" },
    building:  { label: "Building",  color: "bg-green-500" },
    growing:   { label: "Growing",   color: "bg-blue-500" }
  };

  const normalizedStage = venture.stage?.toLowerCase();
  const stage = stageStyles[normalizedStage];

  /* Initials fallback */
  function getInitials(name: string) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  /* Gradient generator */
  function hashString(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
    return Math.abs(h);
  }

  const gradients = [
    ["#6366f1", "#3b82f6"],
    ["#a855f7", "#ec4899"],
    ["#14b8a6", "#0ea5e9"],
    ["#f97316", "#ef4444"],
    ["#10b981", "#22c55e"]
  ];

  function getGradient(name: string) {
    const [a, b] = gradients[hashString(name) % gradients.length];
    return `background: linear-gradient(135deg, ${a}, ${b});`;
  }
</script>

<a href={`/ventures/${venture.slug}`} class="block">
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden
              hover:shadow-md hover:scale-[1.01] transition duration-200">

    <!-- IMAGE (fixed height) -->
    <div class="relative h-40 w-full">
      {#if venture.logo_url}
        <img src={venture.logo_url} class="h-full w-full object-cover" alt={venture.name} />
      {:else}
        <div class="h-full w-full flex items-center justify-center text-white text-4xl font-bold"
             style={getGradient(venture.name)}>
          {getInitials(venture.name)}
        </div>
      {/if}

      {#if stage}
        <span class={`absolute top-2 left-2 px-2 py-1 text-xs text-white rounded-full ${stage.color}`}>
          {stage.label}
        </span>
      {/if}
    </div>

    <!-- CONTENT (fixed calibrated height) -->
    <div class="p-4 flex flex-col min-h-[170px]">

      <h2 class="text-lg font-semibold mb-1 line-clamp-1">
        {venture.name}
      </h2>

      <p class="text-blue-600 text-xs font-medium mb-2 line-clamp-1">
        {titleCase(venture.type)}
      </p>

      <p class="text-gray-700 text-sm mb-3 line-clamp-3">
        {venture.about}
      </p>

      <!-- LOCATION ON BOTTOM ALWAYS -->
      <div class="flex items-center text-gray-500 text-xs mt-auto">
        <MapPin class="w-3 h-3 mr-1" />
        {formatLocation(venture.location)}
      </div>

    </div>
  </div>
</a>
