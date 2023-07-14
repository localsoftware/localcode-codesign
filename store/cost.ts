import { defineStore } from 'pinia'

export const useCostStore = defineStore('costStore', () => {
  const currentCostGraph = ref({})

  const changeCurrentCostGraph = (costGraph: Object) => {
    currentCostGraph.value = costGraph
  }

  const currentFundsGraph = ref({})

  const changeCurrentFundsGraph = (fundGraph: Object) => {
    currentFundsGraph.value = fundGraph
  }

  return {
    changeCurrentCostGraph,
    currentCostGraph,
    currentFundsGraph, 
    changeCurrentFundsGraph
  }
})
