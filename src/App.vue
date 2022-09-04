<template>
  <v-app id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">About</router-link>
    </nav>
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
</style>
