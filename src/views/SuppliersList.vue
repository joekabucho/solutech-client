<template>
  <div class="list row home col-8 mx-auto py-5 mt-5">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
      <button class="m-3 btn btn-sm btn-success">
        <router-link to="/add-suppliers" class="nav-link">Add</router-link>
      </button>
    </div>
    <div class="col-md-6">
      <h4>Suppliers List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(supplier, index) in suppliers"
          :key="index"
          @click="setActiveSupplier(supplier, index)"
        >
          {{ supplier.name }}
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
          <label><strong>Name:</strong></label> {{ currentSupplier.name }}
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
        <p>Please click on a Supplier...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Suplierservice from "../apis/suplierservice";

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
      Suplierservice.getAll()
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
      Suplierservice.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      Suplierservice.findByTitle(this.name)
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
