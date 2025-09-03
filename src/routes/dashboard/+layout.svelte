<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  export let data;

  const { user, profile } = data; // ✅ changed from session
</script>

<Header {user} {profile} />

<slot />
