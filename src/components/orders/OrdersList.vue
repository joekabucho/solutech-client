<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="Search by order number"
               v-model="order_number"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
      <button class="m-3 btn btn-sm btn-success">
        <router-link to="/add-orders" class="nav-link">Add</router-link>
      </button>
    </div>
    <div class="col-md-6">
      <h4>Orders List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(order, index) in orders"
            :key="index"
            @click="setActiveOrder(order, index)"
        >
          {{ order.order_number }}
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
          <label><strong>Orders:</strong></label> {{ currentOrder.order_number }}
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
import Orderservice from "../../services/orderservice";

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
      Orderservice.getAll()
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
      Orderservice.delete(order)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      Orderservice.findByTitle(this.order_number)
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
