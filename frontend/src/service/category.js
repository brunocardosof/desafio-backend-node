import http from "./api";

class CategoryService {
  index(data) {
    return http.get("/category", data);
  }
  store(data) {
    return http.post("/category", data);
  }
}

export default new CategoryService();