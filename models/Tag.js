// import sequelize requirements
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
//setting up our class
class Tag extends Model { }

Tag.init(
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
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    //sequelize model settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
