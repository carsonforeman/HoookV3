<!-- src/routes/auth/login/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  export let form;

  $: if (form?.success) {
    // Redirect to home after successful login
    goto('/');
  }
</script>

<div
  class="bg-cover bg-center min-h-screen flex items-center justify-center"
  style="background-image: url('/images/auth_background.jpg');"
>
  <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
    <img src="/images/hoooklogo.png" alt="Hoook Logo" class="mx-auto h-12 mb-4" />

    <h1 class="text-2xl font-bold text-center mb-2">Sign In</h1>
    <p class="text-gray-600 text-center mb-6">Use your Hoook email address.</p>

    {#if form?.error}
      <p class="text-red-500 text-sm mb-4 text-center">{form.error}</p>
    {/if}

    <form method="POST" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Sign In
      </button>
    </form>

    <p class="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?  
      <a href="/auth/signup" class="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
</div>
