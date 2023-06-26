<script setup></script>

<template>
  <OptionButton
    :question="'Do you want to know more about...'"
    :options="[
      'Urban Agriculture',
      'Energy Efficiency',
      'Land Improvement',
      'Carpentry',
      'Recycling & Composting',
      'Community Engagement',
    ]"
  />

  <div class="h-24 border border-l-black mt-10"></div>

  <img class="pl-12 -mt-12" src="/imgs/section-05.png" />

  <div class="h-24 border border-l-black border-dotted my-6"></div>

  <div class="rounded-3xl bg-blue-300 px-10 py-8">
    <h1 class="uppercase text-center mb-4">💡 Did you know?</h1>
    <p class="text-sm mb-2">GCF Corps Alumns have connections to:</p>
    <ul class="text-sm list-disc">
      <li>Empower New York</li>
      <li>Accord Power</li>
      <li>Willdan</li>
      <li>Franklin Energy</li>
    </ul>
  </div>
</template>

<style scoped></style>
