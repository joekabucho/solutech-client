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
          v-model="suppliers.name"
          name="name"
        />
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
import Suplierservice from "../apis/suplierservice";

export default {
  name: "add-suppliers",
  data() {
    return {
      suppliers: {
        name: ""
      },
      submitted: false
    };
  },
  methods: {
    saveSuppliers() {
      const data = {
        name: this.suppliers.name
      };

      Suplierservice.create(data)
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
