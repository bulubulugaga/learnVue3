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
1. computed函数
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