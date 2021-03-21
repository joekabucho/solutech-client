<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
               v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>

      <button class="m-3 btn btn-sm btn-success">
        <router-link to="/add-products" class="nav-link">Add</router-link>
      </button>
    </div>
    <div class="col-md-6">
      <h4>Products List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(product, index) in products"
            :key="index"
            @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
          <button class="m-3 btn btn-sm btn-danger" @click="removeProduct(product.id)">
            Remove
          </button>
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentProducts">
        <h4>Products</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentProducts.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentProducts.description }}
        </div>
        <div>
          <label><strong>Quantity:</strong></label> {{ currentProducts.quantity}}
        </div>
        <a class="badge badge-warning"
           :href="'/products/' + currentProducts.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Productservice from "../../services/productservice";

export default {
  name: "products-list",
  data() {
    return {
      products: [],
      currentProducts: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveProducts() {
      Productservice.getAll()
          .then(response => {
            this.products = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProducts = null;
      this.currentIndex = -1;
    },

    setActiveProduct(products, index) {
      this.currentProducts = products;
      this.currentIndex = index;
    },

    removeProduct(id) {
      Productservice.delete(id)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      Productservice.findByTitle(this.name)
          .then(response => {
            this.products = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveProducts();
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
