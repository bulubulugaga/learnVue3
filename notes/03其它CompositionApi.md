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

