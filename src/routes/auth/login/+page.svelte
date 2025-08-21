<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import { user, profile } from "$lib/stores/user"; // both stores

  // If already logged in, redirect
  $: if ($user) {
    goto("/");
  }

  let email = "";
  let password = "";
  let error = "";
  let loading = false;

  async function handleLogin(e: Event) {
    e.preventDefault();
    error = "";
    loading = true;

    try {
      // 1. Sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      const currentUser = data.user;
      if (!currentUser) throw new Error("No user returned.");

      // ✅ Update user store
      user.set(currentUser);

      // 2. Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (profileError) throw profileError;

      // ✅ Update profile store
      profile.set(profileData);

      // 3. Redirect
      goto("/");
    } catch (e: any) {
      error = e.message ?? "Login failed. Please try again.";
    } finally {
      loading = false;
    }
  }
</script>

<div
  class="bg-cover bg-center min-h-screen flex items-center justify-center"
  style="background-image: url('/images/auth_background.jpg');"
>
  <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
    <!-- Logo -->
    <img
      src="/images/hoooklogo.png"
      alt="Hoook Logo"
      class="mx-auto h-12 mb-4"
    />

    <!-- Title -->
    <h1 class="text-2xl font-bold text-center mb-2">Sign In</h1>
    <p class="text-gray-600 text-center mb-6">
      Use your Hoook email address.
    </p>

    {#if error}
      <p class="text-red-500 text-sm mb-4 text-center">{error}</p>
    {/if}

    <!-- Form -->
    <form on:submit={handleLogin} class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          bind:value={email}
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          bind:value={password}
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>

    <!-- Switch to Signup -->
    <p class="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?  
      <a href="/auth/signup" class="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
</div>
