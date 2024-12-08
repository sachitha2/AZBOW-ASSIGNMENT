import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Product from './Product';

interface ProductImageAttributes {
  image_id: number;
  product_id: string;
  image_url: string;
}

interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'image_id'> {}

class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public image_id!: number;
  public product_id!: string;
  public image_url!: string;

  static initModel(sequelize: Sequelize) {
    ProductImage.init(
      {
        image_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'ProductImage',
        tableName: 'product_images',
        timestamps: false,
      }
    );
  }
}

export default ProductImage;
