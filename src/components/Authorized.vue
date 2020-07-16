<script>
// 权限组件（利用render函数构建函数式组件）
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    //createElement,context
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};

/*
函数式组件特点：
  没有管理任何状态
  没有监听任何传递给它的状态
  没有生命周期方法
  它只是接收一些prop的函

我们将这样的组件标记为functional：
  无状态 == 无响应式数据
  无实例 == 无this上下文

函数式组件的优点：
  渲染开销低，因为函数式组件只是函数；

函数式组件基本写法：
 {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
}

组件需要的一切都是通过 context 参数传递，它是一个包含如下字段的对象：
  props: 提供所有prop的对象
  children:VNode 子节点的数组
  slots: 一个函数，返回了包含所有插槽的对象
  scoptedSlots:(2.6.0) 一个暴露传入的作用域插槽的对象，也以函数形式暴露普通插槽
  data:传递个组件的整个数据对象，作为createElement的第二个参数传入组件
  parent:对父组件的引用
  listeners:(2.3.0+) 一个包含了：所有父组件为当前组件祖册的事件监听器对象，是data.on的一个别名
  injections:(2.3.0+) 如果使用了inject选项，则改对象包含了：应当被注入的属性；*/
</script>
