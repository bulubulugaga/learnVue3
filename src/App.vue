<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>工作：{{ job.type }}</h2>
  <h2>薪资：{{ job.salary }}</h2>
  <h2>深层嵌套测试：{{ job.a.b.c }}</h2>
  <h2>爱好：{{ hobbies }}</h2>
  <button @click="changeInfo">修改信息</button>
  <br />
  <br />
  <h1>------简化之后----------------</h1>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <h2>工作：{{ person.job.type }}</h2>
  <h2>薪资：{{ person.job.salary }}</h2>
  <h2>深层嵌套测试：{{ person.job.a.b.c }}</h2>
  <h2>爱好：{{ person.hobbies }}</h2>
  <button @click="changeInfo2">修改信息</button>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let name = ref('张三');
    let age = ref(18);
    let job = reactive({
      type: '前端工程师',
      salary: '30k',
      a: {
        b: {
          c: 666
        }
      }
    });
    let hobbies = reactive(['抽烟', '喝酒', '烫头']);
    
    function changeInfo() {
      name.value = '李四';
      age.value = 48;
      job.type = '后端工程师';
      job.a.b.c = 999;
      hobbies[0] = '学习';
    } 

    // 简化
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        type: '前端工程师',
        salary: '30k',
        a: {
          b: {
            c: 666
          }
        }
      },
      hobbies: ['抽烟', '喝酒', '烫头']
    })
    function changeInfo2() {
      person.name = '李四';
      person.age = 48;
      person.job.type = '后端工程师';
      person.job.a.b.c = 999;
      person.hobbies[0] = '学习';
    }

    return {
      name, 
      age,
      job,
      hobbies,
      changeInfo,

      person,
      changeInfo2
    }
  }
}
</script>
