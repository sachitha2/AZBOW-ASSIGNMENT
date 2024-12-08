import { Router } from "express";
import ProductDetailsController from "../controllers/productDetailsController";
import { handleValidationErrors } from "../middleware/errorHandler";
import {
  validateProductDetailsCreation,
  validateProductDetailsUpdate,
  validateProductId,
} from "../middleware/validators";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

/**
 * Product Details Routes
 *
 * This router handles operations related to product details, such as creation,
 * retrieval, updating, and deletion. Validation and error handling middleware
 * are applied for request integrity.
 */

/**
 * @route GET /
 * @description Fetch all product details.
 * @access Public
 */
router.get("/", asyncHandler(ProductDetailsController.getAllProductDetails));

/**
 * @route GET /:id
 * @description Fetch product details by product ID.
 * @access Public
 * @middleware validateProductId - Validates the product ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.get(
  "/:id",
  validateProductId,
  handleValidationErrors,
  asyncHandler(ProductDetailsController.getProductDetailsById)
);

/**
 * @route POST /
 * @description Create new product details for a specific product.
 * @access Public
 * @middleware validateProductDetailsCreation - Validates the product details creation payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.post(
  "/",
  validateProductDetailsCreation,
  handleValidationErrors,
  asyncHandler(ProductDetailsController.createProductDetails)
);

/**
 * @route PUT /:id
 * @description Update product details for a specific product ID.
 * @access Public
 * @middleware validateProductDetailsUpdate - Validates the product details update payload.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.put(
  "/:id",
  validateProductDetailsUpdate,
  handleValidationErrors,
  asyncHandler(ProductDetailsController.updateProductDetails)
);

/**
 * @route DELETE /:id
 * @description Delete product details by product ID.
 * @access Public
 * @middleware validateProductId - Validates the product ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.delete(
  "/:id",
  validateProductId,
  handleValidationErrors,
  asyncHandler(ProductDetailsController.deleteProductDetails)
);

export default router;
