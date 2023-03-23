const router = require('express').Router()

const { getAll } = require('../../models/cities.model');

// **** GET ****

// Conseguimos todas las ciudades
router.get('/', async (req, res) => {
  try {
    const [result] = await getAll();
    res.json(result);

  } catch (err) {
    res.json({ error: err.message });
  }
});



module.exports = router;