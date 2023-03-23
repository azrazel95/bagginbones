// importing router and the models
const router = require('express').Router();
const { Category, Product } = require('../../models');


//get all categories
router.get('/', async (req, res) => {
  try {
    // include the product model
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    // returns all the categories and its associated products
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // include the associated products
      include: [{ model: Product }]
    });
    //if no category is found, respond
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    //else respond with the category
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//creates a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a category by id
router.put('/:id', async (req, res) => {
  
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: { id: req.params.id }
      })
      // if no category found, respond
    if (!categoryData) {
      req.status(404).json({ message: 'No category found with that id.' })
    }
    //else
    res.status(200).json("category updated!");
  } catch (err) {
    res.status(400).json(err);
  }
});
//delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
      
    });
    //if no category found, respond
    if (!categoryData) {
      res.status(404).json({ message: 'no category with this id!' });
      return;
    } //else respond with category deleted
    res.status(200).json(`category deleted!`);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
