<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
console.log(34234234)

console.log(34343)
</script>

<template>
  <main class="container mx-auto">
    <header></header>
    <section class="py-8 text-3xl leading-tight">
      <p>GCF Food for Thought</p>
      <LandingPage />
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

.footer-item {
  padding: 0.5em 0;
  font-size: 16px;
  color: #ff0000;
  border-top: 1px solid #ff0000;
}
</style>
