<script lang="ts">
  export let data;

  const venture = data.venture;
  const user = data.user;

  const titleCase = (str: string) =>
    str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : "";
</script>

<!-- ========================= -->
<!-- 🌐 OWNER VIEW MAIN WRAPPER -->
<!-- ========================= -->
<div class="flex-1 pb-20 md:pb-0">

  <!-- ========================= -->
  <!-- ⭐ OWNER HEADER -->
  <!-- ========================= -->
  <header class="p-6 border-b bg-white flex items-start justify-between max-w-5xl mx-auto">

    <div class="flex items-center gap-4">

      <!-- LOGO -->
      {#if venture.logo_url}
        <img
          src={venture.logo_url}
          alt="{venture.name} logo"
          class="w-40 h-40 rounded-2xl object-cover border shadow-sm"
        />
      {:else}
        <div
          class="w-40 h-40 rounded-2xl bg-gray-200 flex items-center justify-center font-bold text-3xl"
        >
          {venture.name.slice(0, 2).toUpperCase()}
        </div>
      {/if}

      <!-- NAME / TYPE / LOCATION -->
      <div class="max-w-[70%]">
        <h1 class="text-3xl font-bold">{venture.name}</h1>
        <p class="text-gray-600 mt-1 text-sm">
          {titleCase(venture.type)} • {titleCase(venture.location)}
        </p>

        {#if venture.about}
          <p class="text-gray-700 mt-3 whitespace-pre-line">
            {venture.about}
          </p>
        {/if}

        <a 
          href={`/ventures/${venture.slug}/owner/edit`}
          class="text-blue-600 text-sm mt-3 inline-block hover:underline"
        >
          Edit venture details
        </a>
      </div>
    </div>

    <!-- View-as-user -->
    <a
      href={`/ventures/${venture.slug}`}
      class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 h-fit"
    >
      View as User
    </a>

  </header>

  <!-- ========================= -->
  <!-- 🔥 PAGE CONTENT -->
  <!-- ========================= -->
  <main class="p-6 max-w-5xl mx-auto">
    <slot />
  </main>
</div>
