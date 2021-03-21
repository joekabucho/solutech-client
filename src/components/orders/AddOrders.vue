<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="order_number">Order Number</label>
        <input
            type="number"
            class="form-control"
            id="order_number"
            required
            v-model="orders.order_number"
            name="order_number"
        />
      </div>

      <button @click="saveOrders" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrders">Add</button>
    </div>
  </div>
</template>

<script>
import Orderservice from "../../services/orderservice";

export default {
  name: "add-orders",
  data() {
    return {
      orders: {
        order_number: "",
      },
      submitted: false
    };
  },
  methods: {
    saveOrders() {
      var data = {
        orders: this.orders.order_number,
      };

      Orderservice.create(data)
          .then(response => {
            this.orders.id = response.orders.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newOrders() {
      this.submitted = false;
      this.orders = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
