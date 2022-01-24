<template>
  <div class="child">
    <h3>我是Child组件（子组件），{{ name }} ---- {{ price }}</h3>
    <Son />
  </div>
</template>

<script>
import Son from './Son.vue'
import { inject, toRefs } from 'vue'
export default {
  name: 'Child',
  components: { Son },
  setup() {
    let car = inject('car');  // 不建议子组件使用，子组件使用props
  
    return {
      ...toRefs(car)
    }
  }
}
</script>
<style>
.child {
  background: skyblue;
  padding: 10px;
}
</style>