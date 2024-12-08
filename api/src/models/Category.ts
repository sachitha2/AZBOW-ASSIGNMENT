import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CategoryAttributes {
  category_id: number;
  category_name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'category_id'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public category_id!: number;
  public category_name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Category.init(
      {
        category_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        category_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true,
      }
    );
  }
}

export default Category;
