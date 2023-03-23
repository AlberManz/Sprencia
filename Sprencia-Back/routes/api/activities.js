const router = require('express').Router();
const multer = require('multer');
// Los archivos que se suban se meterán en la carpeta public/images
const upload = multer({ dest: 'public/images' });
// Requerimos fileSystem para poder trabajar con carpetas y archivos
const fs = require('fs');

const { create, getAll, getById, getByPage, count, getShift, getIdByCategoryName, getIdByCityName } = require('../../models/activities.model');
const { getByActivityId, insertImages } = require('../../models/imagenes.model');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');

// **** GET ****

//Esto nos muestra todos los actividades disponibles
router.get('/all', async (req, res) => {
  try {
    const [activities] = await getAll();

    // Recorremos el aray de activities para extraer su id y poder extraer las imágenes asociadas a ese id en la tabla images
    for (let activity of activities) {

      const images = await getByActivityId(activity.id);
      const urls = [];
      for (let image of images[0]) {
        const url = image.url;
        urls.push(url);
      }
      activity.images = urls;
    }

    res.json(activities);
  } catch (err) {
    res.json(err.message);
  }
});

// Todas las actividades paginadas y con límite
router.get('/', async (req, res) => {
  // Extraemos limit y page de req.query (transformados a entero en getByPage())
  const { limit = 20, page = 1 } = req.query;
  try {
    const [activities] = await getByPage(page, limit);

    // Recorremos el aray de activities para extraer su id y poder extraer las imágenes asociadas a ese id en la tabla images
    for (let activity of activities) {

      const images = await getByActivityId(activity.id);
      const urls = [];
      for (let image of images[0]) {
        const url = image.url;
        urls.push(url);
      }
      activity.images = urls;
    }

    // Nos da el número de elementos
    const [num] = await count();
    console.log(num)
    // Accedemos a la primera posición del array[0] y al objeto count
    const total = num[0].count;

    res.json({
      info: {
        current_page: parseInt(page),
        count: total,
        pages: Math.ceil(total / limit)
      },
      results: activities
    });

  } catch (err) {
    res.json(err.message)
  }
});

// Conseguimos únicamente los turnos de la actividades
router.get('/shift', async (req, res) => {
  try {
    const [result] = await getShift();
    res.json(result);

  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:activityId', async (req, res) => {
  const { activityId } = req.params;
  try {

    const [result] = await getById(activityId)
    // Si la actividad no existe nos saldrá un error
    if (result.length === 0) {
      return res.json({ error: 'No existe la actividad con ese Id' });
    }
    //recuperar las imagenes por activity.id
    const images = await getByActivityId(activityId);
    const urls = [];
    for (let image of images[0]) {
      console.log(image.url)
      const url = image.url;
      urls.push(url);
    }

    result[0].images = urls;


    res.json(result[0]);
  } catch (err) {
    res.json(err.message);
  }
});


// **** POST ****

// Creamos nuevas actividades
router.post('/',
  checkToken,
  checkAdmin,
  upload.array('images'),
  async (req, res) => {

    // Extraemos el id de categoría y city para su inserción en la BD
    const getCategoryId = await getIdByCategoryName(req.body.category)
    req.body.category_id = getCategoryId[0][0].id;

    const getCityId = await getIdByCityName(req.body.city)
    req.body.city_id = getCityId[0][0].id;

    try {

      let images = [];
      req.files.forEach((image) => {
        // Extraemos la extensión de la imagen
        const extension = image.mimetype.split('/')[1];
        // Agregamos la extensión al nombre de la imagen y ruta
        const newName = `${image.filename}.${extension}`;
        const newPath = `${image.path}.${extension}`;
        // Renombramos la antigua ruta
        fs.renameSync(image.path, newPath);
        // Añadimos las imágenes al array
        images.push(newName);
      });

      // Agregamos cada imagen al array "urls" y creamos la variable images en req.body que se llenará con los datos en el array urls
      const urls = [];
      for (let image of images) {
        urls.push(image)
      }
      req.body.images = urls

      // Creamos la actividad y recogemos el insertId el cual extraemos en una variable en req.body
      const response = await create(req.body);
      req.body.activity_id = response[0].insertId

      // Recorremos el array de imágenes y las vamos insertando en la tabla con su id de actividad correspondiente
      let result;
      for (let image of req.body.images) {
        result = await insertImages(req.body.activity_id, image)

      }
      res.json({ success: 'Actividad creada correctamente' });
    } catch (err) {
      res.json({ error: err.message });
    }
  });

module.exports = router;