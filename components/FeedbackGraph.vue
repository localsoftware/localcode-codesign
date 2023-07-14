<script setup>
const props = defineProps({
  graph: { type: Object, default: () => {} },
})
</script>

<template>
  <div :class="`rounded-xl bg-white px-3 py-3 shadow-lg`">
    <StackedChart :distribution="graph.distribution" :height="graph.height" />

    <div class="border-b-2 border-black py-4">
      <p class="text-xs font-LIGHT">{{ graph.type }}</p>
    </div>

    <div class="border-b-2 border-black py-4">
      <p class="text-xl font-medium">
        {{ `$${graph.cost} ` }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
