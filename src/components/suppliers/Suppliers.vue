<template>
  <div v-if="currentSupplier" class="edit-form">
    <h4>Suppliers</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentSupplier.name"
        />
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

export default {
  name: "suppliers",
  data() {
    return {
      currentSupplier: null,
      message: ''
    };
  },
  methods: {
    getSupplier(id) {
      Suplierservice.get(id)
          .then(response => {
            this.currentSupplier = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateSupplier() {
      Suplierservice.update(this.editId, this.currentSupplier)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteSupplier() {
      Suplierservice.delete(this.currentSupplier.id)
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

  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
