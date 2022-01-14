/*
 * @Author: liu
 * @Date: 2022-01-14 17:45:50
 * @LastEditTime: 2022-01-14 17:49:56
 * @Description: file content
 */
import { reactive, onMounted, onBeforeUnmount } from 'vue'
export default function () {
  let point = reactive({
    x: 0,
    y: 0
  })

  function getPoint(event) {
      point.x = event.pageX;
      point.y = event.pageY;
      console.log(event.pageX, event.pageY);
  }

  // 挂载前给window添加事件监听
  onMounted(() => {
    window.addEventListener('click', getPoint)
  }) 

  // 卸载前给window移除事件监听
  onBeforeUnmount(() => {
    window.removeEventListener('click', getPoint);
  })

  return point;
}