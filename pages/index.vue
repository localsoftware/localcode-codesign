<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

const landscape = ref(50)
const stuff = ref(50)
</script>

<template>
  <main class="font-sans font-normal">
    <header><LocalCodeHeader /></header>
    <section class="design-widgets relative">
      <DesignSite :location="`Owen's Street - Mission Bay`" />
    </section>

    <section>
      <FeedbackGraph
        :cost="'690,073.00'"
        :distribution="{
          Greenscaping: { height: 0.5, color: '#06f' },
          Equipment: { height: 0.25, color: '#f63' },
          Trees: { height: 0.125, color: '#0f0' },
          Water: { height: 0.125, color: '#f0f' },
        }"
        :height="250"
        :type="'TOTAL COST'"
        :position="'right-[5%] bottom-16'"
      />
    </section>

    <section>
      <FeedbackGraph
        :cost="'600,000.00'"
        :distribution="{
          Greenscaping: { height: 0.5, color: '#06f' },
          Equipment: { height: 0.25, color: '#f63' },
          Trees: { height: 0.125, color: '#0f0' },
          Water: { height: 0.125, color: '#f0f' },
        }"
        :height="250"
        :type="'FUNDING AVAILABLE'"
        :position="'right-[5%] top-28'"
      />
    </section>

    <div class="landscape">
      <el-slider
        v-model="landscape"
        class="absolute w-20"
        :show-tooltip="false"
        :size="'large'"
      />
    </div>

    <div class="stuff">
      <el-slider
        v-model="stuff"
        vertical
        height="80%"
        :show-tooltip="false"
        :size="'large'"
      />
    </div>

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

.landscape .el-slider {
  width: 90%;
  left: 50%;
  bottom: 12px;
  transform: translate(-50%, 0%);
}

.stuff .el-slider {
  position: absolute;
  right: 20px;
  bottom: 50%;
  transform: translate(0%, 52%);
}
</style>
