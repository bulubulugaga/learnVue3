> 官网：https://v3.cn.vuejs.org/guide/composition-api-introduction.html   

# 拉开序幕的setup
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

# ref函数