<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useLocationStore } from '~/store/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { currentLocation } = storeToRefs(locationStore)
</script>

<template>
  <main class="container mx-auto font-sans font-normal">
    <header></header>
    <section class="text-xl">
      <LandingPage />
    </section>
      <WhoAreYou />
      <YourAge />
      <WhereDoYouLive />
      <HowWeWork />
      <OurEcoHub />
      <WhatWeDo />
      <GetToKnowUs />
      <OurCurrentEvents />
      <MemberProfile />
      <LetsMeet />
    <footer
      class="py-14 flex flex-col sm:flex-row justify-between items-start gap-2 leading-tight"
    ></footer>
  </main>
</template>

<style>
body {
  background-color: #fffdf8;
}
</style>
