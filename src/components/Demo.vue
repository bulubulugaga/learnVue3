<template>
  <h2>一个人的信息是：</h2>
  <h2>所有信息：{{ person }}</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}</h2>

  <button @click="name+='~'">修改姓名</button><br />
  <button @click="age+=1">修改年龄</button><br />
  <button @click="job.j1.salary+=1">修改薪资</button>

  <hr />

  <h2>x.y的值：{{ x.y }}</h2>
  <button @click="x.y++">x + 1</button>
</template>

<script>
import { ref, reactive, toRefs, shallowReactive, shallowRef } from 'vue'
export default {
  name: 'Demo',
  setup() {
    // let person = reactive({
    let person = shallowReactive({   // name和age完全响应，job改变不响应，但在改变name和age是会变成最后的值
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    console.log(person);

    // let x = shallowRef(0);   // 绑定基本数据类型时与ref一致
    // console.log(x);
    
    // let x = ref({  // RefImpl{...value:Proxy}
    let x = shallowRef({  // RefImpl{...value:{y:0}}
      y: 0
    });
    console.log(x);

    return {
      person, 
      x, 
      ...toRefs(person) 
    }
  }
}
</script>
