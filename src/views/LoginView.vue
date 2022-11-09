<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="用户名/邮箱" hide-details="auto" type="text" v-model="user" required color="primary">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="密码" hide-details="auto" type="password" v-model="password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="login" color="primary"> 登录 </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="regist"> 注册 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import pbRequest from '@/plugins/request';

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
      pbRequest('/login', 'User', 'UserLogin', { 
        user: {
          name: '',
          pwd: this.password,
          email: this.user
        },
        type: 1
      }).then(res => {
        const { user, token } = res;
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('token', token);
        this.$router.push('/');
      }).catch(err => {
        console.error(err);
      })
    },

    regist() {
      sessionStorage.setItem('userId', '');
      this.$router.push('/regist');
    }
  }
};
</script>
