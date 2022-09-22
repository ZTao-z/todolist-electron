<template>
  <v-sheet width="100%" height="100%" class="d-flex justify-start align-stretch">
    <v-sheet width="290" height="100%" class="d-flex justify-start flex-column">
      <DatePickerComponent v-model="currentDate" />
      <TaskListComponent />
    </v-sheet>
    <v-sheet height="100%" style="flex: 1; height: 100vh" class="d-flex flex-column">
      <v-sheet height="44px" class="d-flex justify-start">
        <CanlendarSelectorComponent />
        <UserAvatarComponent />
      </v-sheet>
      <CanlendarComponent v-model="currentDate" />
    </v-sheet>
  </v-sheet>
</template>

<script>
import CanlendarComponent from '@/components/Canlendar.vue';
import DatePickerComponent from '@/components/DatePicker.vue';
import TaskListComponent from '@/components/TaskList.vue';
import CanlendarSelectorComponent from '@/components/CanlendarSelector.vue';
import UserAvatarComponent from '@/components/UserAvatar.vue';
import dayjs from 'dayjs';
export default {
  name: "HomeView",
  components: {
    CanlendarComponent,
    DatePickerComponent,
    TaskListComponent,
    CanlendarSelectorComponent,
    UserAvatarComponent,
  },
  data() {
    return {
      currentDate: dayjs().format('YYYY-MM-DD')
    }
  },
};
</script>
