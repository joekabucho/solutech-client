import Api from "./Api";

class SuppliersService {
  getAll() {
    return Api().get("/suppliers");
  }

  get(id) {
    return Api().get(`/suppliers/${id}`);
  }

  create(data) {
    return Api().post("/suppliers", data);
  }

  update(id, data) {
    return Api().put(`/suppliers/${id}`, data);
  }

  delete(id) {
    return Api().delete(`/suppliers/${id}`);
  }

  deleteAll() {
    return Api().delete(`/suppliers`);
  }

  findByTitle(title) {
    return Api().get(`/suppliers?name=${title}`);
  }
}

export default new SuppliersService();
