<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useCostStore } from '~/store/cost'

const costStore = useCostStore()
const { changeCurrentCostGraph } = costStore
const { changeCurrentFundsGraph } = costStore

changeCurrentCostGraph({
  cost: '690,073.00',
  distribution: {
    Greenscaping: { height: 0.5, color: '#06f' },
    Equipment: { height: 0.25, color: '#f63' },
    Trees: { height: 0.125, color: '#0f0' },
    Water: { height: 0.125, color: '#f0f' },
  },
  height: 250,
  type: 'TOTAL COST',
})

changeCurrentFundsGraph({
  cost: '600,000.00',
  distribution: {
    Greenscaping: { height: 0.5, color: '#06f' },
    Equipment: { height: 0.25, color: '#f63' },
    Trees: { height: 0.125, color: '#0f0' },
    Water: { height: 0.125, color: '#f0f' },
  },
  height: 250,
  type: 'FUNDING AVAILABLE',
})

const landscape = ref(50)
const stuff = ref(50)
</script>

<template>
  <main class="font-sans font-normal">
    <header><LocalCodeHeader /></header>
    <section class="design-widgets">
      <DesignSite
        :location="`Owen's Street - Mission Bay`"
        class="overflow-y-scroll"
      />
    </section>

    <section>
      <div class="sliders absolute bg-white rounded-lg">
        <div class="px-10 py-6">
          <p>Design the site</p>
          <div class="stuff">
            <el-slider v-model="stuff" :show-tooltip="false" :size="'large'" />
            <span class="top-0 right-0">LESS STUFF</span>
            <span class="top-0 right-0">MORE STUFF</span>
          </div>

          <div class="landscape">
            <el-slider
              v-model="landscape"
              :show-tooltip="false"
              :size="'large'"
            />
            <span class="top-0 right-0">LESS INTERVENTION</span>
            <span class="top-0 right-0">MORE INTERVENTION</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <ThreeJS />
    </section>

    <!-- <footer
      class="py-14 flex flex-col sm:flex-row justify-between items-start gap-2 leading-tight"
    ></footer> -->
  </main>
</template>

<style>
body {
  background-color: #fffdf8;
}

.sliders {
  right: 0px;
  bottom: 0px;
  width: calc(83.33% - 80px);
  margin: 0px 40px 24px 40px;
}
</style>
