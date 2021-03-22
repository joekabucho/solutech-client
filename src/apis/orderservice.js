import Api from "./Api";

class OrdersService {
  getAll() {
    return Api().get("/orders");
  }

  get(id) {
    return Api().get(`/orders/${id}`);
  }

  create(data) {
    return Api().post("/orders", data);
  }

  update(id, data) {
    return Api().put(`/orders/${id}`, data);
  }

  delete(id) {
    return Api().delete(`/orders/${id}`);
  }

  deleteAll() {
    return Api().delete(`/orders`);
  }

  findByTitle(title) {
    return Api().get(`/orders?name=${title}`);
  }
}

export default new OrdersService();
