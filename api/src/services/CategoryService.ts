import Category from "../models/Category";

/**
 * Service class for managing Category operations.
 */
class CategoryService {
  /**
   * Creates a new category.
   * @param {string} category_name - The name of the category to be created.
   * @returns {Promise<Category>} The newly created category instance.
   */
  static async createCategory(category_name: string) {
    return await Category.create({ category_name });
  }

  /**
   * Retrieves all categories from the database.
   * @returns {Promise<Category[]>} A list of all category instances.
   */
  static async getAllCategories() {
    return await Category.findAll();
  }

  /**
   * Retrieves a category by its primary key (ID).
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<Category | null>} The category instance if found, or null if not found.
   */
  static async getCategoryById(id: string) {
    return await Category.findByPk(id);
  }

  /**
   * Updates an existing category's name by ID.
   * @param {string} id - The ID of the category to update.
   * @param {string} category_name - The new name for the category.
   * @returns {Promise<Category | null>} The updated category instance, or null if not found.
   */
  static async updateCategory(id: string, category_name: string) {
    const category = await Category.findByPk(id);
    if (!category) return null;

    category.category_name = category_name;
    await category.save();
    return category;
  }

  /**
   * Deletes a category by its ID.
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<boolean>} Returns true if the category was deleted, false if not found.
   */
  static async deleteCategory(id: string) {
    const category = await Category.findByPk(id);
    if (!category) return false;

    await category.destroy();
    return true;
  }
}

export default CategoryService;
