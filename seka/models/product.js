'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      image: DataTypes.STRING,
      number_of_sales: DataTypes.INTEGER,
      registerId: DataTypes.INTEGER,
      is_featured: DataTypes.BOOLEAN,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};