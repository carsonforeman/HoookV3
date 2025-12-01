<script>
  export let data;
  const venture = data.venture;
</script>

<div class="max-w-5xl mx-auto px-6 pt-10">

  <!-- OWNER HEADER -->
  <h1 class="text-2xl font-bold mb-2">Manage: {venture.name}</h1>
  <p class="text-gray-500 text-sm mb-6">Owner Dashboard</p>

  <!-- OWNER TABS -->
  <nav class="flex gap-6 border-b pb-3 text-gray-700 text-sm mb-8">

    <a href="/ventures/{venture.slug}/owner/dashboard"
      class="hover:text-blue-600"
    >Dashboard</a>

    <a href="/ventures/{venture.slug}/owner/progress"
      class="hover:text-blue-600"
    >Progress</a>

    <a href="/ventures/{venture.slug}/owner/ideas"
      class="hover:text-blue-600"
    >Ideas</a>

    <a href="/ventures/{venture.slug}/owner/sessions"
      class="hover:text-blue-600"
    >Sessions</a>

    <a href="/ventures/{venture.slug}/owner/tasks"
      class="hover:text-blue-600"
    >Tasks</a>

    <a href="/ventures/{venture.slug}/owner/team"
      class="hover:text-blue-600"
    >Team</a>

  </nav>

  <slot />

</div>
