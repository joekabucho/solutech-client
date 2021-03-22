<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
    </div>
    <div>
      <canvas id="bar-chart"></canvas>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import { mapState } from "vuex";
import Chart from "chart.js";
import barChartData from "../bar-data.js";

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {
      barChartData: barChartData
    };
  },
  mounted() {
    User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data.success);
    });
    const ctx1 = document.getElementById("bar-chart");
    new Chart(ctx1, this.barChartData);
  }
};
</script>
