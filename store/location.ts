import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref(0)

  function changeCurrentLocation(location: number) {
    currentLocation.value = location
  }
  return { changeCurrentLocation, currentLocation }
})
