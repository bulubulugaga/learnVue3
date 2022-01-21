<template>
  <h2>一个人的信息是：</h2>
  <h2>{{ person }}</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}</h2>
  <h2>车辆：{{ person.car }}</h2>

  <button @click="name+='~';">修改姓名</button><br />
  <button @click="age+=1">修改年龄</button><br />
  <button @click="job.j1.salary+=1">修改薪资</button><br />
  <button @click="showRowPerson">输出最原始的person</button><br />
  <button @click="addCar">增加车辆信息</button><br />
  <button v-if="person.car" @click="changeCar">修改车辆名字</button><br />

  <hr />

  <h2>sum的值：{{ sum }}</h2>
  <button @click="sum++">sum++</button>
</template>

<script>
import { ref, reactive, toRefs, toRaw, markRaw } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let sum = ref(0);

    function showRowPerson() {
      // console.log(person);   // Proxy{...}

      const p = toRaw(person);
      p.age++;    // person的age也改变了，只是页面没有刷新，当响应式改变person值时，之前的age就会更新，与shallowRactive一样
      console.log(p, person);    // {}, Proxy{}

      p.job = markRaw(p.job);

      const s = toRaw(sum);
      // s++;  // 报错，s is readonly
      console.log(s, sum);   // RefImpl, RefImpl

    }

    function addCar() {
      const car = { name: '宝马', money: '20w' }
      // person.car = car;
      person.car = markRaw(car);
    }

    function changeCar() {
      person.car.name+='!';    // 数据改变，没有响应
      console.log(person.car);
    }
    
    return {
      sum, 
      person,
      ...toRefs(person),
      showRowPerson,
      addCar,
      changeCar
    }
  }
}
</script>
