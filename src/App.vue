<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">
nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
