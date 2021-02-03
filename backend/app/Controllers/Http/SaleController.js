'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sales_Product = use("App/Models/Sales_Product");
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

  async index({ request, params }) {
    return await Sales_Product
      .query()
      .with('product', (builder) => {
        builder.select('id', 'product_id', 'name', 'stock_balance', 'image_id');
      })
      .with('product.categories')
      .fetch();
  }

  async sale({ request, response }) {
    const dataForSale = request.only(['date', 'user_id']);
    const propertiesForSalesProduct = request.post();

    this.product_id = propertiesForSalesProduct.product_id;
    this.product_quantity = propertiesForSalesProduct.quantity;

    //Check if product have on stock
    await this.getStockBalance();

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
          sale_id: result.id,
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
        sale_id: data.sale_id,
        product_id: data.product_id,
        quantity: data.quantity,
        total_price: data.total_price,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
      });
  }

  async getStockBalance() {
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
  async addStockBalance() {
    const stockForSave = this.stock + this.product_quantity;
    return await Database
      .table('products')
      .where('id', this.product_id)
      .update('stock_balance', stockForSave);
  }

  async cancelSale({ params, response }) {
    this.product_id = params.id;

    await this.getStockBalance();

    const sale = await Sale.findOrFail(params.id);
    if (!sale) return sale;

    const sales_product = await Database
      .table('sales_products')
      .select('quantity')
      .where('sale_id', params.id);
    this.product_quantity = sales_product[0].quantity;

    this.addStockBalance();

    return response.status(200).json(await sale.delete());
  }

}

module.exports = SaleController;
