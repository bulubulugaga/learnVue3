<template>
  <h2>一个人的信息是：</h2>
  <h2>所有信息：{{ person }}</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}</h2>

  <button @click="name+='~'">修改姓名</button><br />
  <button @click="age+=1">修改年龄</button><br />
  <button @click="job.j1.salary+=1">修改薪资</button>
</template>

<script>
import { reactive, toRef, ref, toRefs } from 'vue'
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

    console.log(ref(person.name));  // RefImpl{ ..., value, [[prototype{get,set}]] }   只是单纯的对 '张三' 响应式
    console.log(toRef(person, 'name'));  // ObjectRefImpl{ ..., value, [[prototype{get,set}]] }  响应式对象
    console.log(toRefs(person));  // { name: ObjectRefImpl{ ..., value, [[prototype{get,set}]]}, ··· }   深层嵌套也响应

    return {
      person,  


      // name: person.name,   // 相当于name: '张三'，失去响应
      // age: person.age,
      // salary: person.job.j1.salary
      // 相当于...person

      // name: toRef(person, 'name'),   // ObjectRefImpl{ ..., value, [[prototype{get,set}]] }  响应式对象
      // age: toRef(person, 'age'),
      // salary: toRef(person.job.j1, 'salary')

      // name: ref(person.name),   // RefImpl{ ..., value, [[prototype{get,set}]] } ref会导致现在name响应式绑定的是'张三', person值不会被修改
      // age: ref(person.age),
      // salary: ref(person.job.j1.salary)

      ...toRefs(person)   // { name: ObjectRefImpl{ ..., value, [[prototype{get,set}]]}, ··· }   深层嵌套也响应
      // toRefs返回的是对象，所以展开返回  
    }
  }
}
</script>
