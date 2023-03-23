// import sequelize requirements
const { Model, DataTypes } = require('sequelize');
//importing the settings from config
const sequelize = require('../config/connection');

// setting up our class
class Product extends Model { }


Product.init(
  {
    //self incrementing id, cascades on deletion, primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onDelete: 'CASCADE'
    },
    //the name, must exist
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      //price, with a validation to ensure it is a decimal
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      //stock count of the item, with a validation to ensure it is a number and a defaultvalue of 10
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      //foreignkey category id
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
        unique: false,
      }
    }
  },
  {
    //sequelize model settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
