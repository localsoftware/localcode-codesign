<script setup>
const props = defineProps({
  cost: { type: String, default: () => '' },
  distribution: { type: Object, default: () => {} },
  height: { type: Number, default: () => 250 },
  type: { type: String, default: () => 'TOTAL COST' },
  position: { type: String, default: () => 'right-6 bottom-8' },
})
</script>

<template>
  <div
    :class="`absolute rounded-xl bg-white px-3 py-3 w-1/6 ${position} shadow-lg`"
  >
    <StackedChart :distribution="distribution" :height="height" />

    <div class="border-b-2 border-black py-4">
      <p class="text-xs font-LIGHT">{{ type }}</p>
    </div>

    <div class="border-b-2 border-black py-4">
      <p class="text-xl font-medium">
        {{ `$${cost} ` }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
