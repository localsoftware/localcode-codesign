<script setup>
import { ref } from 'vue'
import { useCostStore } from '~/store/cost'
import { storeToRefs } from 'pinia'

const costStore = useCostStore()
const { currentCostGraph } = storeToRefs(costStore)
const { currentFundsGraph } = storeToRefs(costStore)

const activeNames = ref([])
const handleChange = (val) => {
  console.log(val)
}
</script>

<template>
  <div class="design-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="How to fund the project" name="1">
        <FeedbackGraph :graph="currentFundsGraph" />
      </el-collapse-item>
      <el-collapse-item title="How much the project will cost" name="2">
        <FeedbackGraph :graph="currentCostGraph" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
