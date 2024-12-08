import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";

/**
 * Controller class for managing Category-related HTTP requests.
 */
class CategoryController {
  /**
   * Handles the creation of a new category.
   * @param {Request} req - The HTTP request object containing `category_name` in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 201 status with the newly created category or a 400 error.
   */
  static async createCategory(req: Request, res: Response): Promise<void> {
    const { category_name } = req.body;
    if (!category_name) {
      res.status(400).json({ message: "Category name is required." });
      return;
    }

    const newCategory = await CategoryService.createCategory(category_name);
    res.status(201).json(newCategory);
    return;
  }

  /**
   * Handles retrieval of all categories.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with a list of categories.
   */
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
    return;
  }

  /**
   * Handles retrieval of a single category by ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the category or a 404 error if not found.
   */
  static async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await CategoryService.getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json(category);
    return;
  }

  /**
   * Handles updating an existing category by ID.
   * @param {Request} req - The HTTP request object containing `id` in route params and `category_name` in the body.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status with the updated category or a 404 error if not found.
   */
  static async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { category_name } = req.body;

    const updatedCategory = await CategoryService.updateCategory(id, category_name);
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json(updatedCategory);
    return;
  }

  /**
   * Handles deleting a category by ID.
   * @param {Request} req - The HTTP request object containing `id` as a route parameter.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} Sends a 200 status if deleted or a 404 error if not found.
   */
  static async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const success = await CategoryService.deleteCategory(id);
    if (!success) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully." });
    return;
  }
}

export default CategoryController;
