<template>
  <div class="list row home col-8 mx-auto py-5 mt-5">
    <div class="col-md-8">
      <button class="m-3 btn btn-sm btn-success">
        <router-link to="/add-supplier-products" class="nav-link"
          >Add</router-link
        >
      </button>
    </div>
    <div class="col-md-6">
      <h4>Suppliers Products List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(supplier, index) in suppliers"
          :key="index"
          @click="setActiveSupplier(supplier, index)"
        >
          {{ supplier.supply_id }}
          {{ supplier.product_id }}
          <button
            class="m-3 btn btn-sm btn-danger"
            @click="removeSupplier(supplier.id)"
          >
            Remove All
          </button>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentSupplier">
        <h4>Name</h4>
        <div>
          <label><strong>Supplier id:</strong></label>
          {{ currentSupplier.supply_id }}
          <label><strong>Product id:</strong></label>
          {{ currentSupplier.product_id }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/suppliers/' + currentSupplier.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Supplier Product...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Supplierproductservice from "../apis/supplierproductservice";

export default {
  name: "suppliers-list",
  data() {
    return {
      suppliers: [],
      currentSupplier: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveSuppliers() {
      Supplierproductservice.getAll()
        .then(response => {
          this.suppliers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSuppliers();
      this.currentSupplier = null;
      this.currentIndex = -1;
    },

    setActiveSupplier(supplier, index) {
      this.currentSupplier = supplier;
      this.currentIndex = index;
    },

    removeSupplier(id) {
      Supplierproductservice.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      Supplierproductservice.findByTitle(this.name)
        .then(response => {
          this.suppliers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveSuppliers();
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
