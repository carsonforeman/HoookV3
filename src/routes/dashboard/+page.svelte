<script lang="ts">
  export let data;

  const profile = data?.profile;
  const ventures = data?.ventures ?? [];

  function initials(name: string) {
    return name?.charAt(0)?.toUpperCase() ?? "?";
  }
</script>

<div class="max-w-5xl mx-auto px-6 py-10 space-y-10">

  <!-- ========================== -->
  <!-- PAGE TITLE -->
  <!-- ========================== -->
  <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>

  <!-- ========================== -->
  <!-- PROFILE CARD -->
  <!-- ========================== -->
  <section class="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-6">

    {#if profile?.avatar_url}
      <img
        src={profile.avatar_url}
        alt="Profile"
        class="w-20 h-20 rounded-full object-cover border"
      />
    {:else}
      <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
        {initials(profile?.first_name ?? profile?.last_name ?? "")}
      </div>
    {/if}

    <div class="flex-1">
      <h2 class="text-xl font-semibold">
        {profile?.first_name} {profile?.last_name}
      </h2>
      <p class="text-gray-600 text-sm">
        {profile?.state || "No location set"}
      </p>
    </div>

    <a
      href="/myprofile"
      class="px-4 py-2 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 text-sm font-medium"
    >
      Edit Profile
    </a>
  </section>

  <!-- ========================== -->
  <!-- VENTURES LIST -->
  <!-- ========================== -->
  <section class="space-y-4">

    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">Your Ventures</h2>

      <a
        href="/ventures/new"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        + New Venture
      </a>
    </div>

    {#if ventures.length === 0}
      <div class="bg-white border rounded-xl p-6 text-center text-gray-600">
        You haven’t created any ventures yet.
      </div>
    {:else}
      <div class="grid gap-4">
        {#each ventures as v}
          <a
            href={`/ventures/${v.slug}/owner`}
            class="bg-white border rounded-xl p-5 shadow-sm flex items-center justify-between hover:bg-gray-50"
          >
            <div>
              <h3 class="font-medium text-gray-900">{v.name}</h3>
              <p class="text-gray-600 text-sm line-clamp-1">
                {v.description || "No description"}
              </p>
            </div>

            <span class="text-blue-600 text-sm font-medium">Manage →</span>
          </a>
        {/each}
      </div>
    {/if}

  </section>

  <!-- ========================== -->
  <!-- QUICK ACTIONS -->
  <!-- ========================== -->
  <section class="bg-white border rounded-xl p-6 shadow-sm space-y-4">

    <h2 class="text-xl font-semibold text-gray-900">Quick Actions</h2>

    <div class="grid sm:grid-cols-2 gap-4">

      <a
        href="/ventures/new"
        class="block p-4 border rounded-lg hover:bg-gray-50"
      >
        <p class="font-medium text-gray-900">Create a New Venture</p>
        <p class="text-gray-600 text-sm mt-1">Start something new—idea or project.</p>
      </a>

      <a
        href="/"
        class="block p-4 border rounded-lg hover:bg-gray-50"
      >
        <p class="font-medium text-gray-900">Explore Ventures</p>
        <p class="text-gray-600 text-sm mt-1">See what others are building.</p>
      </a>

    </div>

  </section>

</div>
