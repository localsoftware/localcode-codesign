<script setup>
import { useLocationStore } from '~/store/location'
const locationStore = useLocationStore()
const { changeCurrentLocation } = locationStore

changeCurrentLocation('howWeWork')
</script>

<template>
  <SeparatorLine />

  <div class="grid grid-cols-1 place-items-center">
    <h2 class="uppercase">
      Great to know we are neighbors!<br />Want to find out how we work?
    </h2>

    <img class="px-10 my-12" src="/imgs/section-02.png" alt="" />
  </div>

  <OptionButton
    :question="'Btw, what is your best skill?'"
    :options="['Planning', 'A Green Thumb', 'Team Work', 'Communication']"
    :type="'skill'"
  />

  <SeparatorLine />

  <div class="grid grid-cols-1 place-items-center px-5">
    <div class="rounded-3xl bg-yellow-300 px-10 py-8">
      <h1 class="uppercase text-center mb-4">💡 Did you know?</h1>
      <p class="text-sm mb-2">GCF Corps Members receive:</p>
      <ul class="text-sm list-disc">
        <li>
          Training, skills and certifications for careers in the green economy
        </li>
        <li>Monthly stipend</li>
        <li>Unlimited monthly Metrocard</li>
        <li>
          AmeriCorps Segal Education Award for continuing your education and
          training
        </li>
        <li>Wraparound supportive services</li>
        <li>Career services post-graduation</li>
      </ul>
    </div>
  </div>
  <SeparatorLine />
</template>

<style scoped></style>
