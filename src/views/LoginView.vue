<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="用户名/邮箱"
            hide-details="auto"
            type="text"
            v-model="user"
            required
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="密码"
            hide-details="auto"
            type="password"
            v-model="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="login" color="primary"> 登录 </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="logout"> 退出 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: '',
      valid: false
    };
  },

  methods: {
    login() {
      sessionStorage.setItem('user', this.user);
      this.$router.push('/');
    },
    logout() {
      sessionStorage.setItem('user', '');
      this.$router.push('/login');
    }
  }
};
</script>
