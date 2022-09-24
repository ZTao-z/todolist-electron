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
      this.$emit("dateChange", {
        date: this.picker,
        from: 'picker'
      });
    },

    getEvents(date) {
      const day = dayjs(date);
      const startDay = day.startOf('month');
      const endDay = day.endOf('month');
      const userId = +sessionStorage.getItem('userId');
      pbRequest('/getTask', 'Task', 'GetTasks', {
        userId,
        startTime: startDay.valueOf(),
        endTime: endDay.valueOf(),
        category: 'default',
        state: 0
      }).then(res => {
        this.events = (res.tasks || []).map(el => dayjs(el.startTime).format('YYYY-MM-DD'))
      }).catch(err => {
        console.error(err);
      })
    }
  },

  watch: {
    current(val) {
      this.picker = val;
    },
    picker(val) {
      this.getEvents(val);
    }
  }
}
</script>