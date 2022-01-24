# 1. shallowReactive与shallowRef
* shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
* shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理。
* 什么时候使用
  * 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive。
  * 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。
* 注意：shallowReactive修改嵌套的数据时，数据会改变，只是没有响应在页面上，当此时响应式修改其它属性时，嵌套属性会一起响应在页面上。

# 2. readonly与shallowReadonly
* readonly：让一个响应式数据变为只读（深只读）。
* shallowReadonly：让一个响应式数据变为只读（浅只读，深嵌套可修改）。
* 应用场景：不希望数据被修改时，比如父组件使用子组件时，在父组件是响应式数据，但不希望子组件修改。
* 数据直接不被修改

# 3. toRaw与markRaw
* toRaw:
  * 作用：将一个由reactive生成的响应式对象转为普通对象。
  * 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面刷新。
* markRaw：
  * 作用：标记一个对象，使其永远不会再成为响应式对象。
  * 应用场景：
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转化可以提高性能。

# 4. customRef
* 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制。
* 实现防抖效果：
  ```
  <input type="text" v-model="keyword" />
  <h2>{{ keyword }}</h2>

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
  ```

# 5. provide与inject
* 作用：实现祖与后代组件间通信
* 套路：父组件有一个provide选项来提供数据，后代组件有一个inject选项来开始使用这些数据
* 具体写法：  
  1. 祖组件中：
    ```
    setup() {
      ……
      let car = reactive({ name: '奔驰', price: '40万' });
      provide('car', car);
      ……
    }
    ```
  2. 后代组件中：
    ```
    setup() {
      ……
      const car = inject('car');
      return { car }
    }
    ```

# 6. 响应式数据的判断
* isRef：检查一个值是否为ref对象
* isReactive：检查一个对象是否是由reactive创建的响应式代理
* isReadonly：检查一个对象是否是由readonly创建的只读代理
* isProxy：检查一个对象是否是由reactive或者readonly方法创建的代理(ref底层响应不是proxy)