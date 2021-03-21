import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/products",
            name: "products",
            component: () => import("./components/products/ProductsList")
        },
        {
            path: "/products/:id",
            name: "products-details",
            component: () => import("./components/products/Products")
        },
        {
            path: "/add-products",
            name: "add-products",
            component: () => import("./components/products/AddProducts")
        },
        {
            path: "/orders",
            alias: "/orders",
            name: "orders",
            component: () => import("./components/orders/OrdersList")
        },
        {
            path: "/orders/:id",
            name: "orders-details",
            component: () => import("./components/orders/Orders")
        },
        {
            path: "/add-orders",
            name: "add-orders",
            component: () => import("./components/orders/AddOrders")
        },
        {
            path: "/suppliers",
            alias: "/suppliers",
            name: "suppliers",
            component: () => import("./components/suppliers/SuppliersList")
        },
        {
            path: "/suppliers/:id",
            name: "suppliers-details",
            component: () => import("./components/suppliers/Suppliers")
        },
        {
            path: "/add-suppliers",
            name: "add-suppliers",
            component: () => import("./components/suppliers/AddSuppliers")
        },
        {
            path: "/supplier-products",
            alias: "/supplier-products",
            name: "supplier-products",
            component: () => import("./components/supplier-products/SupplierProductsList")
        },
        {
            path: "/supplier-products/:id",
            name: "supplier-products-details",
            component: () => import("./components/supplier-products/SupplierProducts")
        },
        {
            path: "/add-supplier-products",
            name: "add-supplier-products",
            component: () => import("./components/supplier-products/AddSupplierProducts")
        },

        {
            path: "/order-details",
            alias: "/order-details",
            name: "order-details",
            component: () => import("./components/order-details/OrderDetailsList")
        },
        {
            path: "/order-details/:id",
            name: "order-details",
            component: () => import("./components/order-details/OrderDetails")
        },
        {
            path: "/add-order-details",
            name: "add-order-details",
            component: () => import("./components/order-details/AddOrderDetails")
        }
    ]
});
