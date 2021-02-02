'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sale = use("App/Models/Sale");
const Database = use('Database');

/**
 * Resourceful controller for interacting with sales
 */
class SaleController {
  async sale({ request, response }) {
    const dataForSale = request.only(['date', 'user_id']);
    const propertiesForSalesProduct = request.post();
    await Sale.create(dataForSale)
      .then((result) => {
        const dataForSalesProduct = {
          sales_id: result.id,
          product_id: propertiesForSalesProduct.product_id,
          quantity: propertiesForSalesProduct.quantity,
          total_price: propertiesForSalesProduct.total_price,
        };
        this.salesProduct(dataForSalesProduct);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }

  async salesProduct(data) {
    return await Database
      .table('sales_products')
      .insert({
        sales_id: data.sales_id,
        product_id: data.product_id,
        quantity: data.quantity,
        total_price: data.total_price,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
      });
  }

}

module.exports = SaleController;
