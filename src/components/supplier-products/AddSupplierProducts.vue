<template>
  <div class="submit-form">
    <div v-if="!submitted">
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
          <option :class="{ active: index === currentIndex }"
                  :key="index"
                  v-for="(product,index) in productData" :value="product.id">{{product.name}}</option>
        </select>
      </div>

      <button @click="saveSuppliers" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSuppliers">Add</button>
    </div>
  </div>
</template>

<script>
import Suplierservice from "../../services/suplierservice";
import Productservice from "../../services/productservice";
import SuppliersproductsService from "../../services/supplierproductservice";

export default {
  name: "add-suppliers",
  data() {
    return {
      productData: [],
      supplyData: [],
      suppliers: {
        supply_id: "",
        order_id: "",

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
    saveSuppliers() {
      var data = {
        supply_id: this.suppliers.supply_id,
        product_id: this.suppliers.product_id,

      };

      SuppliersproductsService.create(data)
          .then(response => {
            this.suppliers.id = response.suppliers.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newSuppliers() {
      this.submitted = false;
      this.orders = {};
    },
    mounted() {
      this.retrieveSuppliers();
      this.retrieveProducts();
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
