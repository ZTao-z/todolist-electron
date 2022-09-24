<template>
  <v-sheet width="100%" height="44px">
    <v-dialog v-model="newTaskDialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile outlined small color="primary" v-bind="attrs" v-on="on">
          <v-icon small> mdi-plus </v-icon>
          新建日程
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> 新建日程 </v-card-title>

        <v-card-text>
          <TaskEditComponent
            v-on:success="onAddTaskSuccess"
            v-on:error="onAddTaskError"
            v-on:cancel="onAddTaskCancel"
          />
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

    <v-btn-toggle v-model="type" dense mandatory @change="onCanlendarTypeChange">
      <v-btn outlined value="month"> 月 </v-btn>
      <v-btn outlined value="week"> 周 </v-btn>
      <v-btn outlined value="day"> 日 </v-btn>
    </v-btn-toggle>
  </v-sheet>
</template>

<script>
import TaskEditComponent from "@/components/TaskEdit.vue";
import dayjs from "dayjs";
export default {
  name: "CanlendarSelectorComponent",
  components: {
    TaskEditComponent,
  },

  props: {
    current: String,
    canlendarType: String
  },

  data() {
    return {
      type: this.canlendarType,
      date: this.current,
      newTaskDialog: false,
    };
  },

  created() {
    this.$on("add-task-succ", () => {
      this.newTaskDialog = false;
    });
    this.$on("add-task-fail", (err) => {
      console.error(err);
    });
    this.$on("add-task-cancel", () => {
      this.newTaskDialog = false;
    });
  },

  methods: {
    prev() {
      const prevDate = dayjs(this.date).subtract(1, "day").format("YYYY-MM-DD");
      this.date = prevDate;
      this.$emit("dateChange", {
        date: prevDate,
        from: 'selector'
      });
    },
    next() {
      const nextDate = dayjs(this.date).add(1, "day").format("YYYY-MM-DD");
      this.date = nextDate;
      this.$emit("dateChange",  {
        date: nextDate,
        from: 'selector'
      });
    },
    onAddTaskSuccess() {
      this.newTaskDialog = false;
    },
    onAddTaskError(err) {
      console.error(err);
    },
    onAddTaskCancel() {
      this.newTaskDialog = false;
    },
    onCanlendarTypeChange(d) {
      this.$emit("canlendarTypeChange", d);
    }
  },
  watch: {
    current(val) {
      this.date = val;
    },
    canlendarType(val) {
      this.type = val;
    }
  }
};
</script>