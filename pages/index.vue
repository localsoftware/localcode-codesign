<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useLocationStore } from '~/store/location'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const elementVisibility = ref({})
const landing = ref(null)
const testLanding = ref(useElementVisibility(landing))
elementVisibility.value.landing = useElementVisibility(landing)

const howWeWork = ref(null)
elementVisibility.value.howWeWork = useElementVisibility(howWeWork)

const locationStore = useLocationStore()
const { currentLocation } = storeToRefs(locationStore)
console.log(currentLocation.value, 'testestsetest')

const currentSectionButton = computed(() => {
  switch (elementVisibility.value) {
    case elementVisibility.value.landing:
      return { title: `Let's get started 🚀`, color: 'bg-blue-400' }
    case elementVisibility.value.howWeWork:
      return { title: 'How we Work 🏋️', color: 'bg-yellow-400' }
    case 'what-we-do':
      return { title: 'What we do', color: 'bg-green-400' }
    case 'get-to-know-us':
      return { title: 'Get to know us', color: 'bg-red-400' }
    case 'lets-meet':
      return { title: `Let's meet 🌳`, color: 'bg-black' }
    default:
      return { title: `Let's get started 🚀`, color: 'bg-blue-400' }
  }
})
</script>

<template>
  <main class="container mx-auto font-sans font-normal">
    <header></header>
    <section class="text-xl">
      <LandingPage ref="landing" />
    </section>
    <WhoAreYou />
    <YourAge />
    <WhereDoYouLive />
    <HowWeWork ref="howWeWork" />
    <OurEcoHub />
    <WhatWeDo />
    <GetToKnowUs />
    <OurCurrentEvents />
    <MemberProfile />
    <LetsMeet />

    <SectionButton
      :title="currentSectionButton.title"
      :color="currentSectionButton.color"
    />

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
