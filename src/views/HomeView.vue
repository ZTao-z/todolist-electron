<template>
  <v-container>
    <v-row>
      <v-col cols="4" style="width: 290px;">
        <v-row>
          <v-date-picker v-model="picker" no-title></v-date-picker>
        </v-row>
        <v-row>
          <v-list>
            <v-list-item>test1 剩余 2 天</v-list-item>
            <v-list-item>test2 剩余 19 天</v-list-item>
          </v-list>
        </v-row>
      </v-col>
      <v-col>
        <CanlendarComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CanlendarComponent from '@/components/Canlendar.vue';
import dayjs from 'dayjs';
export default {
  name: "HomeView",
  components: {
    CanlendarComponent
  },
  data() {
    return {
      picker: dayjs().format('YYYY-MM-DD')
    };
  },
};
</script>
