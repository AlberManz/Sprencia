const router = require('express').Router();

const { getIdByCategoryName } = require('../../models/activities.model');
const { create } = require('../../models/contacto_empresas.model');


router.post('/', async (req, res) => {
  const getCategoryId = await getIdByCategoryName(req.body.category)
  req.body.category_id = getCategoryId[0][0].id
  try {
    const response = create(req.body);
    res.json(response);
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;