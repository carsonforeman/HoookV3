<script lang="ts">
  export let data;
  const ideas = data.ideas ?? [];
</script>

<h2 class="text-xl font-semibold mb-4">Ideas</h2>

{#if ideas.length === 0}
  <p class="text-gray-500">No ideas yet.</p>
{/if}

<div class="space-y-4">
  {#each ideas as idea}
    <div class="border p-4 rounded-xl shadow-sm bg-white">
      <h3 class="font-semibold">{idea.title}</h3>
      <p class="text-sm text-gray-600 mt-1">{idea.description}</p>
      <p class="text-xs text-gray-400 mt-2">
        {new Date(idea.created_at).toLocaleString()}
      </p>
    </div>
  {/each}
</div>
