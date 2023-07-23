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

<style>
/* Edit el-collapse */
.el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0);
  --el-collapse-content-bg-color: rgba(255, 255, 255, 0);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}

.el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
</style>
