import { Request, Response } from "express";
import ProductImageService from "../services/ProductImageService";

/**
 * Controller class for managing Product Image-related HTTP requests.
 */
class ProductImageController {
  /**
   * Handles the upload of a product image and stores its reference in the database.
   * @param {Request} req - The HTTP request object containing `product_id` in the body and the image file in `req.file`.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 201 status with the uploaded image details and URL or a 400/500 error.
   */
  static async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      const { product_id } = req.body;
      const file = req.file;

      if (!product_id || !file) {
        res
          .status(400)
          .json({ message: "Product ID and image file are required." });
        return;
      }

      const image = await ProductImageService.uploadImage(
        product_id,
        file.path
      );

      res.status(201).json({
        message: "Image uploaded successfully",
        image,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/images/${
          file.filename
        }`,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: err.message || "Failed to upload image.",
      });
    }
  }

  /**
   * Retrieves a product image by its ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the image details or a 404 error if not found.
   */
  static async getImageById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const image = await ProductImageService.getImageById(id);

    if (!image) {
      res.status(404).json({ message: "Image not found." });
      return;
    }

    res.status(200).json(image);
  }

  /**
   * Retrieves all product images with pagination.
   * @param {Request} req - The HTTP request object containing query parameters `page` and `limit`.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with paginated image details.
   */
  static async getAllImages(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10 } = req.query;

    const { count, rows: images } = await ProductImageService.getAllImages(
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );

    const totalPages = Math.ceil(count / parseInt(limit as string, 10));

    res.status(200).json({
      currentPage: parseInt(page as string, 10),
      totalPages,
      totalItems: count,
      images,
    });
  }

  /**
   * Deletes a product image by its ID, removing both the file and its database record.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status if the image is successfully deleted or a 404/500 error if deletion fails.
   */
  static async deleteImage(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await ProductImageService.deleteImage(id);
      res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
      const err = error as Error;
      if (err.message === "Image not found.") {
        res.status(404).json({ message: "Image not found." });
      } else {
        res
          .status(500)
          .json({ message: err.message || "Failed to delete image." });
      }
    }
  }
}

export default ProductImageController;
