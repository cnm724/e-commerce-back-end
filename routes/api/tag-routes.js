const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      //includes its associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        },
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      //includes its associated Product Data
      include: [{
        model: Product,
        through: ProductTag,
        as: 'products'
      }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(
      {
        tag_name: req.body.tag_name
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully', tagData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({
        message: 'No tag found with this id.'
      });
      return;
    };

    res.status(200).json({ message: 'tag deleted successfully!', tagData })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
