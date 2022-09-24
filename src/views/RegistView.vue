<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="用户名" hide-details="auto" type="text" v-model="name" required color="primary">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="邮箱" hide-details="auto" type="text" v-model="email" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="密码" hide-details="auto" type="password" v-model="password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="regist" color="primary"> 注册 </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn depressed tile outlined block @click="back" > 返回 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import pbRequest from '@/plugins/request'
export default {
  name: 'RegistView',
  data() {
    return {
      name: '',
      password: '',
      email: '',
      valid: false
    }
  },
  methods: {
    regist() {
      pbRequest('/addUser', 'User', 'AddUser', {
        user: {
          name: this.name,
          pwd: this.password,
          email: this.email
        }
      }).then(() => {
        this.$router.push('/login');
      }).catch(err => {
        console.error(err);
      })
    },

    back() {
      this.$router.push('/login');
    }
  }
}
</script>