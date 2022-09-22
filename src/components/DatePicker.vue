<template>
  <v-sheet width="290">
    <v-date-picker v-model="picker" :events="events" full-width no-title flat @change="onChange"></v-date-picker>
  </v-sheet>
</template>

<script>
import pbRequest from '@/plugins/request';
import dayjs from 'dayjs';
export default {
  name: 'DatePickerComponent',
  props: {
    current: String
  },

  model: {
    props: 'current',
    event: 'current'
  },

  data() {
    return {
      picker: this.current,
      events: []
    }
  },

  mounted() {
    this.getEvents(this.picker);
  },

  methods: {
    onChange(data) {
      this.picker = data;
      this.getEvents(data);
      this.$emit('current', data)
    },

    getEvents(date) {
      const day = dayjs(date);
      const startDay = day.startOf('month');
      const endDay = day.endOf('month');
      const userId = +sessionStorage.getItem('userId');

      pbRequest('/getTask', 'Task', 'GetTasks', {
        userId,
        startTime: startDay.unix(),
        endTime: endDay.unix()
      }).then(res => {
        console.log(res);
        this.events = res.tasks || []
      }).catch(err => {
        console.error(err);
      })
    }
  },
}
</script>