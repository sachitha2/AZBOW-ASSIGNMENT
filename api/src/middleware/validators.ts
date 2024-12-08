import { body, param, query } from "express-validator";

export const validateCategory = [
  body("category_name")
    .isString()
    .withMessage("Category name must be a string.")
    .notEmpty()
    .withMessage("Category name is required."),
];

export const validateCategoryId = [
  param("id").isInt().withMessage("Category ID must be an integer.").toInt(),
];

export const validateProductCreation = [
  body("product_name")
    .isString()
    .withMessage("Product name must be a string.")
    .notEmpty()
    .withMessage("Product name is required."),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0."),
  body("in_stock")
    .isInt({ min: 0 })
    .withMessage("In-stock quantity must be a non-negative integer."),
  body("category_ids")
    .optional()
    .isArray()
    .withMessage("Category IDs must be an array of numbers.")
    .custom((value) => {
      if (!value.every((id: number) => typeof id === "number")) {
        throw new Error("Category IDs array must contain only numbers.");
      }
      return true;
    }),
];

export const validateProductUpdate = [
  body("product_name")
    .optional()
    .isString()
    .withMessage("Product name must be a string."),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0."),
  body("in_stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("In-stock quantity must be a non-negative integer."),
  body("category_ids")
    .optional()
    .isArray()
    .withMessage("Category IDs must be an array of numbers.")
    .custom((value) => {
      if (!value.every((id: number) => typeof id === "number")) {
        throw new Error("Category IDs array must contain only numbers.");
      }
      return true;
    }),
];

// Validate product ID with the format P001, P002, etc.
export const validateProductId = [
  param("id")
    .matches(/^P\d{3}$/)
    .withMessage("Product ID must be in the format 'P001', 'P002', etc."),
];

export const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer."),
  query("category_id")
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer."),
];

export const validateProductDetailsCreation = [
    body("product_id")
      .matches(/^P\d{3}$/)
      .withMessage("Product ID must be in the format 'P001', 'P002', etc."),
    body("product_description")
      .isString()
      .withMessage("Product description must be a string.")
      .notEmpty()
      .withMessage("Product description is required."),
    body("directions")
      .optional()
      .isString()
      .withMessage("Directions must be a string."),
  ];
  
  export const validateProductDetailsUpdate = [
    param("id")
      .matches(/^P\d{3}$/)
      .withMessage("Product ID must be in the format 'P001', 'P002', etc."),
    body("product_description")
      .optional()
      .isString()
      .withMessage("Product description must be a string."),
    body("directions")
      .optional()
      .isString()
      .withMessage("Directions must be a string."),
  ];

  export const validateImageUpload = [
    body("product_id")
      .matches(/^P\d{3}$/)
      .withMessage("Product ID must be in the format 'P001', 'P002', etc."),
  ];
  
  export const validateImageId = [
    param("id").isInt().withMessage("Image ID must be an integer."),
  ];
