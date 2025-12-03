<script lang="ts">
  export let data;

  const venture = data.venture;
</script>

<div class="space-y-8">

  <!-- ========================= -->
  <!-- 🔥 OWNER CANVAS HEADER    -->
  <!-- ========================= -->
  <section>
    <h2 class="text-2xl font-bold">
      Venture Canvas
    </h2>

    <p class="text-gray-600 mt-1 text-sm">
      Add content, organize your ideas, and build out your venture.
    </p>
  </section>


  <!-- ========================= -->
  <!-- 🧩 CANVAS SECTIONS       -->
  <!-- ========================= -->

  <!-- SHOWCASE -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Showcase</h3>

      <a
        href={`/ventures/${venture.slug}/owner/showcase/add`}
        class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Add Post
      </a>
    </div>

    <p class="text-gray-500 text-sm">
      Photos, audio clips, mockups, designs, demos, screenshots — anything that shows what you’re creating.
    </p>
  </section>


  <!-- TEAM -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Team</h3>

      <a
        href={`/ventures/${venture.slug}/owner/team/add`}
        class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Add Member
      </a>
    </div>

    <p class="text-gray-500 text-sm">
      Invite collaborators and manage your venture team.
    </p>
  </section>


  <!-- TASKS -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Tasks</h3>

      <a
        href={`/ventures/${venture.slug}/owner/tasks/add`}
        class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Add Task
      </a>
    </div>

    <p class="text-gray-500 text-sm">
      Keep track of what needs to get done.
    </p>
  </section>


  <!-- IDEAS -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Ideas</h3>

      <a
        href={`/ventures/${venture.slug}/owner/ideas/add`}
        class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Add Idea
      </a>
    </div>

    <p class="text-gray-500 text-sm">
      Brainstorm concepts, features, improvements, and future directions.
    </p>
  </section>


  <!-- SESSIONS -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Sessions</h3>

      <a
        href={`/ventures/${venture.slug}/owner/sessions/add`}
        class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Schedule Session
      </a>
    </div>

    <p class="text-gray-500 text-sm">
      Create meetings, work sessions, and collaboration calls.
    </p>
  </section>

</div>
