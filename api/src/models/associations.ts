import {
  Category,
  Product,
  ProductDetails,
  ProductImage,
  ProductCategory,
} from "./index";

export const initializeAssociations = () => {
  Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: "category_id",
    as: "products",
  });
  Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: "product_id",
    as: "categories",
  });

  Product.hasOne(ProductDetails, { foreignKey: "product_id", as: "details" });
  ProductDetails.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
  ProductImage.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });
};
