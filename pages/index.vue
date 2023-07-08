<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const elementVisibility = ref({})

const landing = ref(null)
elementVisibility.value.landing = useElementVisibility(landing)

const howWeWork = ref(null)
elementVisibility.value.howWeWork = useElementVisibility(howWeWork)

const whatWeDo = ref(null)
elementVisibility.value.whatWeDo = useElementVisibility(whatWeDo)

const getToKnowUs = ref(null)
elementVisibility.value.getToKnowUs = useElementVisibility(getToKnowUs)

const letsMeet = ref(null)
elementVisibility.value.letsMeet = useElementVisibility(letsMeet)

const currentSectionButton = computed(() => {
  if (elementVisibility.value.landing)
    return { title: `Let's get started 🚀`, color: 'bg-blue-400' }
  else if (elementVisibility.value.howWeWork)
    return { title: 'How we Work 🏋️', color: 'bg-yellow-400' }
  else if (elementVisibility.value.whatWeDo)
    return { title: 'What we do', color: 'bg-green-400' }
  else if (elementVisibility.value.getToKnowUs)
    return { title: 'Get to know us', color: 'bg-red-400' }
  else if (elementVisibility.value.letsMeet)
    return { title: `Let's meet 🌳`, color: 'bg-black' }
  else return { title: `Let's get started 🚀`, color: 'bg-blue-400' }
})
</script>

<template>
  <main class="container mx-auto font-sans font-normal">
    <header></header>
    <section class="text-xl">
      <div ref="landing"><LandingPage /></div>
    </section>
    <WhoAreYou />
    <YourAge />
    <WhereDoYouLive />
    <div ref="howWeWork"><HowWeWork /></div>
    <OurEcoHub />
    <div ref="whatWeDo"><WhatWeDo /></div>
    <div ref="getToKnowUs"><GetToKnowUs /></div>
    <OurCurrentEvents />
    <MemberProfile />
    <div ref="letsMeet"><LetsMeet /></div>

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
