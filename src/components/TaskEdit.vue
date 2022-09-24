<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="标题" hide-details="auto" type="text" v-model="title" required color="primary">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="开始时间" hide-details="auto" type="text" v-model="startTime" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="结束时间" hide-details="auto" type="text" v-model="endTime" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="分类" hide-details="auto" type="text" v-model="category" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="显示颜色" hide-details="auto" type="text" v-model="color" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="内容" hide-details="auto" type="text" v-model="content" required color="primary">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="重复" hide-details="auto" type="text" v-model="repeat" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="地址" hide-details="auto" type="text" v-model="address" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="提醒时间" hide-details="auto" type="text" v-model="remindTime" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="提醒方式" hide-details="auto" type="text" v-model="remindMethod" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn depressed tile outlined block @click="submit" color="primary"> 添加 </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn depressed tile outlined block @click="cancel" > 取消 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import pbRequest from '@/plugins/request';
import dayjs from 'dayjs';
export default {
  name: 'TaskEditComponent',
  data() {
    return {
      title: '',
      startTime: '',
      endTime: '',
      color: '#ff0000',
      category: 'default',
      content: '',
      state: 0,
      repeat: 0,
      remindMethod: 0,
      remindTime: 0,
      address: '',

      valid: false,
    }
  },
  methods: {
    submit() {
      pbRequest('/addTask', 'Task', 'AddTask', {
        task: {
          userId: +sessionStorage.getItem('userId'),
          title: this.title,
          startTime: dayjs(this.startTime).valueOf(),
          endTime: dayjs(this.endTime).valueOf(),
          color: this.color,
          category: this.category,
          content: this.content,
          state: +this.state,
          repeat: +this.repeat,
          remindMethod: +this.remindMethod,
          remindTime: +this.remindTime,
          address: this.address,
        }
      }).then(() => {
        this.$emit('success');
      }).catch((err) => {
        this.$emit('error', err);
      })
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>