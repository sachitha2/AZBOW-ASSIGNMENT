import fs from "fs/promises";
import path from "path";
import ProductImage from "../models/ProductImage";
import Product from "../models/Product";

/**
 * Service class for managing product images.
 */
class ProductImageService {
  /**
   * Uploads a new product image and stores its reference in the database.
   * @param {string} product_id - The ID of the product to associate with the image.
   * @param {string} filePath - The file path of the uploaded image.
   * @returns {Promise<ProductImage>} The created product image instance.
   */
  static async uploadImage(product_id: string, filePath: string) {
    return await ProductImage.create({
      product_id,
      image_url: `/uploads/images/${path.basename(filePath)}`, // Store relative path
    });
  }

  /**
   * Retrieves a product image by its ID, including associated product details.
   * @param {string} id - The ID of the product image.
   * @returns {Promise<ProductImage | null>} The product image instance if found, or null.
   */
  static async getImageById(id: string) {
    return await ProductImage.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["product_name", "product_id"],
        },
      ],
    });
  }

  /**
   * Retrieves all product images with pagination, including associated product details.
   * @param {number} page - The current page number.
   * @param {number} limit - The maximum number of images per page.
   * @returns {Promise<{ count: number, rows: ProductImage[] }>} 
   * An object containing the total count and rows of product images.
   */
  static async getAllImages(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return await ProductImage.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["product_name"],
        },
      ],
    });
  }

  /**
   * Deletes a product image by its ID, removes the file from storage, and the record from the database.
   * @param {string} id - The ID of the product image to delete.
   * @throws {Error} If the image is not found or file deletion fails.
   * @returns {Promise<boolean>} Returns true if the image was successfully deleted.
   */
  static async deleteImage(id: string) {
    const image = await ProductImage.findByPk(id);
    if (!image) throw new Error("Image not found.");

    // Construct the full file path
    const imagePath = path.resolve(__dirname, "../../", image.image_url);

    // Delete the image file
    await fs.unlink(imagePath).catch((err) => {
      throw new Error("Failed to delete image file.");
    });

    // Remove the database record
    await image.destroy();
    return true;
  }
}

export default ProductImageService;
