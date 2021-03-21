const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({ 
      include: [
        {
          model: Product,
          attributes: ['id','product_name','price','stock','category_id']
        },
        // {
        //   model: ProductTag,
        //   attributes: ['id', 'product_id','tag_id']
        // },
      ],
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json (err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


  // find a single tag by its `id`
//   // be sure to include its associated Product data
// router.get('/:id', async (req, res) => {
//   try{
//     const tagData = await Tag.findByPK(req.params.id, { 
//       include: [
//         {
//           model: Product,
//           attributes: ['id','product_name','price','stock','category_id']
//         },
//         // {
//         //   model: ProductTag,
//         //   attributes: ['id', 'product_id','tag_id']
//         // },
//       ],
//   });
//   if(!tagData) {
//     res.status(404).json({message: 'No tag found this this id!'});
//     return;
//   };
//     res.status(200).json(tagData);
//     } catch (err) {
//     res.status(500).json (err);
//     }
// });

  // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
});

 // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData){
        res.status(404).json({message:'No tag found with this id!'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
