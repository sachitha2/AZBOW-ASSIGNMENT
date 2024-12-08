import { Router } from "express";
import categoryRoutes from "./category"; // Import category routes
import productRoutes from "./product"; // Import product routes
import productDetailsRoutes from "./productDetails"; // Import product details routes
import productImagesRoutes from "./productImages"; // Import product images routes

const router = Router();

/**
 * Main Router
 * 
 * This router aggregates all the route modules for the application and attaches them
 * under specific base paths. Each module manages its respective resources.
 * 
 * Base Paths:
 * - `/categories`       -> Category-related routes
 * - `/products`         -> Product-related routes
 * - `/product-details`  -> Product details-related routes
 * - `/product-images`   -> Product images-related routes
 */

/**
 * @route /categories
 * @description Routes for category management.
 */
router.use("/categories", categoryRoutes);

/**
 * @route /products
 * @description Routes for product management.
 */
router.use("/products", productRoutes);

/**
 * @route /product-details
 * @description Routes for managing product details.
 */
router.use("/product-details", productDetailsRoutes);

/**
 * @route /product-images
 * @description Routes for managing product images.
 */
router.use("/product-images", productImagesRoutes);

export default router;
