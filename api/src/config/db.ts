import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME || 'shop_app', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'root', {
  host: process.env.DB_HOST || 'localhost',
  port: 9008,
  dialect: 'mariadb',
  logging: false,
});

export default sequelize;