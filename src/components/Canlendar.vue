<template>
  <v-sheet height="100%" width="100%">
    <v-calendar
      ref="calendar"
      v-model="date"
      :weekdays="weekdays"
      :type="type"
      :events="events"
      :event-overlap-mode="mode"
      :event-overlap-threshold="30"
      :event-color="getEventColor"
      @change="getEvents"
      @click:date="viewDay"
    ></v-calendar>
  </v-sheet>
</template>

<style scoped>

</style>

<script>
import dayjs from 'dayjs';
import pbRequest from '@/plugins/request';

export default {
  name: 'CanlendarComponent',
  data() {
    return {
      type: 'month',
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      date: this.current,
      events: [],
      mode: 'stack'
    }
  },

  mounted() {
    this.getEvents();
  },

  props: {
    current: String
  },

  model: {
    props: 'current',
    event: 'current'
  },

  methods: {
    getEventColor (event) {
      return event.color
    },

    getEvents() {
      const day = dayjs(this.date);
      const userId = +sessionStorage.getItem('userId');
      let startDay = null;
      let endDay = null
      if (this.type === 'day') {
        startDay = day.startOf('day');
        endDay = day.endOf('day');
      } else if (this.type === 'week') {
        startDay = day.startOf('week');
        endDay = day.endOf('week');
      } else if (this.type === 'month') {
        startDay = day.startOf('month');
        endDay = day.endOf('month');
      }

      pbRequest('/getTask', 'Task', 'GetTasks', {
        userId,
        startTime: startDay.valueOf(),
        endTime: endDay.valueOf(),
        category: 'default',
        state: 0
      }).then(res => {
        console.log(res);
        this.events = res.tasks || []
      }).catch(err => {
        console.error(err);
      })

      this.$emit('current', this.date)
    },

    viewDay({ date }) {
      this.date = date;
      this.type = 'day';
      this.mode = 'column';
    },

  }
}
</script>