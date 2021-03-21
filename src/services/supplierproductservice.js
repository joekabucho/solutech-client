import http from "../http-common";

class SuppliersproductsService {
    getAll() {
        return http.get("/supplierproducts");
    }

    get(id) {
        return http.get(`/supplierproducts/${id}`);
    }

    create(data) {
        return http.post("/supplierproducts", data);
    }

    update(id, data) {
        return http.put(`/supplierproducts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/supplierproducts/${id}`);
    }

    deleteAll() {
        return http.delete(`/supplierproducts`);
    }

    findByTitle(title) {
        return http.get(`/supplierproducts?name=${title}`);
    }
}

export default new SuppliersproductsService();
