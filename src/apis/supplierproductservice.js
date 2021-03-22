import Api from "./Api";

class SuppliersproductsService {
  getAll() {
    return Api().get("/supplierproducts");
  }

  get(id) {
    return Api().get(`/supplierproducts/${id}`);
  }

  create(data) {
    return Api().post("/supplierproducts", data);
  }

  update(id, data) {
    return Api().put(`/supplierproducts/${id}`, data);
  }

  delete(id) {
    return Api().delete(`/supplierproducts/${id}`);
  }

  deleteAll() {
    return Api().delete(`/supplierproducts`);
  }

  findByTitle(title) {
    return Api().get(`/supplierproducts?name=${title}`);
  }
}

export default new SuppliersproductsService();
