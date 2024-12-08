import { Request, Response } from "express";
import ProductDetailsService from "../services/ProductDetailsService";

/**
 * Controller class for managing Product Details-related HTTP requests.
 */
class ProductDetailsController {
  /**
   * Retrieves all product details, including associated product information.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the list of product details.
   */
  static async getAllProductDetails(req: Request, res: Response): Promise<void> {
    const details = await ProductDetailsService.getAllProductDetails();
    res.status(200).json(details);
  }

  /**
   * Retrieves product details by product ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with product details or a 404 error if not found.
   */
  static async getProductDetailsById(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Assume id is product_id
    const detail = await ProductDetailsService.getProductDetailsById(id);

    if (!detail) {
      res.status(404).json({ message: "Product details not found." });
      return;
    }

    res.status(200).json(detail);
  }

  /**
   * Creates new product details for a specific product.
   * @param {Request} req - The HTTP request object containing `product_id`, `product_description`, and optional `directions` in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 201 status with the newly created product details.
   */
  static async createProductDetails(req: Request, res: Response): Promise<void> {
    const { product_id, product_description, directions } = req.body;

    if (!product_id || !product_description) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const newDetails = await ProductDetailsService.createProductDetails({
      product_id,
      product_description,
      directions,
    });

    res.status(201).json(newDetails);
  }

  /**
   * Updates product details for a specific product by its ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter and updated fields in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the updated product details.
   */
  static async updateProductDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Assume id is product_id
    const { product_description, directions } = req.body;

    const updatedDetail = await ProductDetailsService.updateProductDetails(id, {
      product_description,
      directions,
    });

    res.status(200).json(updatedDetail);
  }

  /**
   * Deletes product details for a specific product by its ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with a success message after deletion.
   */
  static async deleteProductDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Assume id is product_id

    await ProductDetailsService.deleteProductDetails(id);

    res.status(200).json({ message: "Product details deleted successfully." });
  }
}

export default ProductDetailsController;
