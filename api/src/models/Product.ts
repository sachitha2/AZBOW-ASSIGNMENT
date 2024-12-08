import { DataTypes, Model, Sequelize, Optional, BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin } from 'sequelize';
import Category from './Category';

interface ProductAttributes {
  product_id: string;
  product_name: string;
  price: number;
  in_stock: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'product_id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public product_id!: string;
  public product_name!: string;
  public price!: number;
  public in_stock!: number;

  // Sequelize association mixins for many-to-many relationships
  public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
  public setCategories!: BelongsToManySetAssociationsMixin<Category, number>;

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        product_id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        product_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        in_stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
        hooks: {
          async beforeCreate(product) {
            const maxProduct = await Product.findOne({
              order: [['product_id', 'DESC']],
            });
  
            const nextId = maxProduct
              ? parseInt(maxProduct.product_id.substring(1)) + 1
              : 1;
            product.product_id = `P${nextId.toString().padStart(3, '0')}`;
          },
        },
      }
    );
  }
}

export default Product;
