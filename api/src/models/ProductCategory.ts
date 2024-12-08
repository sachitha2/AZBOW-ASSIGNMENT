import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProductCategoryAttributes {
  product_id: string;
  category_id: number;
}

class ProductCategory extends Model<ProductCategoryAttributes> implements ProductCategoryAttributes {
  public product_id!: string;
  public category_id!: number;

  static initModel(sequelize: Sequelize) {
    ProductCategory.init(
      {
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: 'ProductCategory',
        tableName: 'product_categories',
        timestamps: false,
      }
    );
  }
}

export default ProductCategory;
