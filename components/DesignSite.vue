<script setup>
const props = defineProps({
  location: { type: String, default: () => '' },
})
</script>

<template>
  <div
    class="absolute bg-white/90 px-3 py-3 w-1/6 overflow-y-auto h-[calc(100vh-5rem)]"
  >
    <SectionButton class="" :title="'Design the site'" :color="'bg-black'" />

    <div class="border-b-2 border-black py-4">
      <p class="text-xl font-bold">
        {{ location }}
      </p>

      <p class="text-xs font-extralight pt-2">
        Use the slides to modify and design the site.
      </p>
    </div>

    <DesignCollapse />
  </div>
</template>
<SectionButton class="" :title="'Design the site'" :color="'bg-black'" />

<style scoped></style>
