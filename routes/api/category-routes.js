const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      //includes its associated Products
      include: [{
        model: Product,
        as: 'products'
      }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //includes its associated Products
      include: [{
        model: Product,
        as: 'products'
      }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({category_name: req.body.category_name});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name 
      }, 
      {
        where: {
          id: req.params.id
        }
      });

      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      } 

    res.status(200).json({ message: 'Category updated successfully', categoryData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({
        message: 'No Category found with this id.'
      });
      return;
    };

    res.status(200).json({message: 'Category deleted successfully!',categoryData})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
