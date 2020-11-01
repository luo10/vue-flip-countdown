<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h2>DEFAULTS</h2>
  <flipCountdown
    :deadline="deadline"
    @timeElapsed="timeElapsedHandler"
  />

  <h2>Not show days </h2>
  <flipCountdown
    :deadline="deadline"
    :showDays="false"
    @timeElapsed="timeElapsedHandler"
  />

  <h2>Slot content</h2>
  <flipCountdown
    :deadline="deadline"
    :show-days="false"
    :show-slot="false"
    @timeElapsed="timeElapsedHandler"
  >
    <template #Hours>
      <span class="demo-colon">:</span>
    </template>
    <template #Minutes>
      <span class="demo-colon">:</span>
    </template>
  </flipCountdown>

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

<style lang="less" scoped>
.demo-colon {
  display: inline-block;
  margin: 0 5px;
  vertical-align: top;
  height: 70px;
  line-height: 70px;
  font-weight: 700;
  font-size: 32px;
  color: #333;
}
</style>