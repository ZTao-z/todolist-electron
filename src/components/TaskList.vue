<template>
  <v-sheet width="290px">
    <v-list
      subheader
      two-line
      dense
    >
      <v-subheader>今日待办</v-subheader>
      <v-list-item class="px-2 py-0" v-for="event in events" :key="event.id">
        <v-list-item-content>
          <v-list-item-title v-text="event.title"></v-list-item-title>
          <v-list-item-subtitle v-text="`${event.start} - ${event.end}`"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import pbRequest from '@/plugins/request';
import dayjs from 'dayjs';
export default {
  name: 'TaskListComponent',

  props: {
    current: String
  },

  data() {
    return {
      date: this.current,
      events: []
    }
  },

  mounted() {
    this.getEvents(this.date);
  },
  
  methods: {
    getEvents(date) {
      const day = dayjs(date);
      const startDay = day.startOf('day');
      const endDay = day.endOf('day');
      const userId = +sessionStorage.getItem('userId');
      pbRequest('/getTask', 'Task', 'GetTasks', {
        userId,
        startTime: startDay.valueOf(),
        endTime: endDay.valueOf(),
        category: 'default',
        state: 0
      }).then(res => {
        this.events = (res.tasks || []).map(el => ({
          start: dayjs(el.startTime).format('YYYY-MM-DD'),
          end: dayjs(el.endTime).format('YYYY-MM-DD'),
          title: el.title,
          id: el.id
        }))
      }).catch(err => {
        console.error(err);
      })
    }
  },

  watch: {
    current(val) {
      this.date = val;
    },
    date(val) {
      this.getEvents(val);
    }
  }
}
</script>