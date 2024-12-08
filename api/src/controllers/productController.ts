import { Request, Response } from "express";
import ProductService from "../services/ProductService";

/**
 * Controller class for managing Product-related HTTP requests.
 */
class ProductController {
  /**
   * Retrieves a product by its ID, including associated categories, details, and images.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the product or a 404 error if not found.
   */
  static async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    res.status(200).json(product);
  }

  /**
   * Retrieves detailed information about a product by its ID, including categories, details, and images.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with product details or a 404 error if not found.
   */
  static async getProductDetailsById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await ProductService.getProductDetailsById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    res.status(200).json(product);
  }

  /**
   * Retrieves a paginated list of all products, optionally filtered by category ID.
   * @param {Request} req - The HTTP request object containing query parameters: `page`, `limit`, and optional `category_id`.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with paginated product data.
   */
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10, category_id } = req.query;
    const { count, rows: products } = await ProductService.getAllProducts(
      parseInt(page as string),
      parseInt(limit as string),
      category_id as string
    );

    res.status(200).json({
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(count / parseInt(limit as string)),
      totalItems: count,
      itemsPerPage: parseInt(limit as string),
      products,
    });
  }

  /**
   * Creates a new product with the given details and associates it with categories.
   * @param {Request} req - The HTTP request object containing product details in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 201 status with the newly created product.
   */
  static async createProduct(req: Request, res: Response): Promise<void> {
    const { product_name, price, in_stock, category_ids } = req.body;

    if (!product_name || price === undefined || in_stock === undefined) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const product = await ProductService.createProduct({ product_name, price, in_stock, category_ids });
    res.status(201).json(product);
  }

  /**
   * Updates an existing product by its ID with the provided details.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter and product details in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the updated product or a 404 error if not found.
   */
  static async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { product_name, price, in_stock, category_ids } = req.body;

    const updatedProduct = await ProductService.updateProduct(id, { product_name, price, in_stock, category_ids });

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    res.status(200).json(updatedProduct);
  }

  /**
   * Deletes a product by its ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status if the product was successfully deleted or a 404 error if not found.
   */
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const success = await ProductService.deleteProduct(id);

    if (!success) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully." });
  }
}

export default ProductController;
