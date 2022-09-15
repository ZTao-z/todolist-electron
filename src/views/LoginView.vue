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
          <v-btn depressed tile outlined block @click="logout"> 退出 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import AxiosInstance from '@/plugins/axios';
import { load } from 'protobufjs';
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
      load('userProto.proto', (err, root) => {
        if(err) {
          console.error(err);
          return;
        }
        const UserInfoRequest = root.lookupType('user.LoginRequest');
        const UserInfoResponse = root.lookupType('user.LoginResponse');

        const payload = {
          info: this.user,
          password: this.password,
          type: 1,
        }

        const errMsg = UserInfoRequest.verify(payload);
        if (errMsg) {
          console.error(errMsg);
          return;
        }

        // Create a new message
        var message = UserInfoRequest.create(payload); // or use .fromObject if conversion is necessary

        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = UserInfoRequest.encode(message).finish();

        var message1 = UserInfoRequest.decode(buffer);
        var object = UserInfoRequest.toObject(message1, {
            longs: String,
            enums: String,
            bytes: String,
            // see ConversionOptions
        });
        console.log(object)

        AxiosInstance({
          url: '/login',
          method: 'post',
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': "application/x-protobuf"
          },
          data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
        }).then(res => {
          const message = UserInfoResponse.decode(new Uint8Array(res));
          const response = UserInfoResponse.toObject(message, {
              longs: String,
              enums: String,
              bytes: String,
              // see ConversionOptions
          });
          if (!response.code) {
            sessionStorage.setItem('userId', object.id);
            this.$router.push('/');
          } else {
            console.error(response.code);
          }
        })
      })
    },
    logout() {
      sessionStorage.setItem('userId', '');
      this.$router.push('/login');
    }
  }
};
</script>
