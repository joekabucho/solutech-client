<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="order_id">Choose an order:</label>

        <select name="order_id" id="order_id">
          <option
              :class="{ active: index === currentIndex }"
              :key="index"
              v-for="(order,index) in orderData" :value="order.id">{{order.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="product_id">Choose an product:</label>

        <select name="product_id" id="product_id">
          <option
              :class="{ active: index === currentIndex }"
              :key="index"
              v-for="(product,index) in productData" :value="product.id">{{product.name}}</option>
        </select>
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
import Orderdetailservice from "../../services/orderdetailservice";
import Orderservice from "../../services/orderservice";
import Productservice from "../../services/productservice";


export default {
  name: "add-orders",
  data() {
    return {
      productData: [],
      orderData: [],
      orders: {
        order_id: "",
        product_id: "",

      },
      submitted: false
    };
  },
  methods: {
    retrieveProducts() {
      Productservice.getAll()
          .then(response => {
            this.productData = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    retrieveOrders() {
      Orderservice.getAll()
          .then(response => {
            this.orders = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    saveOrders() {
      var data = {
        order_id: this.orders.order_id,
        product_id: this.orders.product_id,

      };

      Orderdetailservice.create(data)
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
  },
  mounted() {
    this.retrieveOrders();
    this.retrieveProducts();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
