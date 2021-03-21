<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentProduct.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description"
               v-model="currentProduct.description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" class="form-control" id="quantity"
               v-model="currentProduct.quantity"
        />
      </div>
    </form>


    <button class="badge badge-danger mr-2"
            @click="deleteProduct"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
            @click="updateProduct"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import Productservice from "../../services/productservice";

export default {
  name: "products",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      Productservice.get(id)
          .then(response => {
            this.currentProduct = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateProduct() {
      Productservice.update(this.editId, this.currentProduct)
          .then(response => {
            console.log(response.data);
            this.message = 'The product was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteProduct() {
      Productservice.delete(this.currentProduct.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "products" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
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
