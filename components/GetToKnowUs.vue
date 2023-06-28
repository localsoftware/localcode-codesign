<script setup></script>

<template>
  <SeparatorLine />

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
</template>

<style scoped></style>
