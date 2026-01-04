<script lang="ts">
  import ArtifactCard from "$lib/components/ArtifactCard.svelte";

  export let data;

  const venture = data.venture;
  const artifacts = data.artifacts ?? [];
  const ownerProfile = data.ownerProfile;
</script>

<div class="space-y-6">


  <!-- ACTION ROW -->
  <div class="flex items-center justify-between">
    <h2 class="text-sm font-medium text-gray-500">
      Artifacts
    </h2>

    <a
      href={`/ventures/${venture.slug}/owner/artifacts/new`}
      class="px-4 py-2 text-sm font-medium rounded-lg
             bg-blue-600 text-white hover:bg-blue-700"
    >
      + Add Artifact
    </a>
  </div>

  <!-- CONTENT -->
  {#if artifacts.length === 0}
    <div class="bg-white border rounded-xl p-8 text-center">
      <h3 class="text-base font-medium mb-2">
        No artifacts yet
      </h3>

      <p class="text-sm text-gray-500 max-w-md mx-auto">
        Artifacts are concrete outputs like prototypes, songs, decks,
        documents, photos, or event media. Add the first thing you’ve made.
      </p>
    </div>
  {:else}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each artifacts as artifact}
        <ArtifactCard {artifact} />
      {/each}
    </div>
  {/if}

</div>
