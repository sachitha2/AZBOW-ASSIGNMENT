import { Router } from "express";
import ProductImageController from "../controllers/productImageController";
import upload from "../middleware/multerConfig";
import { asyncHandler } from "../middleware/asyncHandler";
import { handleValidationErrors } from "../middleware/errorHandler";
import { validateImageUpload, validateImageId } from "../middleware/validators";

const router = Router();

/**
 * Product Images Routes
 *
 * This router manages operations related to product images, including uploading,
 * retrieving, and deleting images. Middleware is used for validation, error handling,
 * and handling file uploads using Multer.
 */

/**
 * @route POST /
 * @description Upload a new product image.
 * @access Public
 * @middleware upload.single("image") - Handles single file upload.
 * @middleware validateImageUpload - Validates the uploaded image data.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.post(
  "/",
  upload.single("image"),
  validateImageUpload,
  handleValidationErrors,
  asyncHandler(ProductImageController.uploadImage)
);

/**
 * @route GET /:id
 * @description Retrieve a product image by its ID.
 * @access Public
 * @middleware validateImageId - Validates the image ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.get(
  "/:id",
  validateImageId,
  handleValidationErrors,
  asyncHandler(ProductImageController.getImageById)
);

/**
 * @route GET /
 * @description Retrieve all product images with optional pagination.
 * @access Public
 */
router.get("/", asyncHandler(ProductImageController.getAllImages));

/**
 * @route DELETE /:id
 * @description Delete a product image by its ID.
 * @access Public
 * @middleware validateImageId - Validates the image ID parameter.
 * @middleware handleValidationErrors - Handles validation errors if any.
 */
router.delete(
  "/:id",
  validateImageId,
  handleValidationErrors,
  asyncHandler(ProductImageController.deleteImage)
);

export default router;
