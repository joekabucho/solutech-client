<template>
  <div>
    <canvas id="Chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import ChartData from "../line-data.js";

export default {
  name: "Chart",
  data() {
    return {
      ChartData: ChartData
    };
  },
  mounted() {
    const ctx = document.getElementById('chart');
    new Chart(ctx, this.ChartData);
  }
};
</script>
