<script lang="ts">
  export let data;
  const progress = data.progress ?? [];
</script>

<h2 class="text-xl font-semibold mb-4">Progress</h2>

{#if progress.length === 0}
  <p class="text-gray-500">No progress updates yet.</p>
{/if}

<div class="space-y-4">
  {#each progress as p}
    <div class="border p-4 rounded-xl shadow-sm bg-white">
      <h3 class="font-semibold">{p.title}</h3>
      <p class="text-sm text-gray-600 mt-1">{p.description}</p>
      <p class="text-xs text-gray-400 mt-2">
        {new Date(p.created_at).toLocaleString()}
      </p>
    </div>
  {/each}
</div>
