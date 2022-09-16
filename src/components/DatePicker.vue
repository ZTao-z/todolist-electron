<template>
  <v-sheet width="290">
    <v-date-picker v-model="picker" :events="events" full-width no-title flat></v-date-picker>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'DatePickerComponent',
  data() {
    return {
      picker: dayjs().format('YYYY-MM-DD'),
      events: []
    }
  },
  mounted() {
    this.events = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  }
}
</script>