import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Product from './Product';

interface ProductDetailsAttributes {
  product_id: string;
  product_description: string;
  directions?: string;
}

interface ProductDetailsCreationAttributes extends Optional<ProductDetailsAttributes, 'directions'> {}

class ProductDetails extends Model<ProductDetailsAttributes, ProductDetailsCreationAttributes> implements ProductDetailsAttributes {
  public product_id!: string;
  public product_description!: string;
  public directions?: string;

  static initModel(sequelize: Sequelize) {
    ProductDetails.init(
      {
        product_id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        product_description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        directions: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'ProductDetails',
        tableName: 'product_details',
        timestamps: false,
      }
    );
  }
}

export default ProductDetails;
