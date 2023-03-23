//imports the category model
const { Category } = require('../models');
//data for seed
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];
//seeds
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
