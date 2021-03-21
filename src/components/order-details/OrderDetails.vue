<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Orders</h4>
    <form>
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

    </form>

    <button class="badge badge-danger mr-2"
            @click="deleteOrder"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
            @click="updateOrder"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an order detail...</p>
  </div>
</template>

<script>
import Orderdetailservice from "../../services/orderdetailservice";
import Orderservice from "../../services/orderservice";
import Productservice from "../../services/productservice";

export default {
  name: "orders",
  data() {
    return {
      productData: [],
      orderData: [],
      currentOrder: null,
      message: ''
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
    getOrder(id) {
      Orderdetailservice.get(id)
          .then(response => {
            this.currentOrder = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateOrder() {
      Orderdetailservice.update(this.editId, this.currentOrder)
          .then(response => {
            console.log(response.data);
            this.message = 'The order was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteOrder() {
      Orderdetailservice.delete(this.currentOrder.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "order-details" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getOrder(this.$route.params.id);
    this.editId = this.$route.params.id
    this.retrieveOrders();
    this.retrieveProducts();

  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
