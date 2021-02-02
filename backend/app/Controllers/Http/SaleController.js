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

  stock = 0;
  product_id = 0;
  product_quantity = 0;
  product_price = 0;

  async sale({ request, response }) {
    const dataForSale = request.only(['date', 'user_id']);
    const propertiesForSalesProduct = request.post();

    this.product_id = propertiesForSalesProduct.product_id;
    this.product_quantity = propertiesForSalesProduct.quantity;

    //Check if product have on stock
    await this.checkStockBalance();

    if (this.stock < 1) {
      return response.status(409).json({
        message: `stock 0 for this product with id ${this.product_id}`
      });
    }
    if (this.product_quantity > this.stock) {
      return response.status(409).json({ message: `the quantity of sale (${this.product_quantity}) is greater than have on stock balance (${this.stock})` });
    }

    Sale.create(dataForSale)
      .then(async (result) => {
        const dataForSalesProduct = {
          sales_id: result.id,
          product_id: propertiesForSalesProduct.product_id,
          quantity: propertiesForSalesProduct.quantity,
          total_price: this.price * propertiesForSalesProduct.quantity,
        };
        // Add de sales informations on sales_product table
        const salesProduct = await this.salesProduct(dataForSalesProduct);
        if (salesProduct) {
          // if have stock balance and sales is saved on sales_product information,
          // the stock balance of the product is subtracted
          const result = this.subtractStockBalance();
          return response.json(result);

        }
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

  async checkStockBalance() {
    const stock_balance = await Database
      .from('products')
      .select('stock_balance', 'price')
      .where('id', this.product_id);
    this.stock = stock_balance[0].stock_balance;
    this.price = stock_balance[0].price;
  }

  async subtractStockBalance() {
    const stockForSave = this.stock - this.product_quantity;
    return await Database
      .table('products')
      .where('id', this.product_id)
      .update('stock_balance', stockForSave);

  }

}

module.exports = SaleController;
