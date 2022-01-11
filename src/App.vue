<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  // 此处只是测试setup，暂时不考虑响应式问题
  setup() {
    let name = ref('张三');
    let age = ref(18);
    
    function changeInfo() {
      name.value = '李四';
      age.value = 48;
      console.log(name, age);
    }

    return {
      name, 
      age,
      changeInfo
    }
  }
}
</script>
