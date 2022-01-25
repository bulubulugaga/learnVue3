<template>
  <button @click="isShow = true">点我弹个窗</button>
  <teleport to='body'>
    <div v-if="isShow" class="mask">
      <div class="dialog">
        <h2>我是一个弹窗</h2>
        <h3>内容</h3>
        <h3>内容</h3>
        <h3>内容</h3>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
  
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Dialog',
  setup() {
    let isShow = ref(false);

    return { isShow };
  }
}
</script>

<style>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
}
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: green;
  text-align: center;
}
</style>