import http from "./api";

class CategoryService {
  store(data) {
    return http.post("/category", data);
  }
}

export default new CategoryService();