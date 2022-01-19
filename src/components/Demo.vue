<template>
  <h2>一个人的信息是：</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}</h2>

  <button @click="name+='~'">修改姓名</button><br />
  <button @click="age+=1">修改年龄</button><br />
  <button @click="job.j1.salary+=1">修改薪资</button>

  <hr />

  <h2>sum的值：{{ sum }}</h2>
  <button @click="sum++">sum++</button>
</template>

<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let sum = ref(0);

    sum = readonly(sum);
    // sum = shallowReadonly(sum);   // 因为里面就是基本数据类型，所以跟readonly效果一样
    // person = readonly(person);
    person = shallowReadonly(person);   // 可修改salary

    return {
      sum, 
      ...toRefs(person) 
    }
  }
}
</script>
