<template>
  <div class="app">
    <h3>我是App组件</h3>
  </div>
</template>

<script>
import { reactive, readonly, toRefs, ref, isRef, isReactive, isReadonly, isProxy } from 'vue'
export default {
  name: 'App',
  setup() {
    let car = reactive({ name: '宝马', price: '40万' });
    let sum = ref(0);
    let car2 = readonly(car);

    console.log(isRef(sum));
    console.log(isReactive(car));
    console.log(isReadonly(car2));
    console.log(isProxy(car));
    console.log(isProxy(car2));
    
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