<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="products.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          required
          v-model="products.description"
          name="description"
        >
        </textarea>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="number"
          class="form-control"
          id="quantity"
          required
          v-model="products.quantity"
          name="quantity"
        />
      </div>
      <button @click="saveProducts" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script>
import Productservice from "../apis/productservice";

export default {
  name: "add-products",
  data() {
    return {
      products: {
        name: "",
        description: "",
        quantity: ""
      },
      submitted: false
    };
  },
  methods: {
    saveProducts() {
      const data = {
        name: this.products.name,
        description: this.products.description,
        quantity: this.products.quantity
      };

      Productservice.create(data)
        .then(response => {
          this.products.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.products = {};
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
