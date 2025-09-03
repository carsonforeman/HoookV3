<script lang="ts">
  import New_Venture_Header from '$lib/components/New_Venture_Header.svelte';
  export let data;
</script>

<!-- Header stays across all tabs -->
<New_Venture_Header {data.user} {data.profile} />

<slot />
