import Api from "./Api";

class OrdersDetailsService {
  getAll() {
    return Api().get("/orderdetails");
  }

  get(id) {
    return Api().get(`/orderdetails/${id}`);
  }

  create(data) {
    return Api().post("/orderdetails", data);
  }

  update(id, data) {
    return Api().put(`/orderdetails/${id}`, data);
  }

  delete(id) {
    return Api().delete(`/orderdetails/${id}`);
  }

  deleteAll() {
    return Api().delete(`/orderdetails`);
  }

  findByTitle(title) {
    return Api().get(`/orderdetails?name=${title}`);
  }
}

export default new OrdersDetailsService();
