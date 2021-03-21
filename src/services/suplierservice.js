import http from "../http-common";

class SuppliersService {
    getAll() {
        return http.get("/suppliers");
    }

    get(id) {
        return http.get(`/suppliers/${id}`);
    }

    create(data) {
        return http.post("/suppliers", data);
    }

    update(id, data) {
        return http.put(`/suppliers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/suppliers/${id}`);
    }

    deleteAll() {
        return http.delete(`/suppliers`);
    }

    findByTitle(title) {
        return http.get(`/suppliers?name=${title}`);
    }
}

export default new SuppliersService();
