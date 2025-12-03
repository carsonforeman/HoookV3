<script lang="ts">
  export let data;
  const tasks = data.tasks ?? [];
</script>

<h2 class="text-xl font-semibold mb-4">Tasks</h2>

<form method="post" action="?/create" class="flex gap-2 mb-6">
  <input
    name="title"
    placeholder="New task..."
    class="border rounded-lg px-3 py-2 flex-1"
  />
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">
    Add
  </button>
</form>

{#if tasks.length === 0}
  <p class="text-gray-500">No tasks yet.</p>
{/if}

<div class="space-y-4">
  {#each tasks as t}
    <div class="border p-4 rounded-xl shadow-sm bg-white flex justify-between">
      <span>{t.title}</span>
      <span class="text-sm text-gray-500">{t.status}</span>
    </div>
  {/each}
</div>
