const { checkToken } = require('../helpers/middlewares');
const { checkRole } = require('../helpers/middlewares')
const router = require('express').Router();

router.use('/activities', require('./api/activities'));
router.use('/users', require('./api/users'));
router.use('/categories', require('./api/categories'));
router.use('/cities', require('./api/cities'));
router.use('/opinions', require('./api/opinions'));
router.use('/contacto_empresas', require('./api/contacto_empresas'))
module.exports = router;