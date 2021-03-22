import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddOrderDetails from "../views/AddOrderDetails.vue";
import AddOrders from "../views/AddOrders.vue";
import AddSupplierProducts from "../views/AddSupplierProducts.vue";
import AddSuppliers from "../views/OrderDetails.vue";
import OrderDetailsList from "../views/OrderDetailsList.vue";
import Orders from "../views/Orders.vue";
import SupplierProducts from "../views/SupplierProducts.vue";
import SupplierProductsList from "../views/SupplierProductsList.vue";
import Suppliers from "../views/Suppliers.vue";
import SuppliersList from "../views/SuppliersList.vue";
import ProductsList from "../views/ProductsList.vue";
import Products from "../views/Products.vue";
import Dashboard from "../views/Dashboard.vue";
import AddProducts from "@/views/AddProducts";
import OrdersList from "@/views/OrdersList";
import OrderDetails from "@/views/OrderDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { authOnly: true }
  },
  {
    path: "/products",
    name: "products",
    component: ProductsList,
    meta: { authOnly: true }
  },
  {
    path: "/products/:id",
    name: "products-details",
    component: Products,
    meta: { authOnly: true }
  },
  {
    path: "/add-products",
    name: "add-products",
    component: AddProducts,
    meta: { authOnly: true }
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersList,
    meta: { authOnly: true }
  },
  {
    path: "/orders/:id",
    name: "orders-details",
    component: Orders,
    meta: { authOnly: true }
  },
  {
    path: "/add-orders",
    name: "add-orders",
    component: AddOrders,
    meta: { authOnly: true }
  },
  {
    path: "/suppliers",
    name: "suppliers",
    component: SuppliersList,
    meta: { authOnly: true }
  },
  {
    path: "/suppliers/:id",
    name: "suppliers-details",
    component: Suppliers,
    meta: { authOnly: true }
  },
  {
    path: "/add-suppliers",
    name: "add-suppliers",
    component: AddSuppliers,
    meta: { authOnly: true }
  },
  {
    path: "/supplier-products",
    name: "supplier-products",
    component: SupplierProductsList,
    meta: { authOnly: true }
  },
  {
    path: "/supplier-products/:id",
    name: "supplier-products-details",
    component: SupplierProducts,
    meta: { authOnly: true }
  },
  {
    path: "/add-supplier-products",
    name: "add-supplier-products",
    component: AddSupplierProducts,
    meta: { authOnly: true }
  },

  {
    path: "/order-details",
    name: "order-details",
    component: OrderDetailsList,
    meta: { authOnly: true }
  },
  {
    path: "/order-details/:id",
    name: "order-details",
    component: OrderDetails,
    meta: { authOnly: true }
  },
  {
    path: "/add-order-details",
    name: "add-order-details",
    component: AddOrderDetails,
    meta: { authOnly: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
