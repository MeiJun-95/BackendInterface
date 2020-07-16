<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import debounce from "lodash/debounce"; //防抖
import { addListener, removeListener } from "resize-detector"; //监听charts dom的size变化
// 监听dom容器的大小变换，当容器变化时，重新渲染echarts
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  // 监听option
  watch: {
    option(val) {
      this.chart.setOption(val); //ECharts 由数据驱动，数据的改变驱动图表展现的改变。所有数据的更新通过 setOption实现
    }
    // 深度监听
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300); //防抖优化
  },
  mounted() {
    // var myChart = echarts.init(document.getElementById('main')) //基于准备好的dom，初始化ecahrts实例  vue中使用ref属性
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize); // vue的组件中没有main标签， vue中使用ref属性
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize); //销毁监听的事件
    this.chart.dispose(); //销毁 chart实例，防止内存泄漏：封装第三方库时特别需要注意的地方
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>
