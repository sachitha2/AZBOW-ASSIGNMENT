import sequelize from '../config/db';
import Category from './Category';
import Product from './Product';
import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';
import ProductCategory from './ProductCategory';

// Initialize all models
Category.initModel(sequelize);
Product.initModel(sequelize);
ProductDetails.initModel(sequelize);
ProductImage.initModel(sequelize);
ProductCategory.initModel(sequelize);

// Export models and sequelize instance
export { sequelize, Category, Product, ProductDetails, ProductImage, ProductCategory };
