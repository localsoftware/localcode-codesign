<script setup></script>

<template>
  <div class="grid grid-cols-1 place-items-center py-10">
    <div class="h-24 border border-l-black mb-16"></div>

    <h2 class="uppercase">
      Great to know we are neighbors!<br />Want to find out how we work?
    </h2>

    <img class="px-10 my-12" src="/imgs/section-02.png" alt="" />

    <OptionButton
      :question="'Btw, what is your best skill?'"
      :options="['Planning', 'A green thumb', 'Team work', 'Communication']"
    />

    <div class="h-24 border border-l-black border-dotted my-6"></div>

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

    <div class="h-24 border border-l-black border-dotted mt-8"></div>
  </div>
</template>

<style scoped></style>
