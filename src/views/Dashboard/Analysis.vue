<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px " />
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
// import random from "lodash/random";
// import axios from "axios";//向后端请求数据的库
import request from "../../utils/request"; // 对axios的二次封装
import Chart from "../../components/Chart";
import chartCode from "!!raw-loader!../../components/Chart";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {},
      chartCode
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000000);   //实时响应（轮询）
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      })
        // axios
        //   .get("/api/dashboard/chart", { params: { ID: 12345 } })
        .then(response => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data
              }
            ]
          };
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
  
};
</script>

<style></style>
