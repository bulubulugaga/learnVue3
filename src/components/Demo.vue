<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="addSum">点我加1</button>

  <hr /> 
  <h2>当前信息为：{{ msg }}</h2>
  <!-- 模板中不用.value -->
  <!-- <button @click="msg.value= msg.value + '!'">点我加1</button> -->
  <button @click="msg = msg + '!'">修改信息</button>

  <hr />
  <h2>姓名：{{ person.name}}</h2>
  <h2>年龄：{{ person.age}}</h2>
  <h2>薪资：{{ person.job.j1.salary}}</h2>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">增长薪资</button>

  <hr />
  <h2>姓名：{{ p.name}}</h2>
  <h2>薪资：{{ p.job.j1.salary}}</h2>
  <button @click="p.name += '~'">修改姓名</button>
  <button @click="p.job.j1.salary++">增长薪资</button>
</template>

<script>
import { ref, reactive, watch } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let sum = ref(0);
    let msg = ref('你好啊');
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let p = ref({
      name: '李四',
      job: {
        j1: {
          salary: 30
        }
      }
    })
    
    function addSum() {
      sum.value++;
    }

    // 情况一：监视ref所定义的一个响应式数据
    /* watch(sum, (newVal, oldVal) => {
      console.log('sum更新了', newVal, oldVal);
    }, {
      immediate: true,  // 配置项
      deep: true
    }) */

    // 情况二：监视ref所定义的多个响应式数据
    /* watch([sum, msg], (newVal, oldVal) => {
      console.log('sum或msg更新了', newVal, oldVal);   // newVal为两个更新数据后的数组
    }) */

    /* 
      情况三：监视reactive所定义的一个响应式数据全部属性，
        1. 注意：此处无法正确的获取oldValue，建议需要oldValue的单独拿出 let age = ref(18) 再监听 
        2. 注意：强制开启了深度监听（deep配置无效）
    */
    /* watch(person, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    }, { deep: false }) // 此处deep配置无效 */

    // 情况四：监听reactive所定义的一个响应式数据中的某个属性，可获取oldVal
    /* watch(() => person.age, (newVal, oldVal) => {
      console.log('person的age更新了', newVal, oldVal);
    }) */

    // 情况五：监听reactive所定义的一个响应式数据中的某些属性，可获取oldVal
    /* watch([() => person.name, () => person.age], (newVal, oldVal) => {
      console.log('person的name或age更新了', newVal, oldVal);
    }) */

    // 特殊情况：
    /* watch(() => person.job, (newVal, oldVal) => {
      console.log('person的job.j1.salary更新了', newVal, oldVal);
    }, { deep: true })  // 这里实际监听的是job，所以要开启deep */

    // 监听ref对象形式
    // 基本数据类型时不用加.value，因为person下value值是0，可以直接监听到，如果加.value，反而监听的是值
    // ref下没有默认deep: true，.value下是对象，所以监听不到，可以直接监听.value，也可以加deep: true
    // 1. 
    /* watch(p.value, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    }) */
    // 2. 
    /* watch(p, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    }, { deep: true }) */

    return {
      sum,
      msg,
      person,
      p,
      addSum
    }
  }
}
</script>
