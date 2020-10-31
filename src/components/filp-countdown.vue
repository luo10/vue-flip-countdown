<template>
  <div class="vue-flip-countdown" v-show="show">
    <span
      v-for="item in data"
      :key="item.label"
      :id="item.elementId"
      class="vue-flip-countdown-item"
      v-show="item.show"
    >
      <span class="vue-flip-countdown-card">
        <b class="vue-flip-countdown-card-top">
          {{ item.current }}
        </b>
        <b
          :data-value="data.current"
          class="vue-flip-countdown-card-bottom"
        ></b>
        <b 
          class="vue-flip-countdown-card-back"
          :data-value="item.previous"
        ></b>
        <b
          class="vue-flip-countdown-card-back-bottom"
          :data-value="item.previous"
        ></b>
      </span>
      <span class="vue-flip-countdown-slot">{{ item.label }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, ref, reactive, computed, onUnmounted, watch } from 'vue'

const padZero = (n: string): string => Number(n) > 9 ? n : `0${n}`

export default defineComponent({
  name: 'flipCountdown',

  props: {
    deadline: {
      type: String,
      required: true
    },
    stop: Boolean,
    showDays: {
      type: Boolean,
      default: true
    },
    showHours: {
      type: Boolean,
      default: true
    },
    showMinutes: {
      type: Boolean,
      default: true
    },
    showSeconds: {
      type: Boolean,
      default: true
    },
    labels: {
      type: Object,
      default: () => ({
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds'
      })
    }
  },

  setup: (props, { emit }) => {
    let frame: any
    const uid = uuidv4()
    const show = ref(false)
    const date = ref(0)
    const interval = ref(0)
    const diff = ref(0)
    const now = ref(Math.trunc(Date.now() / 1000))

    const data = reactive([
      {
        current: '0',
        previous: '0',
        label: props.labels.days,
        show: props.showDays,
        elementId: 'flip-card-days-' + uid
      },
      {
        current: '0',
        previous: '0',
        label: props.labels.hours,
        show: props.showHours,
        elementId: 'flip-card-hours-' + uid
      },
      {
        current: '0',
        previous: '0',
        label: props.labels.minutes,
        show: props.showMinutes,
        elementId: 'flip-card-minutes-' + uid
      },
      {
        current: '0',
        previous: '0',
        label: props.labels.seconds,
        show: props.showSeconds,
        elementId: 'flip-card-seconds-' + uid
      }
    ])

    const senconds = computed(() => Math.trunc(diff.value) % 60)
    const minutes = computed(() => Math.trunc(diff.value / 60) % 60)
    const hours = computed(() => Math.trunc(diff.value / 60 / 60) % 24)
    const days = computed(() => Math.trunc(diff.value / 60 / 60 / 24))

    watch(() => props.deadline, (val) => {
      date.value = Math.trunc(
        Date.parse(val.replace(/-/g, '/')) / 1000
      )
    })

    watch(now, (val) => {
      diff.value = date.value - val
      if (diff.value <= 0 || props.stop) {
        diff.value = 0
        updateTime(3, 0)
      } else {
        updateAllCards()
      }
    })

    watch(diff, (val) => {
      if (val === 0) {
        emit('timeElapsed')
        updateAllCards()
      } else {
        show.value = true
      }
    })

    const endTime = props.deadline
    date.value = Math.trunc(
      Date.parse(endTime.replace(/-/g, '/')) / 1000
    )

    const intervalTimer = setInterval(() => {
      now.value = Math.trunc(Date.now() / 1000)
    }, 1e3)

    if (diff.value !== 0) {
      show.value = true
    }

    function updateTime (index?: number, newValue?: any) {
      if (index && index >= data.length || newValue === undefined) {
        return
      }

      if (window['requestAnimationFrame']) {
        frame = requestAnimationFrame(updateTime)
      }

      const item = data[index as number]
      const val =  newValue < 0 ? 0 : newValue
      const el: HTMLDivElement | null = document.querySelector(`#${item.elementId}`)

      if (!el) return

      if (val !== item.current) {
        item.previous = padZero(item.current)
        item.current = padZero(val)

        if (el) {
          el.classList.remove('flip')
          el.offsetWidth;
          el.classList.add('flip')
        }

        if (index === 0) {
          const els: any = el.querySelectorAll('span b')
          for (let el of els) {
            const cls = el.classList[0]
            if (newValue / 1000 >= 1) {
              if (!cls.includes('-4digits')) {
                const newCls = cls + '-4digits'
                el.classList.add(newCls)
                el.classList.remove(cls)
              } else {
                const newCls = cls.replace('-4digits', '')
                el.classList.add(newCls)
                el.classList.remove(cls)
              }
            }
          }
        }
      }
    }

    function updateAllCards () {
      updateTime(0, days.value)
      updateTime(1, hours.value)
      updateTime(2, minutes.value)
      updateTime(3, senconds.value)
    }

    onUnmounted(() => {
      if (window['cancelAnimationFrame']) cancelAnimationFrame(frame)
      clearInterval(intervalTimer)
    })

    return {
      data,
      show,
      date,
      interval,
      diff
    }
  }
})
</script>

<style lang="less">
  @import "./style.less";
</style>