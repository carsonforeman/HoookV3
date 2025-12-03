<script lang="ts">
  export let data;
  const team = data.team ?? [];
</script>

<h2 class="text-xl font-semibold mb-4">Team</h2>

{#if team.length === 0}
  <p class="text-gray-500">No team members added yet.</p>
{/if}

<div class="space-y-4">
  {#each team as member}
    <div class="border p-4 rounded-xl bg-white shadow-sm">
      <h3 class="font-semibold">{member.name}</h3>
      <p class="text-sm text-gray-600">{member.role}</p>
      <p class="text-xs text-gray-400">{member.email}</p>
    </div>
  {/each}
</div>
