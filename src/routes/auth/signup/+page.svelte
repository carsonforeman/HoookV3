<!-- /src/routes/auth/signup/+page.svelte -->
<script lang="ts">
  export let form:
    | { error?: string; message?: string }
    | undefined;

  // LOCAL UI STATE
  let step = 1;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let first_name = '';
  let last_name = '';
  let state = '';

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
    if (step === 1 && !email) {
      error = 'Email is required.';
      return;
    }
    if (step === 2) {
      pwdTried = true;
      if (!passwordIsValid(password)) {
        error = 'Please meet the password requirements.';
        return;
      }
      if (password !== confirmPassword) {
        error = 'Passwords do not match.';
        return;
      }
    }
    if (step === 3 && (!first_name || !last_name)) {
      error = 'First and last name are required.';
      return;
    }
    if (step === 4 && !state) {
      error = 'Please select your state.';
      return;
    }
    step = Math.min(step + 1, 4);
  }

  function prevStep() {
    error = '';
    step = Math.max(step - 1, 1);
  }

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
    <p class="text-gray-600 text-center mb-6">Fresh. Simple. No Big Tech logins.</p>

    {#if error || form?.error}
      <p class="text-red-600 text-sm mb-4" role="alert">
        {error || form?.error}
      </p>
    {/if}

    <form
      method="POST"
      on:submit={maybeSubmit}
      class="space-y-4"
    >
      {#if step === 1}
        <!-- STEP 1: EMAIL -->
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            bind:value={email}
            class="w-full border rounded-lg px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>
        <button type="button" on:click={nextStep}
          class="w-full bg-blue-600 text-white py-2 rounded-lg">
          Next
        </button>
      {/if}

      {#if step === 2}
        <!-- STEP 2: PASSWORD -->
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            bind:value={password}
            class="w-full border rounded-lg px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            bind:value={confirmPassword}
            class="w-full border rounded-lg px-3 py-2"
            placeholder="••••••••"
            required
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
            <li class={(password && confirmPassword && password === confirmPassword)
              ? 'text-green-600'
              : 'text-red-600'}>
              • Passwords match
            </li>
          </ul>
        {/if}

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border py-2 rounded-lg">Back</button>
          <button type="button" on:click={() => { pwdTried = true; nextStep(); }}
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg">
            Next
          </button>
        </div>
      {/if}

      {#if step === 3}
        <!-- STEP 3: NAME -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">First name</label>
            <input type="text" bind:value={first_name}
              class="w-full border rounded-lg px-3 py-2"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Last name</label>
            <input type="text" bind:value={last_name}
              class="w-full border rounded-lg px-3 py-2"
              required />
          </div>
        </div>

        <div class="flex gap-3">
          <button type="button" on:click={prevStep} class="flex-1 border py-2 rounded-lg">Back</button>
          <button type="button" on:click={nextStep}
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg">
            Next
          </button>
        </div>
      {/if}

      {#if step === 4}
        <!-- STEP 4: STATE ONLY -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Location (State)
            <span class="text-xs text-gray-500">(helps local collaboration)</span>
          </label>
          <select bind:value={state}
            class="w-full border rounded-lg px-3 py-2 bg-white"
            required>
            <option disabled value="">Select state</option>
            {#each STATES as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </div>

        <!-- hidden fields for form submission -->
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="password" value={password} />
        <input type="hidden" name="first_name" value={first_name} />
        <input type="hidden" name="last_name" value={last_name} />
        <input type="hidden" name="state" value={state} />

        <div class="flex gap-3">
          <button type="button" on:click={prevStep}
            class="flex-1 border py-2 rounded-lg">
            Back
          </button>
          <button type="submit"
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg">
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
