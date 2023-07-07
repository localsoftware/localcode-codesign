<script setup></script>

<template>
  <SeparatorLine />

  <OptionButton
    :question="'What is your age?'"
    :options="['18 👶', '18–24 🧒', '25-64 🧑', '65+ 👴']"
  />

  <SeparatorLine />

  <div class="grid grid-cols-1 place-items-center px-5">
    <div class="rounded-3xl bg-orange-500 px-10 py-8">
      <h1 class="uppercase text-center mb-4">💡 Did you know?</h1>
      <p class="text-sm mb-2">Our cohorts are made up of:</p>
      <ul class="text-sm list-disc">
        <li>18–24 year olds</li>
        <li>NYC residents</li>
        <li>High school diploma or GED certificate holders</li>
      </ul>
    </div>
  </div>

  <SeparatorLine />
</template>

<style scoped></style>
