import http from "./api";

class AuthService {
  signin(data) {
    return http.post("/auth/signin", data);
  }
}

export default new AuthService();