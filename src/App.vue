<template>
  <h1>我是App组件</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="sayHello">说话</button>

  <h1>-----vue2混用测试------------------------------</h1>
  <h2>性别：{{ sex }}</h2>
  <button @click="test1">vue2中引用setup</button>
  <button @click="test2">vue3中引用data、methods</button>

  <h1>-----同名优先级------------------------------</h1>
  <h2>公共值：{{ common }}</h2>
</template>

<script>
// setup返回渲染函数时需引入
import { h } from 'vue'
export default {
  name: 'App',
  // 此处只是测试setup，暂时不考虑响应式问题
  setup() {
    // 数据
    const name = '张三';
    let age = 18;

    // 方法
    function sayHello() {
      age = 20;
      console.log(`我叫${name}，今年${age}岁，你好啊~`);  //打印20，但页面还是18
    }

    function test2() {
      console.log(this.sex);  // undefined
      console.log(this.name);
      console.log(this.test1);  // undefined
    }

    let common = 'vue3';

    // 返回
    return {
      name, 
      age,
      sayHello,
      test2,

      common
    }

    // 返回渲染函数
    // return () => h('h1', '以渲染函数为主');
  },

  // 测试vue2
  data() {
    return {
      sex: '女',

      common: 'vue2'
    }
  },
  methods: {
    test1() {
      console.log(this.sex);
      console.log(this.name);
      console.log(this.age);
      console.log(this.sayHello);
    }
  }
}
</script>
