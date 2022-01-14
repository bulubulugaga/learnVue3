<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum += 1">点我加1</button>

  <hr />
  <h2>姓名：{{ person.name}}</h2>
  <h2>年龄：{{ person.age}}</h2>
  <h2>薪资：{{ person.job.j1.salary}}</h2>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">增长薪资</button>
</template>

<script>
import { ref, reactive, watch, watchEffect } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let sum = ref(0);
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // 情况一：监视ref所定义的一个响应式数据
    // watch(sum, (newVal, oldVal) => {
    //   console.log('sum更新了', newVal, oldVal);
    // })

    // 可用于报销，审批等，只要有变化就会执行函数体
    watchEffect(() => {
      const x1 = sum.value;
      const x2 = person;
      const x3 = person.job.j1.salary;
      console.log('watchEffect配置的回调执行了');
    })


    return {
      sum,
      person
    }
  }
}
</script>
