<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>工作：{{ job.type }}</h2>
  <h2>薪资：{{ job.salary }}</h2>
  <h2>数组：{{ arr }}</h2>
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
    let job = ref({
      type: '前端工程师',
      salary: '30k'
    });
    let arr = ref([1, 2, 3]);
    
    function changeInfo() {
      name.value = '李四';
      age.value = 48;
      job.value.type = '后端工程师';
      arr.value[1] = 20;

      console.log(name);   // RefImpl{..., value}    get和set实现响应式
      console.log(job.value);   // Proxy{type, value}    proxy实现响应式
    } 

    return {
      name, 
      age,
      job,
      arr,
      changeInfo
    }
  }
}
</script>
