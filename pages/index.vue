<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
</script>

<template>
  <main class="font-sans font-normal">
    <header><LocalCodeHeader /></header>
    <section class="relative">
      <DesignSite :location="`Owen's Street - Mission Bay`" />
    </section>

    <section>
      <img src="/imgs/placeholder.png" alt="Section 1" class="w-full h-auto" />
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
