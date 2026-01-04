<script lang="ts">
  import { MoreHorizontal } from "lucide-svelte";

  export let artifact;

  let menuOpen = false;

  // Pick the first file for preview
  const previewFile = artifact.artifact_files?.[0];

  function toggleMenu(e) {
    e.stopPropagation();
    menuOpen = !menuOpen;
  }

  function stop(e) {
    e.stopPropagation();
  }
</script>

<a
  href={`/ventures/${artifact.venture_slug ?? ""}/owner/artifacts/${artifact.id}`}
  class="block"
>
  <div
    class="relative bg-white border rounded-xl p-4 space-y-3
           hover:shadow-md transition"
  >

    <!-- QUICK ACTIONS -->
    <div class="absolute top-2 right-2 z-10">
      <button
        class="p-1 rounded hover:bg-gray-100"
        on:click={toggleMenu}
        aria-label="Actions"
      >
        <MoreHorizontal class="w-4 h-4 text-gray-500" />
      </button>

      {#if menuOpen}
        <div
          class="absolute right-0 mt-1 w-28 bg-white border rounded-lg shadow text-sm"
          on:click={stop}
        >
          <a
            href={`/ventures/${artifact.venture_slug ?? ""}/owner/artifacts/${artifact.id}/edit`}
            class="block px-3 py-2 hover:bg-gray-100"
          >
            Edit
          </a>
          <button
            class="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      {/if}
    </div>

    <!-- TITLE -->
    <div class="flex justify-between items-start pr-6">
      <h3 class="font-medium line-clamp-1">
        {artifact.name}
      </h3>
      <span class="text-xs text-gray-400">
        {new Date(artifact.created_at).toLocaleDateString()}
      </span>
    </div>

    {#if artifact.description}
      <p class="text-sm text-gray-600 line-clamp-2">
        {artifact.description}
      </p>
    {/if}

    <!-- PREVIEW -->
    {#if previewFile}
      <div class="mt-2">
        {#if previewFile.file_type.startsWith("image/")}
          <img
            src={previewFile.file_path}
            alt=""
            class="w-full h-40 object-cover rounded-lg"
          />

        {:else if previewFile.file_type.startsWith("video/")}
          <video
            src={previewFile.file_path}
            controls
            class="w-full h-40 rounded-lg"
            on:click={stop}
          />

        {:else if previewFile.file_type.startsWith("audio/")}
          <audio
            src={previewFile.file_path}
            controls
            class="w-full"
            on:click={stop}
          />
        {/if}
      </div>
    {/if}

    <!-- FILE COUNT -->
    {#if artifact.artifact_files?.length > 1}
      <p class="text-xs text-gray-400">
        +{artifact.artifact_files.length - 1} more file{artifact.artifact_files.length > 2 ? "s" : ""}
      </p>
    {/if}

  </div>
</a>
