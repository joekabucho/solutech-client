<template>
  <div class="list row">
    <div class="col-md-8">
      <button class="m-3 btn btn-sm btn-success">
        <router-link to="/add-order-details" class="nav-link">Add</router-link>
      </button>
    </div>
    <div class="col-md-6">
      <h4>Orders Details List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(order, index) in orders"
            :key="index"
            @click="setActiveOrder(order, index)"
        >
          {{ order.order_id }}
          {{ order.product_id }}

          <button class="m-3 btn btn-sm btn-danger" @click="removeOrder(order.id)">
            Remove All
          </button>
        </li>
      </ul>


    </div>
    <div class="col-md-6">
      <div v-if="currentOrder">
        <h4>Orders</h4>
        <div>
          <label><strong>Orders Id:</strong></label> {{ currentOrder.order_id}}
          <label><strong>Product Id:</strong></label> {{ currentOrder.product_id }}

        </div>

        <a class="badge badge-warning"
           :href="'/orders/' + currentOrder.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Order...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Orderdetailservice from "../../services/orderdetailservice";

export default {
  name: "orders-list",
  data() {
    return {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      order_number: ""
    };
  },
  methods: {
    retrieveOrders() {
      Orderdetailservice.getAll()
          .then(response => {
            this.orders = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveOrders();
      this.currentOrder = null;
      this.currentIndex = -1;
    },

    setActiveOrder(order, index) {
      this.currentOrder = order;
      this.currentIndex = index;
    },

    removeOrders(order) {
      Orderdetailservice.delete(order)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      Orderdetailservice.findByTitle(this.order_number)
          .then(response => {
            this.orders = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveOrders();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
