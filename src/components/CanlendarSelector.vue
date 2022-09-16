<template>
  <v-sheet width="100%" height="44px">
    <v-btn tile outlined small color="primary" @click="prev">
        <v-icon small> mdi-plus </v-icon>
        新建日程
    </v-btn>

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
export default {
  name: "CanlendarSelectorComponent",
  data() {
    return {
      type: 0,
    };
  },
};
</script>