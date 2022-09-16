<template>
  <v-sheet width="290px">
    <v-list
      subheader
      two-line
      dense
    >
      <v-subheader>今日待办</v-subheader>
      <v-list-item class="px-2 py-0">
        <v-list-item-content>
          <v-list-item-title v-text="'事项1'"></v-list-item-title>
          <v-list-item-subtitle v-text="'2022-09-12'"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  name: 'TaskListComponent',
  data() {
    return {}
  }
}
</script>