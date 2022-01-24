<template>
  <div class="app">
    <h3>我是App组件（祖组件），{{ name }} ---- {{ price }}</h3>
    <Child />
  </div>
</template>

<script>
import Child from './components/Child.vue'
import { reactive, toRefs, provide } from 'vue'
export default {
  name: 'App',
  components: { Child },
  setup() {
    let car = reactive({
      name: '宝马',
      price: '40万'
    })
    
    provide('car', car)  // 给自己的后代组件传递数据（所有后代都能接收 ）

    return {
      ...toRefs(car)
    }
  }
}
</script>
<style>
.app {
  background: gray;
  padding: 10px;
}
</style>