<template>
  <h1>一个人的信息</h1>
  姓：<input type="text" v-model="person.firstName" />
  名：<input type="text" v-model="person.lastName" />
  <br />
  <!-- 全名：<span>{{ fullName }}</span> -->
  全名：<span>{{ person.fullName }}</span>
  <br />
  全名：<input type="text" v-model="person.fullName" />
</template>

<script>
import { reactive, computed } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let person = reactive({
      firstName: '张',
      lastName: '三'
    })

    // let fullName = computed(() => {
    //   return `${person.firstName}-${person.lastName}`;
    // })

    // 相当于person的属性，直接追加在person上，由于有reactive，还是响应式
    // person.fullName = computed(() => {
    //   return `${person.firstName}-${person.lastName}`;
    // })

    // 考虑读和写时
    person.fullName = computed({
      get() {
        return `${person.firstName}-${person.lastName}`;
      },
      set(value) {
        // console.log(value);   // fullName
        const nameArr = value.split('-');
        person.firstName = nameArr[0];
        person.lastName = nameArr[1];
      }
    })

    return {
      person,
      // fullName
    }
  }
}
</script>
