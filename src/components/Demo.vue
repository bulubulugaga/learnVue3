<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>

  <button @click="hello">测试触发hello事件</button>
  <br />
  <br />
  <slot></slot>
  <br />
  <slot name="slotA"></slot>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Demo',
  props: ['msg', 'school'],
  emits: ['hello'],
  beforeCreate() {
    // console.log('---beforeCreate---');
  },
  setup(props, context) {

    // console.log('---setup---', this);

    console.log(props);
    console.log(context.attrs);  // 与vue2中$attrs相似
    console.log(context.emit);  // 触发自定义事件
    console.log(context.slots);  // 插槽

    let person = reactive({
      name: '张三',
      age: 18
    })

    function hello() {
      context.emit('hello', 666);
    }

    return {
      person,
      hello
    }
  }
}
</script>
