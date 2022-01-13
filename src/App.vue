<template>
  <demo msg="你好啊" school="尚硅谷" @hello="showHelloMsg">
    <span>插槽内容</span>
    <template v-slot:slotA>
      <span>具名插槽</span>
    </template>
  </demo>
</template>

<script>
import Demo from './components/Demo'
export default {
  name: 'App',
  components: {
    Demo
  },
  setup() {
    function showHelloMsg(value) {
      console.log(`触发hello事件，接收的参数是${value}`);
    }

    return {
      showHelloMsg
    }
  }
}
</script>
