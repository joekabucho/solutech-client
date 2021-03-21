import http from "../http-common";

class OrdersDetailsService {
    getAll() {
        return http.get("/orderdetails");
    }

    get(id) {
        return http.get(`/orderdetails/${id}`);
    }

    create(data) {
        return http.post("/orderdetails", data);
    }

    update(id, data) {
        return http.put(`/orderdetails/${id}`, data);
    }

    delete(id) {
        return http.delete(`/orderdetails/${id}`);
    }

    deleteAll() {
        return http.delete(`/orderdetails`);
    }

    findByTitle(title) {
        return http.get(`/orderdetails?name=${title}`);
    }
}

export default new OrdersDetailsService();


