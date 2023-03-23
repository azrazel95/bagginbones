//importing our routers and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// gets all products
router.get('/',async  (req, res) => {
  try
  {
    const productData = await Product.findAll({
      // Includes the associated categories and tags
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } catch (err)
  {
    res.status(500).json(err);
  }
});

// get product by id
router.get('/:id', async (req, res) => {
  try
  {
    const productData = await Product.findByPk(req.params.id, {
      // Including categories and tags
      include: [{ model: Category }, { model: Tag }]
    });
    //if no product is found, respond
    if (!productData)
    {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    //else respond
    res.status(200).json(productData);
  } catch (err)
  {
    res.status(500).json(err);
  }
});

// creates a product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      //checks if there are any tags in the req.body
      if (req.body.tagIds.length) {
          //maps over the tags hidden within the req.body
        const productTags = req.body.tagIds.map((tag_id) => {
          return {
            //surveys the juicy tag meat hidden within the body
            product_id: product.id,
            tag_id,
          };
        });
        //creates new product tags out of the tag flesh harvested
        return ProductTag.bulkCreate(productTags)
        
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json("product created!"))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// updates product by id
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      // finds the associated product tags
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // maps over the array of product tags to receive tag ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // inserts the req.body tag ids into the updated product
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // removes the tags that are not within the new req.body
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // waits on the responses to move on
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })//then sends out response
    .then(res.json("product updated"))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
//deletes product by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id }
    });
    //if product is not found, respond
    if (!productData){
      res.status(404).json({ message: 'no product with this id!'});
      return;
      //else respond
    } res.status(200).json("product deleted!");
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
