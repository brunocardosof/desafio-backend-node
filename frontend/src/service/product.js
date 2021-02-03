import http from "./api";

class ProductService {
  index(data) {
    return http.get("/product", data);
  }
  store(data) {
    return http.post("/product", data);
  }
}

export default new ProductService();