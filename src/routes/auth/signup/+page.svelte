<!-- /src/routes/auth/signup/+page.svelte -->
<script lang="ts">
  export let form:
    | { error?: string; message?: string }
    | undefined;

  // local UI state only
  let step = 1;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let first_name = '';
  let last_name = '';
  let state = '';
  let role = '';
  let avatarFile: File | null = null;

  let error = '';
  let pwdTried = false;

  const STATES = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ];

  function passwordIsValid(pw: string) {
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
    if (step === 3 && (!first_name || !last_name)) {
      error = 'First and last name are required.'; return;
    }
    step = Math.min(step + 1, 4);
  }

  function prevStep() {
    error = '';
    step = Math.max(step - 1, 1);
  }

  // prevent Enter key from submitting before step 4
  function maybeSubmit(e: Event) {
    if (step < 4) e.preventDefault();
  }
</script>

<div
  class="bg-cover bg-center min-h-screen flex items-center justify-center"
  style="background-image: url('/images/auth_background.jpg');"
>
  <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
    <img src="/images/hoooklogo.png" alt="Hoook Logo" class="mx-auto h-10 mb-4" />

    <h1 class="text-2xl font-bold text-center">Create your Hoook account</h1>
    <p class="text-gray-600 text-center mb-6">Create an account on Hoook.</p>

    {#if error || form?.error}
      <p class="text-red-600 text-sm mb-4" role="alert" aria-live="assertive">{error || form?.error}</p>
    {/if}

    <form method="POST" enctype="multipart/form-data" on:submit={maybeSubmit} class="space-y-4">
      {#if step === 1}
        <!-- Step 1: Email -->
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>
        <div class="flex gap-3">
          <button type="button" on:click={nextStep} class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      {/if}

      {#if step === 2}
        <!-- Step 2: Password -->
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            autocomplete="new-password"
            required
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
            required
          />
        </div>

        {#if pwdTried}
          <ul class="text-sm text-gray-700 space-y-1">
            <li class={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>• At least 8 characters</li>
            <li class={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}>• At least one uppercase letter</li>
            <li class={(password.match(/[^A-Za-z0-9]/g)?.length ?? 0) >= 2 ? 'text-green-600' : 'text-red-600'}>• At least 2 special characters</li>
            <li class={(password && confirmPassword && password === confirmPassword) ? 'text-green-600' : 'text-red-600'}>• Passwords match</li>
          </ul>
        {/if}

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">Back</button>
          <button type="button" on:click={() => { pwdTried = true; nextStep(); }} class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      {/if}

      {#if step === 3}
        <!-- Step 3: Names -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label for="first_name" class="block text-sm font-medium mb-1">First name</label>
            <input id="first_name" type="text" bind:value={first_name}
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" autocomplete="given-name" required />
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium mb-1">Last name</label>
            <input id="last_name" type="text" bind:value={last_name}
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" autocomplete="family-name" required />
          </div>
        </div>

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">Back</button>
          <button type="button" on:click={nextStep} class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      {/if}

      {#if step === 4}
        <!-- Step 4: Location + Role + Avatar -->
        <div>
          <label for="state" class="block text-sm font-medium mb-1">
            Location (U.S. state) <span class="text-gray-500 text-xs">(helps collaborators near you find you)</span>
          </label>
          <select id="state" bind:value={state}
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white" required>
            <option value="" disabled>Select your state</option>
            {#each STATES as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </div>

        <div>
          <span class="block text-sm font-medium mb-1">Are you a…</span>
          <div class="flex items-center gap-4">
            <label class="inline-flex items-center gap-2">
              <input type="radio" name="role_visible" value="student" on:change={() => role = 'student'} checked={role === 'student'} />
              <span>Student</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" name="role_visible" value="professional" on:change={() => role = 'professional'} checked={role === 'professional'} />
              <span>Professional</span>
            </label>
          </div>
        </div>

        <div>
          <label for="avatar" class="block text-sm font-medium mb-1">
            Profile picture <span class="text-gray-500 text-xs">(recommended for collaboration)</span>
          </label>
          <input id="avatar" name="avatar" type="file" accept="image/*"
            on:change={(e: Event) => (avatarFile = (e.target as HTMLInputElement).files?.[0] ?? null)}
            class="w-full" />
        </div>

        <!-- Hidden inputs so the server action receives EVERYTHING in one POST -->
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="password" value={password} />
        <input type="hidden" name="first_name" value={first_name} />
        <input type="hidden" name="last_name" value={last_name} />
        <input type="hidden" name="state" value={state} />
        <input type="hidden" name="role" value={role} />

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border px-4 py-2 rounded-lg">Back</button>
          <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create account
          </button>
        </div>
      {/if}
    </form>

    <p class="text-center text-sm text-gray-600 mt-4">
      Already have an account?
      <a href="/auth/login" class="text-blue-600 hover:underline">Sign in</a>
    </p>
  </div>
</div>
