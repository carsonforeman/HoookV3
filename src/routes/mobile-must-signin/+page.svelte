<script>
  import { goto } from "$app/navigation";
</script>

<div class="min-h-screen flex flex-col items-center bg-gray-50 pt-20 p-6 text-center">
  <h1 class="text-2xl font-bold mb-4">Sign in required</h1>
  <p class="text-gray-600 mb-6">
    You must create an account or sign in to create a new venture profile on Hoook.
  </p>

  <div class="flex gap-4">
    <button
      on:click={() => goto("/auth/login")}
      class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
      Sign in
    </button>

    <button
      on:click={() => goto("/auth/signup")}
      class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
      Create account
    </button>
  </div>
</div>
