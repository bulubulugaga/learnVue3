<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum += 1">点我加1</button>

  <hr />
  <h2>当前点击的坐标是  x: {{ point.x }} y: {{ point.y }}</h2>
</template>

<script>
// import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { ref } from 'vue'
import getPoint from '../hooks/getPoint'
export default {
  name: 'Demo',
  setup() {
    let sum = ref(0);

    // 基础获取坐标值的方法
    /* 
    let point = reactive({
      x: 0,
      y: 0
    })
    function getPoint(event) {
        point.x = event.pageX;
        point.y = event.pageY;
    }
    onMounted(() => {
      window.addEventListener('click', getPoint)
    }) 
    onBeforeUnmount(() => {
      window.removeEventListener('click', getPoint);
    })  */

    // 利用hook封装
    let point = getPoint();

    return {
      sum,
      point
    }
  },

  // #region
  /* beforeCreate() {
    console.log('------- beforeCreate -------');
  },
  created() {
    console.log('------- created -------');
  },
  beforeMount() {
    console.log('------- beforeMount -------');
  },
  mounted() {
    console.log('------- mounted -------');
  },
  beforeUpdate() {
    console.log('------- beforeUpdate -------');
  },
  updated() {
    console.log('------- updated -------');
  },
  beforeUnmount() {
    console.log('------- beforeUnmount -------');
  },
  unmounted() {
    console.log('------- unmounted -------');
  } */
  // #endregion
}
</script>
