<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { profile, user } from '$lib/stores/user';

  $: if ($user) {
    goto('/');
  }

  let step = 1;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let firstName = '';
  let lastName = '';
  let state = '';
  let role = '';
  let avatarFile = null;

  let error = '';
  let loading = false;
  let pwdTried = false;

  const STATES = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ];

  const KEY = 'hoook_signup_state_v1';
  onMount(() => {
    if (!browser) return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        step = saved.step ?? step;
        email = saved.email ?? email;
        password = saved.password ?? password;
        confirmPassword = saved.confirmPassword ?? confirmPassword;
        firstName = saved.firstName ?? firstName;
        lastName = saved.lastName ?? lastName;
        state = saved.state ?? state;
        role = saved.role ?? role;
      }
    } catch {}
  });

  $: if (browser) {
    const toSave = { step, email, password, confirmPassword, firstName, lastName, state, role };
    localStorage.setItem(KEY, JSON.stringify(toSave));
  }

  function passwordIsValid(pw) {
    if (!pw || pw.length < 8) return false;
    const hasUpper = /[A-Z]/.test(pw);
    const specials = pw.match(/[^A-Za-z0-9]/g)?.length ?? 0;
    return hasUpper && specials >= 2;
  }

  function nextStep() {
    error = '';
    if (step === 1 && !email) { error = 'Email is required.'; return; }
    if (step === 2) {
      pwdTried = true;
      if (!passwordIsValid(password)) { error = 'Please meet the password requirements.'; return; }
      if (password !== confirmPassword) { error = 'Passwords do not match.'; return; }
    }
    if (step === 3 && (!firstName || !lastName)) {
      error = 'First and last name are required.'; return;
    }
    step = Math.min(step + 1, 4);
  }

  function prevStep() {
    error = '';
    step = Math.max(step - 1, 1);
  }

  async function handleSubmit() {
    error = '';
    loading = true;

    try {
      if (!email) throw new Error('Email is required.');
      if (!passwordIsValid(password)) throw new Error('Password is invalid.');
      if (password !== confirmPassword) throw new Error('Passwords do not match.');
      if (!firstName || !lastName) throw new Error('First and last name are required.');
      if (!state) throw new Error('Please choose your state.');
      if (!role) throw new Error('Please choose Student or Professional.');

      // 1. Upload avatar if provided
      let avatar_url = null;
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop();
        const fileName = `${crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, avatarFile);
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(fileName);
        avatar_url = pub?.publicUrl ?? null;
      }

      // 2. Create auth user (immediately has session since email confirmations are disabled)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;

      const authUser = signUpData?.user;
      if (!authUser) throw new Error('No user returned from signUp.');

      // 3. Update their profile row
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          state,
          role,
          avatar_url
        })
        .eq('id', authUser.id);
      if (profileError) throw profileError;

      // 4. Cleanup + set stores
      if (browser) localStorage.removeItem(KEY);

      user.set(authUser);
      profile.set({ first_name: firstName, last_name: lastName, state, role, avatar_url });

      goto('/');
    } catch (e) {
      error = e.message ?? 'Something went wrong.';
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
      class="mx-auto h-10 mb-4"
    />

    <!-- Title + subheading -->
    <h1 class="text-2xl font-bold text-center">Create your Hoook account</h1>
    <p class="text-gray-600 text-center mb-6">Create an account on Hoook.</p>

    {#if error}
      <p class="text-red-600 text-sm mb-4" role="alert" aria-live="assertive">{error}</p>
    {/if}

    <!-- STEP 1: Email -->
    {#if step === 1}
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            autocomplete="email"
          />
        </div>

        <div class="flex gap-3">
          <!-- No Back on first step -->
          <button
            type="button"
            on:click={nextStep}
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- STEP 2: Password -->
    {#if step === 2}
      <div class="space-y-4">
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            autocomplete="new-password"
          />
        </div>

        <div>
          <label for="confirm" class="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            bind:value={confirmPassword}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            autocomplete="new-password"
          />
        </div>

        {#if pwdTried}
          <ul class="text-sm text-gray-700 space-y-1">
            <li class={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
              • At least 8 characters
            </li>
            <li class={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
              • At least one uppercase letter
            </li>
            <li class={(password.match(/[^A-Za-z0-9]/g)?.length ?? 0) >= 2 ? 'text-green-600' : 'text-red-600'}>
              • At least 2 special characters
            </li>
            <li class={(password && confirmPassword && password === confirmPassword) ? 'text-green-600' : 'text-red-600'}>
              • Passwords match
            </li>
          </ul>
        {/if}

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">
            Back
          </button>
          <button
            type="button"
            on:click={() => { pwdTried = true; nextStep(); }}
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- STEP 3: Names -->
    {#if step === 3}
      <div class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium mb-1">First name</label>
          <input
            id="firstName"
            type="text"
            bind:value={firstName}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            autocomplete="given-name"
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium mb-1">Last name</label>
          <input
            id="lastName"
            type="text"
            bind:value={lastName}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            autocomplete="family-name"
          />
        </div>

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">
            Back
          </button>
          <button type="button" on:click={nextStep} class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- STEP 4: Location + Role + Avatar -->
    {#if step === 4}
      <div class="space-y-4">
        <div>
          <label for="state" class="block text-sm font-medium mb-1">
            Location (U.S. state) <span class="text-gray-500 text-xs">(helps collaborators near you find you)</span>
          </label>
          <select
            id="state"
            bind:value={state}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled selected>Select your state</option>
            {#each STATES as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </div>

        <div>
          <span class="block text-sm font-medium mb-1">Are you a…</span>
          <div class="flex items-center gap-4">
            <label class="inline-flex items-center gap-2">
              <input type="radio" name="role" value="student" bind:group={role} />
              <span>Student</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" name="role" value="professional" bind:group={role} />
              <span>Professional</span>
            </label>
          </div>
        </div>

        <div>
          <label for="avatar" class="block text-sm font-medium mb-1">
            Profile picture <span class="text-gray-500 text-xs">(recommended for collaboration)</span>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            on:change={(e) => (avatarFile = e.target.files?.[0] ?? null)}
            class="w-full"
          />
        </div>

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">
            Back
          </button>
          <button
            type="button"
            on:click={handleSubmit}
            disabled={loading}
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </div>
      </div>
    {/if}

    <!-- Switch to Login -->
    <p class="text-center text-sm text-gray-600 mt-4">
      Already have an account?
      <a href="/auth/login" class="text-blue-600 hover:underline">Sign in</a>
    </p>
  </div>
</div>
