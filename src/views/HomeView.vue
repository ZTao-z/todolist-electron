<template>
  <v-sheet width="100%" height="100%" class="d-flex justify-start align-stretch">
    <v-sheet width="290" height="100%" class="d-flex justify-start flex-column">
      <DatePickerComponent />
      <TaskListComponent />
    </v-sheet>
    <v-sheet height="100%" style="flex:1">
      <CanlendarComponent />
    </v-sheet>
  </v-sheet>
</template>

<script>
import CanlendarComponent from '@/components/Canlendar.vue';
import DatePickerComponent from '@/components/DatePicker.vue';
import TaskListComponent from '@/components/TaskList.vue';
export default {
  name: "HomeView",
  components: {
    CanlendarComponent,
    DatePickerComponent,
    TaskListComponent,
  },
  data() {
    return {}
  },
};
</script>
