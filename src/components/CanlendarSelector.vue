<template>
  <v-sheet width="100%" height="44px">
    <v-dialog
      v-model="newTaskDialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile outlined small color="primary" v-bind="attrs" v-on="on">
          <v-icon small> mdi-plus </v-icon>
          新建日程
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          新建日程
        </v-card-title>

        <v-card-text>
          <TaskEditComponent />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn fab text small color="grey darken-2" @click="prev">
      <v-icon small> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="next">
      <v-icon small> mdi-circle-outline </v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="next">
      <v-icon small> mdi-chevron-right </v-icon>
    </v-btn>

    <v-btn-toggle v-model="type" dense mandatory>
      <v-btn outlined> 月 </v-btn>
      <v-btn outlined> 周 </v-btn>
    </v-btn-toggle>
  </v-sheet>
</template>

<script>
import TaskEditComponent from '@/components/TaskEdit.vue';
export default {
  name: "CanlendarSelectorComponent",
  components: {
    TaskEditComponent
  },
  data() {
    return {
      type: 0,
      newTaskDialog: false
    };
  },
  mounted() {
    this.$on('add-task-succ', () => {
      this.newTaskDialog = false;
    });
    this.$on('add-task-fail', (err) => {
      console.error(err);
    });
    this.$on('add-task-cancel', () => {
      this.newTaskDialog = false;
    })
  },
  methods: {
    prev() {},
    next() {},
    newTask() {

    }
  }
};
</script>