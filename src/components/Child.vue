<template>
  <div class="child">
    <h3>我是Child组件</h3>
    {{ sum }}
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Child',
  // setup() {
  //   let sum = ref(0);
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve({ sum })
  //     }, 2000)
  //   })
  // }
  async setup() {
    let sum = ref(0);
    let p = new Promise(resolve => {
      setTimeout(() => {
        resolve({ sum })
      }, 2000)
    })
    return await p
  }
}
</script>
<style>
.child {
  background: skyblue;
  padding: 10px;
}
</style>