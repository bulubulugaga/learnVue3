> 官网：<a href="https://v3.cn.vuejs.org/guide/composition-api-introduction.html" target="_blank">https://v3.cn.vuejs.org/guide/composition-api-introduction.html</a>   

# 1. 拉开序幕的setup
1. 理解：vue3中的一个新的配置项，值为一个函数。
2. setup是所有Composition API(组合API)“表演的舞台”。
3. 组件中所有用到的：数据、方法等，均配置在setup中。
4. setup函数的两种返回值：  
    1. 若返回一个对象，则对象中的属性、方法在模板中均可使用。
    2. 若返回一个渲染函数：则可以自定义渲染内容。
5. 注意点：  
    1. 尽量不与vue2.x配置混用  
        * vue2.x配置（data、methods、computed……）中可以访问到setuo中的属性和方法。
        * 但在setup中不能访问vue2.x配置。
        * 如果重名，看顺序，data在前以data为主，setup在前以setup为主。
    2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板中看不到return对象中的属性。

# 2. ref函数
1. 作用：定义一个响应式数据。
2. 语法：const xxx = ref(initValue)。
    * 创建一个包含响应式数据的引用对象（reference对象）。
    * JS中操作数据：xxx.value。
    * 模板中读取数据：不需要.value，直接 < div >{{ xxx }}< /div >。
3. 备注：
    * 接收的数据可以是：基本类型、也可以是对象类型。
    * 基本类型数据：响应式依然是依靠Object.defineProperty的get和set。
    * 对象类型的数据：内部“求助”vue3中的新函数----reactive函数。

# 3. reactive函数
* 作用：定义一个对象类型的响应式数据（基本类型不要用它，用ref函数）。
* 语法：const代理对象 = reactive(源对象)接收一个对象或数组，返回一个代理对象(proxy对象)。
* reactive定义的响应式数据是“深层次的”。
* 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作。

# 4. 响应式对比
## vue2中的响应式
* 实现原理：
    * 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）。
    * 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
    ```
    Object.defineProperty(data, 'count', {
        get () {},
        set () {}
    })
    ```
* 存在的问题：
    * 新增属性、删除属性，界面不会更新。
    * 直接通过下标修改数组，界面不会自动更新。
## vue3中的响应式
* 实现原理：
    * 通过Proxy（代理）：拦截对象中任意属性值的变化，包括：属性值的读写、属性的添加、属性的删除等。
    * 通过Reflect（反射）：对被代理对象的属性进行操作。
    * MDN:
        * Proxy: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy</a>
        * Reflect: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect</a>

        ```
        new Proxy(data, {
            // 拦截读取属性值
            get(target, prop) {
                return Reflect.get(target, prop);
            },
            // 拦截设置属性值或添加新属性
            set(target, prop, value) {
                return Reflect.set(target, prop, value);
            },
            // 拦截删除属性
            deleteProperty(target, prop) {
                return Reflect.deleteProperty(target, prop);
            }
        });
        ```

# 5. reactive对比ref
* 从定义数据角度对比：
    * ref用来定义：基本类型数据。
    * reactive用来定义：对象（数组等）类型数据。
    * 备注：ref也可以定义对象类型数据，内部会自动通过reactive转为代理对象。
* 从原理角度对比：
    * ref通过Object.defineProperty的get和set来实现响应式（数据劫持）。
    * reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据。
* 从使用角度对比：
    * ref定义的数据：操作数据需要.value，读取数据时模板中不需要.value。
    * reactive定义的数据：操作数据与读取数据均不需要.value。

# 6. setup的两个注意点
* setup执行的时机
    * 在beforeCreate之前执行一次，this是undefined。
* setup的参数
    * props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
    * context：上下文对象
        * attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs。
        * slots：收到的插槽内容，相当于this.$slots。
        * emit: 分发自定义事件的函数，相当于this.$emit。

# 7. 计算属性与监听
## 1. computed函数
* 与vue2中computed配置功能一致
* 写法
    ```
    import { computed } from 'vue'

    setup() {
        // 简写
        let fullName = computed(() => {
            return person.firstName + '-' + person.lastName;
        })
        // 完整写法
        let fullName = computed(() => {
            get() {
                return person.firstName + '-' + person.lastName;
            }
            set(value) {
                const nameArr = value.split('-');
                person.firstName = nameArr[0];
                person.lastName = nameArr[1];
            } 
        })
    }  
    ```
## 2. watch函数
* 与vue2中配置功能一致
* 两个小坑
    * 监视reactive定义的响应式数据时，oldValue无法正确获取，强制开启了深度监视（deep配置生效）。
    * 监视reactive定义的响应式数据中的某个属性时，deep配置有效。
    ```
    // 情况一：监视ref所定义的一个响应式数据
    watch(sum, (newVal, oldVal) => {
      console.log('sum更新了', newVal, oldVal);
    }, {
      immediate: true,  // 配置项
      deep: true
    })

    // 情况二：监视ref所定义的多个响应式数据
    watch([sum, msg], (newVal, oldVal) => {
      console.log('sum或msg更新了', newVal, oldVal);   // newVal为两个更新数据后的数组
    })

    /* 
      情况三：监视reactive所定义的一个响应式数据全部属性，
        1. 注意：此处无法正确的获取oldValue，建议需要oldValue的单独拿出 let age = ref(18) 再监听 
        2. 注意：强制开启了深度监听（deep配置无效）
    */
    watch(person, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    }, { deep: false }) // 此处deep配置无效

    // 情况四：监听reactive所定义的一个响应式数据中的某个属性，可获取oldVal
    watch(() => person.age, (newVal, oldVal) => {
      console.log('person的age更新了', newVal, oldVal);
    })

    // 情况五：监听reactive所定义的一个响应式数据中的某些属性，可获取oldVal
    watch([() => person.name, () => person.age], (newVal, oldVal) => {
      console.log('person的name或age更新了', newVal, oldVal);
    })

    // 特殊情况：
    watch(() => person.job, (newVal, oldVal) => {
      console.log('person的job.j1.salary更新了', newVal, oldVal);
    }, { deep: true })  // 这里实际监听的是job，所以要开启deep
    ```
* 当对象以ref形式定义时，如何监听
    ```
    // 基本数据类型时不用加.value，因为person下value值是0，可以直接监听到，如果加.value，反而监听的是值
    // ref下没有默认deep: true，.value下是对象，所以监听不到，可以直接监听.value，也可以加deep: true

    // 1. 
    watch(person.value, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    })

    // 2. 
    watch(person, (newVal, oldVal) => {
      console.log('person更新了', newVal, oldVal);
    }, { deep: true })
    ```
## 3. watchEffect函数
* watch的套路是：既要指明监听的属性，也要指明监听的回调。
* watchEffect的套路是：不用指明监视那个属性，监视的回调中用到哪个属性，就监视哪个属性。
* watchEffect有点像computed:
    * computed注重计算出来的值（回调函数的返回值），所以必须要写返回值。
    * watchEffect注重过程（回调函数的函数体），所以不用写返回值。
    ```
    // watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
    watchEffect(() => {
        const x1 = sum.value;
        const x2 = person.age;
        console.log('watchEffect配置的回调执行了');
    })
    ``` 

# 8. 生命周期
## 1. 配置项形式
* 与vue2基本一致，有两个更名
    * beforeDestroy  =>  beforeUnmount
    * destroyed  =>  unmounted
* 组合式API
    * beforeCreate  =>  setup
    * created  =>  setup
    * beforemount  =>  onBeforeMount
    * mounted  =>  onMounted
    * beforeUpdate  =>  onBeforeUpdate
    * updated  =>  onUpdated
    * beforeUmnount  =>  onBeforeUmnount
    * unmounted  =>  onUnmounted
* 当配置项和组合式一起使用时，组合项优先执行（一般不同时使用）
    * setup -> beforeCreate -> created -> onBeforeMount -> beforemount ···   

# 9. 自定义hook函数
* 什么是hook? --- 本质是一个函数，把setup函数中使用的Composition API进行了封装。
* 类似于vue2中的mixin。
* 自定义hook的优势：复用代码，让setup中的逻辑更清楚易懂。