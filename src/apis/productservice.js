import Api from "./Api";

class ProductsService {
  getAll() {
    return Api().get("/products");
  }

  get(id) {
    return Api().get(`/products/${id}`);
  }

  create(data) {
    return Api().post("/products", data);
  }

  update(id, data) {
    return Api().put(`/products/${id}`, data);
  }

  delete(id) {
    return Api().delete(`/products/${id}`);
  }

  deleteAll() {
    return Api().delete(`/products`);
  }

  findByTitle(title) {
    return Api().get(`/products?name=${title}`);
  }
}

export default new ProductsService();
