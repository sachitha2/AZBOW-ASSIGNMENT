import ProductDetails from "../models/ProductDetails";
import Product from "../models/Product";

/**
 * Service class for managing Product Details operations.
 */
class ProductDetailsService {
  /**
   * Retrieves all product details, including associated product information.
   * @returns {Promise<ProductDetails[]>} A list of all product details with product name and price.
   */
  static async getAllProductDetails() {
    return await ProductDetails.findAll({
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["product_name", "price"], // Include specific fields from Product
        },
      ],
    });
  }

  /**
   * Retrieves product details for a specific product by its ID.
   * @param {string} product_id - The ID of the product.
   * @returns {Promise<ProductDetails | null>} The product details instance if found, or null.
   */
  static async getProductDetailsById(product_id: string) {
    return await ProductDetails.findOne({
      where: { product_id },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["product_name", "price"],
        },
      ],
    });
  }

  /**
   * Creates new product details for a specific product.
   * @param {{ product_id: string, product_description: string, directions?: string }} data 
   *   - The data needed to create product details.
   * @throws {Error} If the product with the given ID does not exist.
   * @returns {Promise<ProductDetails>} The newly created product details instance.
   */
  static async createProductDetails(data: { product_id: string; product_description: string; directions?: string }) {
    const { product_id, product_description, directions } = data;

    // Ensure product exists
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Product not found.");

    return await ProductDetails.create({ product_id, product_description, directions });
  }

  /**
   * Updates product details for a specific product by its ID.
   * @param {string} product_id - The ID of the product.
   * @param {{ product_description?: string, directions?: string }} data 
   *   - The updated fields for product details.
   * @throws {Error} If the product details are not found.
   * @returns {Promise<ProductDetails>} The updated product details instance.
   */
  static async updateProductDetails(
    product_id: string,
    data: { product_description?: string; directions?: string }
  ) {
    const { product_description, directions } = data;

    // Find product details by product_id
    const detail = await ProductDetails.findOne({ where: { product_id } });
    if (!detail) throw new Error("Product details not found.");

    // Update fields if provided
    if (product_description !== undefined) detail.product_description = product_description;
    if (directions !== undefined) detail.directions = directions;

    await detail.save();
    return detail;
  }

  /**
   * Deletes product details for a specific product by its ID.
   * @param {string} product_id - The ID of the product.
   * @throws {Error} If the product details are not found.
   * @returns {Promise<boolean>} Returns true if the product details were deleted successfully.
   */
  static async deleteProductDetails(product_id: string) {
    const detail = await ProductDetails.findOne({ where: { product_id } });
    if (!detail) throw new Error("Product details not found.");

    await detail.destroy();
    return true;
  }
}

export default ProductDetailsService;
