//importing sequelize requirements
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
//setting up our class
class Category extends Model { }

Category.init(
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
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  //sequelize model settings
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
