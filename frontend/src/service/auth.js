import http from "./api";

class AuthService {
  signin(data) {
    return http.post("/auth/signin", data);
  }
  signup(data) {
    return http.post("/users", data);
  }
}

export default new AuthService();