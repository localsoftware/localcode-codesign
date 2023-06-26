<script setup></script>

<template>
  <div class="grid grid-cols-1 place-items-center pb-10">
    <div class="h-24 border border-l-black border-dotted mb-10"></div>

    <OptionButton
      :question="'What are you looking for?'"
      :options="[
        'To learn',
        'A job',
        'A Workout',
        'Connections',
        'Healthy food',
        'Sustainability',
      ]"
    />
  </div>
</template>

<style scoped></style>
