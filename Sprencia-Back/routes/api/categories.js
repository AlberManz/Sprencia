const { getAll } = require('../../models/categories.model');

const router = require('express').Router()

// **** GET ****

// Conseguimos todas las categorías
router.get('/', async (req, res) => {
  try {
    const [result] = await getAll();
    res.json(result);

  } catch (err) {
    res.json({ error: err.message });
  }
})



module.exports = router;