import http from "./api";

class SaleService {
  saleProduct(data) {
    return http.post("/sale", data);
  }
}

export default new SaleService();