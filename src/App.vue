<template>
  <button @click="isShowDemo = !isShowDemo">切换显隐状态</button>
  <Demo v-if="isShowDemo" />
</template>

<script>
import { ref } from 'vue'
import Demo from './components/Demo'
export default {
  name: 'App',
  components: {
    Demo
  },
  setup() {
    let isShowDemo = ref(true);

    return {
      isShowDemo
    }
  }
}
</script>