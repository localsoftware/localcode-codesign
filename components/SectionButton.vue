<script setup>
const props = defineProps({
  title: { type: String, default: () => '' },
})
</script>

<template>
  <div class="w-11/12 fixed left-2/4 -translate-x-2/4 bottom-5">
    <a href="#">
      <div
        class="h-14 w-full grid grid-cols-1 place-items-center bg-sky-400 rounded-full text-white uppercase"
      >
        {{ title }}
      </div>
    </a>
  </div>
</template>

<style scoped></style>
