<script setup>
const emit = defineEmits(['scrollTo'])

function changeSection(sectionId) {
  emit('scrollTo', sectionId)
}
</script>

<template>
  <div class="grid grid-cols-1 place-items-center px-1 py-10">
    <div class="py-4 text-center">
      <p>Nice to meet you 👋</p>
    </div>
    <div>
      <p class="py-4 text-center uppercase">WE ARE</p>
      <p class="uppercase border-2 border-black rounded-full px-3">
        Green City Force
      </p>
    </div>
    <img src="/imgs/COVER SKETCH.png" />
  </div>

  <SectionButton
    :title="`Let's get started 🚀`"
    :section-id="0"
    @scroll-to="changeSection"
  />
</template>

<style scoped></style>
