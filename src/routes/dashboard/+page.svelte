<script lang="ts">
  export let data;
  export let form;

  let editing = false;

  function toggleEdit() {
    editing = !editing;
  }
</script>

{#if data.error}
  <p class="text-red-500">{data.error}</p>
{/if}

{#if data.profile}
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <!-- Profile Card -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center space-x-4">
        <!-- Avatar (clickable in edit mode) -->
        <label for="avatar" class="cursor-pointer relative">
          <img
            src={data.profile.avatar_url || '/images/default-avatar.png'}
            alt="Avatar"
            class="w-20 h-20 rounded-full object-cover border hover:opacity-80"
          />
          {#if editing}
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              class="hidden"
            />
          {/if}
        </label>
        <div>
          <h2 class="text-xl font-semibold">
            {data.profile.first_name} {data.profile.last_name}
          </h2>
          <p class="text-gray-500">{data.profile.role || 'No role set'}</p>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="mt-6">
        <form method="POST" class="space-y-4">
          <div>
            <label class="block text-sm font-medium">First Name</label>
            {#if editing}
              <input
                type="text"
                name="first_name"
                class="w-full border rounded px-3 py-2"
                value={data.profile.first_name || ''}
              />
            {:else}
              <p class="text-gray-700">{data.profile.first_name || '-'}</p>
            {/if}
          </div>

          <div>
            <label class="block text-sm font-medium">Last Name</label>
            {#if editing}
              <input
                type="text"
                name="last_name"
                class="w-full border rounded px-3 py-2"
                value={data.profile.last_name || ''}
              />
            {:else}
              <p class="text-gray-700">{data.profile.last_name || '-'}</p>
            {/if}
          </div>

          <div>
            <label class="block text-sm font-medium">State</label>
            {#if editing}
              <select
                name="state"
                class="w-full border rounded px-3 py-2"
                value={data.profile.state || ''}
              >
                <option value="">Select state</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <!-- Add all states here -->
              </select>
            {:else}
              <p class="text-gray-700">{data.profile.state || '-'}</p>
            {/if}
          </div>

          <div>
            <label class="block text-sm font-medium">Role</label>
            {#if editing}
              <select
                name="role"
                class="w-full border rounded px-3 py-2"
                value={data.profile.role || ''}
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            {:else}
              <p class="text-gray-700">{data.profile.role || '-'}</p>
            {/if}
          </div>

          <!-- Buttons -->
          <div class="flex items-center space-x-4 mt-4">
            {#if editing}
              <button
                type="submit"
                name="updateProfile"
                value="true"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                on:click={toggleEdit}
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            {:else}
              <button
                type="button"
                on:click={toggleEdit}
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            {/if}
          </div>

          {#if form?.error}
            <p class="text-red-500">{form.error}</p>
          {/if}
          {#if form?.success}
            <p class="text-green-500">Profile updated!</p>
          {/if}
        </form>
      </div>
    </div>

    <!-- Ventures Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">My Ventures</h3>
      {#if data.ventures?.length > 0}
        <ul class="space-y-2">
          {#each data.ventures as venture}
            <li class="p-4 border rounded hover:bg-gray-50">
              <h4 class="font-medium">{venture.name}</h4>
              <p class="text-sm text-gray-600">{venture.description}</p>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500">You don’t have any ventures yet.</p>
      {/if}
    </div>
  </div>
{:else}
  <p>No profile found. Please sign in or create one.</p>
{/if}
