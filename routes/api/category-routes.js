const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    params: ["id", "category_name"],
    include: [
      {
        model: Product,
        params: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    params: ["id", "category_name"],
    include: [
      {
        model: Product,
        params: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with this id! " });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
