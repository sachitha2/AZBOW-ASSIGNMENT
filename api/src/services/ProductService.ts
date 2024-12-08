import Product from "../models/Product";
import Category from "../models/Category";
import ProductDetails from "../models/ProductDetails";
import ProductImage from "../models/ProductImage";

/**
 * Service class for managing Product operations, including creation, retrieval, update, and deletion.
 */
class ProductService {
  /**
   * Retrieves a product by its ID, including associated categories, details, and images.
   * @param {string} id - The ID of the product.
   * @returns {Promise<Product | null>} The product instance if found, or null.
   */
  static async getProductById(id: string) {
    return await Product.findByPk(id, {
      include: [
        { model: Category, as: "categories", attributes: ["category_name"] },
        { model: ProductDetails, as: "details", attributes: ["product_description", "directions"] },
        { model: ProductImage, as: "images", attributes: ["image_url"] },
      ],
    });
  }

  /**
   * Retrieves product details for a product by its ID, including categories, details, and images.
   * (Alias for `getProductById`).
   * @param {string} id - The ID of the product.
   * @returns {Promise<Product | null>} The product instance if found, or null.
   */
  static async getProductDetailsById(id: string) {
    return await Product.findByPk(id, {
      include: [
        { model: Category, as: "categories", attributes: ["category_name"] },
        { model: ProductDetails, as: "details", attributes: ["product_description", "directions"] },
        { model: ProductImage, as: "images", attributes: ["image_url"] },
      ],
    });
  }

  /**
   * Retrieves a paginated list of all products, optionally filtered by category.
   * @param {number} page - The current page number.
   * @param {number} limit - The maximum number of products per page.
   * @param {string} [category_id] - (Optional) The category ID to filter products.
   * @returns {Promise<{ count: number, rows: Product[] }>} 
   * An object containing the total count and rows of products.
   */
  static async getAllProducts(page: number, limit: number, category_id?: string) {
    const offset = (page - 1) * limit;

    const whereCategory = category_id ? { category_id } : {};
    return await Product.findAndCountAll({
      distinct: true,
      limit,
      offset,
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["category_name"],
          where: whereCategory,
          required: !!category_id,
        },
        { model: ProductImage, as: "images", attributes: ["image_url"], limit: 1 },
      ],
    });
  }

  /**
   * Creates a new product and associates it with specified categories.
   * @param {{ product_name: string, price: number, in_stock: number, category_ids: number[] }} data 
   *   - The product details, including category IDs to associate.
   * @returns {Promise<Product>} The newly created product instance with categories.
   */
  static async createProduct(data: { product_name: string; price: number; in_stock: number; category_ids: number[] }) {
    const { product_name, price, in_stock, category_ids } = data;

    const newProduct = await Product.create({ product_name, price, in_stock });

    if (category_ids) {
      const categories = await Category.findAll({ where: { category_id: category_ids } });
      await newProduct.addCategories(categories);
    }

    return await Product.findByPk(newProduct.product_id, {
      include: [{ model: Category, as: "categories", attributes: ["category_id", "category_name"] }],
    });
  }

  /**
   * Updates an existing product's details and its associated categories.
   * @param {string} id - The ID of the product to update.
   * @param {{ product_name?: string, price?: number, in_stock?: number, category_ids?: number[] }} data 
   *   - The updated product details and category IDs.
   * @returns {Promise<Product | null>} The updated product instance if found, or null.
   */
  static async updateProduct(
    id: string,
    data: { product_name?: string; price?: number; in_stock?: number; category_ids?: number[] }
  ) {
    const { product_name, price, in_stock, category_ids } = data;

    const product = await Product.findByPk(id);
    if (!product) return null;

    if (product_name !== undefined) product.product_name = product_name;
    if (price !== undefined) product.price = price;
    if (in_stock !== undefined) product.in_stock = in_stock;

    await product.save();

    if (category_ids) {
      const categories = await Category.findAll({ where: { category_id: category_ids } });
      await product.setCategories(categories);
    }

    return await Product.findByPk(id, {
      include: [
        { model: Category, as: "categories", attributes: ["category_name"] },
        { model: ProductDetails, as: "details", attributes: ["product_description", "directions"] },
        { model: ProductImage, as: "images", attributes: ["image_url"] },
      ],
    });
  }

  /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<boolean>} Returns true if the product was successfully deleted, or false if not found.
   */
  static async deleteProduct(id: string) {
    const product = await Product.findByPk(id);
    if (!product) return false;

    await product.destroy();
    return true;
  }
}

export default ProductService;
