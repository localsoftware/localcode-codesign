<script setup></script>

<template>
  <div class="grid grid-cols-1 place-items-center px-1 pt-10">
    <div class="py-3 text-center">
      <p>Nice to meet you 👋</p>
    </div>
    <div>
      <p class="py-2 text-center uppercase">WE ARE</p>
      <p class="uppercase border-2 border-black rounded-full px-3">
        Green City Force
      </p>
    </div>
    <img class="-mt-12 -mb-44" src="/imgs/COVER SKETCH.png" alt="" />
  </div>
  <SeparatorLine />
  <SectionButton :title="'Let*s get started 🚀'" :section-id="1" />
</template>

<style scoped></style>
