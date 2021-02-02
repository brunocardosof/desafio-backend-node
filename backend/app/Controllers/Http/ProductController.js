'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use("App/Models/Product");
const Database = use('Database');

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  async index({ request, response }) {
    const query = request.get();
    return await Database
      .from('products')
      .paginate(query.page, 10);
  }
  async store({ request, response }) {
    const data = request.post();
    const productAlreadyExists = await Product.findBy('name', data.name);
    if (productAlreadyExists) {
      return response.status(409).json({ message: 'Product Already Exists' });
    }
    await Product.create(data)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        if (error.code === 'ER_NO_REFERENCED_ROW_2')
          return response.status(409).json({ message: "foreign key error" });
        return response.status(400).json(error);
      });
  }
  async update({ params, request, response }) {
    const product = await Product.firstOrFail(params.id);
    const data = request.post();
    product.merge(data);
    await product.save()
      .then((result) => {
        if (!result) return response.status(202).json({ message: 'Nothing has been updated' });
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }
  async destroy({ params, request, response }) {
    const salesProduct = await this.checkSalesProduct(params.id);
    if (salesProduct !== 0)
      return response.status(409).json({
        message: `product ${params.id} have a sales order`
      });

    const product = await Product.findOrFail(params.id);
    if (!product) return product;
    return response.status(200).json(await product.delete());
  }
  async changeStockBalance({ params, request, response }) {
    const product = await Database
      .from('products')
      .select('stock_balance')
      .where('id', params.id);
    const data = request.post();
    const stockFromDB = product[0].stock_balance;
    let result = 0;
    if (data.type === "add") {
      result = stockFromDB + data.stock_balance;
    } else {
      result = stockFromDB - data.stock_balance;
    }
    return await Database
      .table('products')
      .where('id', params.id)
      .update('stock_balance', result);

  }
  async checkSalesProduct(product_id) {
    const sales_product = await Database
      .table('sales_products')
      .select('product_id')
      .where('product_id', product_id);
    return sales_product.length;
  }
}

module.exports = ProductController;
