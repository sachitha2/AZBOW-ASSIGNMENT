import { Router } from "express";
import ProductController from "../controllers/productController";
import {
  validateProductCreation,
  validateProductUpdate,
  validateProductId,
  validatePagination,
} from "../middleware/validators";
import { handleValidationErrors } from "../middleware/errorHandler";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

/**
 * Product Routes
 *
 * This router handles all operations related to products,
 * including creation, retrieval, update, and deletion of products.
 * It also includes validation and error handling middleware.
 */

/**
 * @route GET /
 * @description Fetch all products with optional pagination.
 * @access Public
 * @middleware validatePagination - Validates query parameters for pagination.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.get(
  "/",
  validatePagination,
  handleValidationErrors,
  asyncHandler(ProductController.getAllProducts)
);

/**
 * @route GET /:id/details
 * @description Fetch detailed information about a product by its ID.
 * @access Public
 * @middleware validateProductId - Validates the product ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.get(
  "/:id/details",
  validateProductId,
  handleValidationErrors,
  asyncHandler(ProductController.getProductDetailsById)
);

/**
 * @route POST /
 * @description Create a new product.
 * @access Public
 * @middleware validateProductCreation - Validates the product creation payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.post(
  "/",
  validateProductCreation,
  handleValidationErrors,
  asyncHandler(ProductController.createProduct)
);

/**
 * @route PUT /:id
 * @description Update an existing product by its ID.
 * @access Public
 * @middleware validateProductId - Validates the product ID parameter.
 * @middleware validateProductUpdate - Validates the product update payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.put(
  "/:id",
  validateProductId,
  validateProductUpdate,
  handleValidationErrors,
  asyncHandler(ProductController.updateProduct)
);

/**
 * @route DELETE /:id
 * @description Delete a product by its ID.
 * @access Public
 * @middleware validateProductId - Validates the product ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.delete(
  "/:id",
  validateProductId,
  handleValidationErrors,
  asyncHandler(ProductController.deleteProduct)
);

export default router;
