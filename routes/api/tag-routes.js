//importing our routers and models
const router = require('express').Router();
const { Tag, Product } = require('../../models');


//gets all tags
router.get('/', async (req, res) => {
 
  try {
    const tagData = await Tag.findAll({
      //includes associated products
      include: [{ model: Product }]
    });
    //responds with all tags
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//gets tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // includes associated products
      include: [{ model: Product }]
    });
    //if no tag found, respond
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    //else respond
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//creates new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//updates tag
router.put('/:id', async (req, res) => {
  try{
    //finds tag to update by id and updates the name
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: { id: req.params.id }
      })
      //if no tag is found, respond
    if (!tagData)
    {
      req.status(404).json({message: 'No tag found with that id.'})
    }
    //else respond
    res.status(200).json(tagData);
  } catch (err)
  {
    res.status(400).json(err);
  }
});
//deletes tag
router.delete('/:id', async (req, res) => {
  try {
    //find tag by id
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    //if no tag is found, respond
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    //else respond
    res.status(200).json("tag deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
