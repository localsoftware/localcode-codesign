<script setup>
const props = defineProps({
  graph: { type: Object, default: () => {} },
})
</script>

<template>
  <div :class="`px-3 py-3`">
    <div class="border-b-2 border-black py-1">
      <p class="text-xs font-LIGHT">{{ graph.type }}</p>
    </div>
    <div class="border-b-2 border-black py-1">
      <p class="text-xl font-medium py-1">
        {{ `$${graph.cost} ` }}
      </p>
    </div>

    <StackedChart
      :distribution="graph.distribution"
      :height="graph.height"
      class="py-1"
    />
  </div>
</template>

<style scoped></style>
