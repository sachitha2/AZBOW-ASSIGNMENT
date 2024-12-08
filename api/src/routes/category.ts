import { Router } from "express";
import CategoryController from "../controllers/categoryController";
import { validateCategory, validateCategoryId } from "../middleware/validators";
import { handleValidationErrors } from "../middleware/errorHandler";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

/**
 * Category Routes
 * 
 * This router manages all CRUD operations for categories.
 * Each route is associated with middleware for validation, error handling, and asynchronous execution.
 */

/**
 * @route GET /
 * @description Fetch all categories.
 * @access Public
 */
router.get("/", asyncHandler(CategoryController.getAllCategories));

/**
 * @route POST /
 * @description Create a new category.
 * @access Public
 * @middleware validateCategory - Validates category creation payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.post(
  "/",
  validateCategory,
  handleValidationErrors,
  asyncHandler(CategoryController.createCategory)
);

/**
 * @route GET /:id
 * @description Fetch a single category by ID.
 * @access Public
 * @middleware validateCategoryId - Validates the category ID parameter.
 */
router.get(
  "/:id",
  validateCategoryId,
  asyncHandler(CategoryController.getCategoryById)
);

/**
 * @route PUT /:id
 * @description Update an existing category by ID.
 * @access Public
 * @middleware validateCategoryId - Validates the category ID parameter.
 * @middleware validateCategory - Validates category update payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.put(
  "/:id",
  validateCategoryId,
  validateCategory,
  handleValidationErrors,
  asyncHandler(CategoryController.updateCategory)
);

/**
 * @route DELETE /:id
 * @description Delete a category by ID.
 * @access Public
 * @middleware validateCategoryId - Validates the category ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.delete(
  "/:id",
  validateCategoryId,
  handleValidationErrors,
  asyncHandler(CategoryController.deleteCategory)
);

export default router;
