<script lang="ts">
  import { MapPin, Lightbulb, Hammer, Rocket, TrendingUp, Target, Users, DollarSign, GraduationCap } from 'lucide-svelte';

  export let data: { venture: any };
  const venture = data.venture;

  // Current tab state
  let currentTab: 'overview' | 'team' | 'investors' = 'overview';

  function selectTab(tab: 'overview' | 'team' | 'investors') {
    currentTab = tab;
  }

  // Helper functions
  const stageMap = {
    Idea: { icon: Lightbulb, color: 'bg-gray-100 text-gray-700' },
    Starting: { icon: Hammer, color: 'bg-yellow-100 text-yellow-700' },
    Building: { icon: Rocket, color: 'bg-green-100 text-green-700' },
    Growing: { icon: TrendingUp, color: 'bg-blue-100 text-blue-700' }
  };

  const seekingMap = {
    Collaboration: { icon: Users, color: 'bg-yellow-100 text-yellow-700' },
    Mentorship: { icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
    Investment: { icon: DollarSign, color: 'bg-green-100 text-green-700' }
  };

  function titleCase(str: string) {
    return str
      ? str.replace(/\w\S*/g, txt => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
      : '';
  }
</script>

<!-- Tab Menu -->
<div class="max-w-4xl mx-auto mt-4 px-6 flex space-x-4 border-b border-gray-200">
  <button class={`pb-2 ${currentTab === 'overview' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`} on:click={() => selectTab('overview')}>Overview</button>
  <button class={`pb-2 ${currentTab === 'team' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`} on:click={() => selectTab('team')}>Team</button>
  <button class={`pb-2 ${currentTab === 'investors' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`} on:click={() => selectTab('investors')}>Investors</button>
</div>

<!-- Tab Content -->
<div class="max-w-4xl mx-auto py-8 px-6">
  {#if currentTab === 'overview'}
    <!-- Venture Image -->
    <img src={venture.logo_url ?? '/default.png'} alt={venture.name} class="w-full h-64 object-cover rounded-lg mb-6" />

    <!-- Name + Type -->
    <h1 class="text-3xl font-bold mb-2">{venture.name}</h1>
    <p class="text-blue-600 font-medium mb-2">{titleCase(venture.type)}</p>

    <!-- Location -->
    <p class="text-gray-500 text-sm mb-4 flex items-center gap-1">
      <MapPin class="w-4 h-4" />
      {titleCase(venture.location)}
    </p>

    <!-- About -->
    <p class="text-gray-700 mb-6">{venture.about}</p>

    <!-- Stage badge -->
    {#if venture.stage && stageMap[titleCase(venture.stage)]}
      <span class={`inline-flex items-center gap-1 px-3 py-2 text-sm rounded-full font-medium ${stageMap[titleCase(venture.stage)].color}`}>
        <svelte:component this={stageMap[titleCase(venture.stage)].icon} class="w-4 h-4" />
        {titleCase(venture.stage)} Stage
      </span>
    {/if}

    <!-- Seeking badges -->
    <div class="flex flex-wrap gap-2 mt-4">
      {#each venture.seeking ?? [] as s}
        {#if seekingMap[titleCase(s)]}
          <span class={`inline-flex items-center gap-1 px-3 py-2 text-sm rounded-full font-medium ${seekingMap[titleCase(s)].color}`}>
            <svelte:component this={seekingMap[titleCase(s)].icon} class="w-4 h-4" />
            {titleCase(s)}
          </span>
        {/if}
      {/each}
    </div>
  {:else if currentTab === 'team'}
    <p class="text-gray-700">Team content goes here (you can list team members, roles, etc.)</p>
  {:else if currentTab === 'investors'}
    <p class="text-gray-700">Investors content goes here (list investors or interested parties)</p>
  {/if}
</div>
