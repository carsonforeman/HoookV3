<script>
  export let location = "";
  export let stage = "";
  export let seeking = "";

  const states = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
    "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
    "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
    "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ];

  const stages = ["Idea", "Starting", "Building", "Growing"];
  const seekings = ["Collaboration", "Mentorship", "Investment"];

  function selectClass(value) {
    return value
      ? "bg-gray-200 text-gray-900 font-medium"
      : "bg-gray-100 text-gray-700";
  }
</script>

<div class="w-full border-b border-gray-200 bg-white">
  <div class="flex gap-3 px-4 py-2 overflow-x-auto">
    <!-- Location -->
    <select
      bind:value={location}
      class={`appearance-none ${selectClass(location)} px-3 py-2 rounded-md border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-gray-400 pr-8`}
    >
      <option value="">All States</option>
      {#each states as s}
        <option value={s}>{s}</option>
      {/each}
    </select>

    <!-- Stage -->
    <select
      bind:value={stage}
      class={`appearance-none ${selectClass(stage)} px-3 py-2 rounded-md border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-gray-400 pr-8`}
    >
      <option value="">All Stages</option>
      {#each stages as st}
        <option value={st}>{st}</option>
      {/each}
    </select>

    <!-- Seeking -->
    <select
      bind:value={seeking}
      class={`appearance-none ${selectClass(seeking)} px-3 py-2 rounded-md border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-gray-400 pr-8`}
    >
      <option value="">All Seeking</option>
      {#each seekings as sk}
        <option value={sk}>{sk}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  select {
    background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='gray' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
  }
  select:has(option:checked:not([value=""])) {
    background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='black' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  }
</style>
