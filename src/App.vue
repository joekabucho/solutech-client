<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Solutech</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/order-details" class="nav-link">Order Details</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/suppliers" class="nav-link">Suppliers</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/supplier-products" class="nav-link">Supplier Products</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
