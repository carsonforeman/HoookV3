<script lang="ts">
  import { MapPin } from "lucide-svelte";

  export let person;

  /* ------------------------
      Initials fallback
  ------------------------ */
  function getInitials(name: string) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  /* ------------------------
      Gradient generator
  ------------------------ */
  function hashString(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = str.charCodeAt(i) + ((h << 5) - h);
    }
    return Math.abs(h);
  }

  const gradients = [
    ["#6366f1", "#3b82f6"],
    ["#a855f7", "#ec4899"],
    ["#14b8a6", "#0ea5e9"],
    ["#f97316", "#ef4444"],
    ["#10b981", "#22c55e"]
  ];

  function getGradient(seed: string) {
    const [a, b] = gradients[hashString(seed) % gradients.length];
    return `background: linear-gradient(135deg, ${a}, ${b});`;
  }

  /* ------------------------
      Location formatting
  ------------------------ */
  function formatLocation(state?: string) {
    if (!state) return "";
    return `${state}, USA`;
  }
</script>

<a href={`/u/${person.username}`} class="block">
  <div
    class="bg-white rounded-xl border border-gray-100 shadow-sm
           hover:shadow-md hover:scale-[1.01]
           transition duration-200 flex flex-col"
  >

    <!-- AVATAR -->
    <div class="relative h-36 w-full flex items-center justify-center">
      {#if person.avatar_url}
        <img
          src={person.avatar_url}
          alt={`${person.first_name} ${person.last_name}`}
          class="w-20 h-20 rounded-full object-cover shadow-sm"
        />
      {:else}
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center
                 text-white text-xl font-semibold shadow-sm"
          style={getGradient(person.username)}
        >
          {getInitials(`${person.first_name} ${person.last_name}`)}
        </div>
      {/if}
    </div>

    <!-- CONTENT -->
    <div class="px-4 pb-4 text-center flex flex-col gap-2">

      <h3 class="font-semibold text-base leading-tight">
        {person.first_name} {person.last_name}
      </h3>

      {#if person.state}
        <div class="flex items-center justify-center text-xs text-gray-500 gap-1">
          <MapPin class="w-3 h-3" />
          {formatLocation(person.state)}
        </div>
      {/if}

      {#if person.collaboration_intent}
        <div
          class="mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium
                 bg-gray-100 text-gray-700 self-center"
        >
          {person.collaboration_intent === "join"
            ? "Looking to join a venture"
            : "Looking for collaborators"}
        </div>
      {/if}

    </div>
  </div>
</a>
