<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
function changeSection(sectionId) {
  console.log(sectionId, 'Section Num')
}
</script>

<template>
  <main class="container mx-auto font-sans font-normal">
    <header></header>
    <section class="text-xl">
      <LandingPage @scroll-to="changeSection" />
    </section>

    <footer
      class="py-8 flex flex-col sm:flex-row justify-between items-start gap-2 leading-tight"
    ></footer>
  </main>
</template>

<style>
body {
  background-color: #fffdf8;
  font-family: Alpina;
  font-weight: 300;
}
</style>
