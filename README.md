# vue-flip-countdown

It's using:

* `vite`
* `vue`

fork [vue2-flip-countdown](https://github.com/philipjkim/vue2-flip-countdown), copy that!

[show Demo](https://tomieric.github.io/vue-flip-countdown/)

## Installation

```shell
yarn add @tomieric/vue-flip-countdown
```

## Usage

```javascript
<template>
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
import flipCountdown from '@tomieric/vue-flip-countdown'

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
```

## OPTIONS

| Attribute | Description | Type | Accepted Values | Default |
| - | - | - | - | - |
| deadline | the end time | `String` | the date string | `-` |
| stop | stop flip animation | `Boolean` | `true/false` | `false` |
| showDays | display days card | `Boolean` | `true/false` | `true` |
| showHours | display hours card | `Boolean` | `true/false` | `true` |
| showMinutes | display minutes card | `Boolean` | `true/false` | `true` |
| showSeconds | display seconds card | `Boolean` | `true/false`| `true` |
| labels | the alias name of labels | `Object` | `{days: '天' }` | `-` |
| showSlot | This display card text | `Boolean` | `true/false` | `true` |

## development

```
yarn dev
```

## production

```
yarn lib
```
