<template>
  <input type="text" v-model="keyword" />
  <h2>{{ keyword }}</h2>
</template>

<script>
import { ref, customRef } from 'vue'
export default {
  name: 'App',
  setup() {
    // 自定义ref
    function myRef(value, delay) {
      let timer;
      return customRef((track, trigger) => ({
        get() {
          console.log(`有人从myRef这个容器中读取数据了，我把${value}值给他了`);
          track();   // 通知vue追踪value值的变化
          return value;
        },
        set(newVal) {
          console.log(`有人把myRef这个容器中属性改为了：${newVal}`);
          clearTimeout(timer);
          timer = setTimeout(() => {
            value = newVal;
            trigger();   // 通知vue重新解析模板
          }, delay);
        }
      }))
    }

    // let keyword = ref('hello');   // 使用vue提供的ref
    let keyword = myRef('hello', 500);   // 自定义ref


    return {
      keyword
    }
  }
}
</script>