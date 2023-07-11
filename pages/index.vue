<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
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
        :position="'right-6 bottom-8'"
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
        :position="'right-6 top-28'"
      />
    </section>

    <section>
      <img src="/imgs/placeholder.png" alt="Section 1" class="w-full h-full" />
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
</style>
