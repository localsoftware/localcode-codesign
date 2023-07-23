<script setup>
import { computed } from 'vue'

const props = defineProps({
  cost: { type: String, default: () => '' },
  distribution: { type: Object, default: () => {} },
  height: { type: Number, default: () => 250 },
})

const svgHeight = computed(() => {
  const svgs = {}
  let currentHeight = 0
  for (const [key, value] of Object.entries(props.distribution)) {
    svgs[key] = {
      height: value.height * props.height,
      y: currentHeight,
      color: value.color,
    }
    currentHeight += value.height * props.height
  }

  return svgs
})

// const
</script>

<template>
  <svg :class="`w-full h-[${height}px]`">
    <rect
      v-for="(value, key) in svgHeight"
      :key="key"
      :class="`w-full h-[${value.height}px]`"
      :y="value.y"
      :style="`fill: ${value.color}`"
    />
    <text
      v-for="(value, key) in svgHeight"
      :key="key"
      :y="value.y + 15"
      x="10"
      class="label"
    >
      {{ key }}
    </text>
  </svg>
</template>

<style scoped>
.label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  fill: #fff;
  text-anchor: left;
}
</style>
