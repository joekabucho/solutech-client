<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Orders</h4>
    <form>
      <div class="form-group">
        <label for="order-number">Order number</label>
        <input type="number" class="form-control" id="order-number"
               v-model="currentOrder.order_number"
        />
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
    <p>Please click on an order...</p>
  </div>
</template>

<script>
import Orderservice from "../../services/orderservice";

export default {
  name: "orders",
  data() {
    return {
      currentOrder: null,
      message: ''
    };
  },
  methods: {
    getOrder(id) {
      Orderservice.get(id)
          .then(response => {
            this.currentOrder = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateOrder() {
      Orderservice.update(this.editId, this.currentOrder)
          .then(response => {
            console.log(response.data);
            this.message = 'The order was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteOrder() {
      Orderservice.delete(this.currentOrder.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "orders" });
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

  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
