<script setup>
const props = defineProps({
  location: { type: String, default: () => '' },
})
</script>

<template>
  <div class="absolute bg-white px-3 py-3 w-1/6 h-full shadow-lg">
    <p class="text-lg border-b-2 border-black pb-4">Design the site</p>

    <div class="border-b-2 border-black py-4">
      <p class="text-xl font-bold">
        {{ location }}
      </p>
      <p class="text-xs font-extralight pt-2">
        Use the slides to modify and design the site.
      </p>
    </div>
    <DesignCollapse />
    <SectionButton class="" :title="'Design the site'" :color="'bg-black'" />
  </div>
</template>

<style scoped></style>
