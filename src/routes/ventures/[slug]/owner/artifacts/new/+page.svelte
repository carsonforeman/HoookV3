<script lang="ts">
  export let data;
  const venture = data.venture;

  let artifactName = "";
  let artifactDescription = "";

  type FileItem = {
    file: File;
    previewUrl: string | null;
    name: string;
    description: string;
  };

  let files: FileItem[] = [];

  function handleFilesSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;

    files = Array.from(input.files).map((file) => ({
      file,
      previewUrl:
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type.startsWith("audio/")
          ? URL.createObjectURL(file)
          : null,
      name: "",
      description: ""
    }));
  }
</script>

<form
  method="POST"
  enctype="multipart/form-data"
  class="space-y-8"
>
  <!-- BREADCRUMB / TITLE -->
  <div class="flex items-center gap-2 text-sm">
    <a
      href={`/ventures/${venture.slug}/owner`}
      class="text-blue-600 font-semibold text-base hover:underline"
    >
      {venture.name}
    </a>

    <span class="text-gray-400">/</span>

    <input
      name="artifact_name"
      bind:value={artifactName}
      placeholder="Name your artifact"
      class="text-base font-medium border-b focus:outline-none min-w-[220px]"
    />
  </div>

  <!-- DESCRIPTION -->
  <textarea
    name="artifact_description"
    bind:value={artifactDescription}
    rows="2"
    placeholder="Describe this artifact (optional)"
    class="w-full border rounded-lg px-4 py-3 text-sm"
  />

  <!-- FILE PICKER -->
  <div class="border rounded-xl p-6 bg-gray-50 space-y-3">
    <label class="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer">
      <span>Add files</span>
      <input
        type="file"
        multiple
        name="files"
        class="hidden"
        on:change={handleFilesSelected}
      />
    </label>
  </div>

  <!-- FILE META -->
  {#each files as item, i}
    <div class="border rounded-xl p-4 space-y-3">
      {#if item.previewUrl}
        <img src={item.previewUrl} class="w-16 h-16 object-cover rounded" />
      {/if}

      <input
        name={`file_name_${i}`}
        bind:value={item.name}
        placeholder="File name (optional)"
        class="w-full border rounded px-3 py-2 text-sm"
      />

      <textarea
        name={`file_description_${i}`}
        bind:value={item.description}
        rows="2"
        placeholder="File description (optional)"
        class="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  {/each}

  <!-- ACTIONS -->
  <div class="flex justify-end gap-4">
    <a href={`/ventures/${venture.slug}/owner`} class="text-sm text-gray-500">
      Cancel
    </a>

    <button
      type="submit"
      class="px-5 py-2 rounded-lg bg-blue-600 text-white"
    >
      Save artifact
    </button>
  </div>
</form>
