<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex justify-start align-stretch"
  >
    <v-sheet width="290" height="100%" class="d-flex justify-start flex-column">
      <DatePickerComponent
        :current="pickerDate"
        v-on:dateChange="onDateChange"
      />
      <TaskListComponent :current="tasklistDate" />
    </v-sheet>
    <v-sheet
      height="100%"
      style="flex: 1; height: 100vh"
      class="d-flex flex-column"
    >
      <v-sheet height="44px" class="d-flex justify-start">
        <CanlendarSelectorComponent
          :current="selectorDate"
          :canlendarType="canlendarType"
          v-on:dateChange="onDateChange"
          v-on:canlendarTypeChange="onCanlendarTypeChange"
        />
        <UserAvatarComponent />
      </v-sheet>
      <CanlendarComponent
        :current="canlendarDate"
        :canlendarType="canlendarType"
        v-on:dateChange="onDateChange"
        v-on:canlendarTypeChange="onCanlendarTypeChange"
      />
    </v-sheet>
  </v-sheet>
</template>

<script>
import CanlendarComponent from "@/components/Canlendar.vue";
import DatePickerComponent from "@/components/DatePicker.vue";
import TaskListComponent from "@/components/TaskList.vue";
import CanlendarSelectorComponent from "@/components/CanlendarSelector.vue";
import UserAvatarComponent from "@/components/UserAvatar.vue";
import dayjs from "dayjs";
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
      canlendarType: 'month',
      pickerDate: dayjs().format("YYYY-MM-DD"),
      canlendarDate: dayjs().format("YYYY-MM-DD"),
      tasklistDate: dayjs().format("YYYY-MM-DD"),
      selectorDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    onDateChange({ date, from }) {
      switch (from) {
        case "selector":
          this.pickerDate = date;
          this.canlendarDate = date;
          break;
        case "picker":
          this.canlendarDate = date;
          this.selectorDate = date;
          break;
        case "canlendar":
          this.pickerDate = date;
          this.selectorDate = date;
          break;
      }
      this.tasklistDate = date;
    },
    onCanlendarTypeChange(type) {
      console.log(type)
      this.canlendarType = type;
    }
  },
};
</script>
