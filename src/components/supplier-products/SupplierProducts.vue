<template>
  <div v-if="currentSupplier" class="edit-form">
    <h4>Suppliers</h4>
    <form>
      <div class="form-group">
        <label for="supply_id">Choose a supplier:</label>

        <select name="supply_id" id="supply_id">
          <option  :class="{ active: index === currentIndex }"
                   :key="index"
                   v-for="(supply,index) in supplyData" :value="supply.id">{{supply.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="product_id">Choose an product:</label>

        <select name="product_id" id="product_id">
          <option  :class="{ active: index === currentIndex }"
                   :key="index"
                   v-for="(product,index) in productData" :value="product.id">{{product.name}}</option>
        </select>
      </div>
    </form>


    <button class="badge badge-danger mr-2"
            @click="deleteSupplier"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
            @click="updateSupplier"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Supplier...</p>
  </div>
</template>

<script>
import Suplierservice from "../../services/suplierservice";
import Productservice from "../../services/productservice";
import SuppliersproductsService from "../../services/supplierproductservice";

export default {
  name: "suppliers",
  data() {
    return {
      productData: [],
      supplyData: [],
      currentSupplier: null,
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
    retrieveSuppliers() {
      Suplierservice.getAll()
          .then(response => {
            this.supplyData = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getSupplier(id) {
      SuppliersproductsService.get(id)
          .then(response => {
            this.currentSupplier = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateSupplier() {
      SuppliersproductsService.update(this.editId, this.currentSupplier)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteSupplier() {
      SuppliersproductsService.delete(this.currentSupplier.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "suppliers" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getSupplier(this.$route.params.id);
    this.editId = this.$route.params.id
    this.retrieveSuppliers();
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
