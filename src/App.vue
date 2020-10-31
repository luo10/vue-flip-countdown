<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h2>默认</h2>
  <flipCountdown
    :deadline="deadline"
    @timeElapsed="timeElapsedHandler"
  />

  <h2>不显示天数</h2>
  <flipCountdown
    :deadline="deadline"
    :showDays="false"
    @timeElapsed="timeElapsedHandler"
  />

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import flipCountdown from './components/filp-countdown.vue'

export default defineComponent({
  name: 'App',
  components: {
    flipCountdown
  },

  setup () {
    const dateStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
    const targetTime = [dateStr.split(' ')[0], ' ', '23:59:59'].join('')

    const deadline = ref(targetTime)

    function timeElapsedHandler () {
      console.log(`timeElapsedHandler`)
    }

    return {
      deadline,
      timeElapsedHandler
    }
  }
})
</script>
