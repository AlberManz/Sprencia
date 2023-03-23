const router = require('express').Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/avatar' });
const fs = require('fs');


const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { sendEmail } = require('../../helpers/sendEmail');

const { createToken } = require('../../helpers/utils');
const { create, getByEmail, changePassword, getActivityBooked, getById, getActivityDone, createAdmin } = require('../../models/users.model');

// **** GET ****

// Datos usuario
router.get('/profile/:userId',
  checkToken,
  async (req, res) => {
    const { userId } = req.params

    try {
      const [result] = await getById(userId);
      res.json(result);

    } catch (err) {
      res.json({ error: err.message });
    }
  });

// Actividades reservadas por el usuario
router.get('/activities-booked/:userId',
  checkToken,
  async (req, res) => {
    const { userId } = req.params

    try {
      const [result] = await getActivityBooked(userId)
      res.json(result)
    } catch (err) {
      res.json({ error: err.message })
    }
  });

// Actividades realizadas por el usuario
router.get('/activities-done/:userId',
  checkToken,
  async (req, res) => {
    const { userId } = req.params

    try {
      const [result] = await getActivityDone(userId)
      res.json(result)
    } catch (err) {
      res.json({ error: err.message })
    }
  });

// **** POST ****

// Creamos un nuevo usuario
router.post('/register',
  upload.single('avatar'),
  async (req, res) => {
    // Dentro de req.body recibimos todos los datos del nuevo usuario
    // Encriptamos password
    req.body.password = bcrypt.hashSync(req.body.password, 9);

    // Se crea el registro con los datos de la petición o devolvemos el error
    try {
      const extension = req.file.mimetype.split('/')[1];
      const newPath = `${req.file.path}.${extension}`;
      fs.renameSync(req.file.path, newPath);
      req.body.avatar = `${req.file.filename}.${extension}`;
      console.log(req.body)

      const [result] = await create(req.body);
      res.json(result);
    } catch (err) {
      res.json({ error: err.message });
    }
  });

// Creamos un admin
router.post('/create-admin',
  checkToken,
  checkAdmin,
  async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 9);

    try {
      const [result] = await createAdmin(req.body);
      res.json(result);
    } catch (err) {
      res.json({ error: err.message });
    }
  });

// Acceso de usuarios ya registrados
router.post('/login', async (req, res) => {
  // Destructuring extrayendo email y password de req.body
  const { email, password } = req.body;

  // Si el email existe nos devolverá un array con un user
  const [result] = await getByEmail(email);

  // Gestión de error en caso de que el email no exista (array vacío)
  if (result.length === 0) {
    return res.json({ error: 'Error en email y/o contraseña' });
  }

  // Recuperamos el usuario
  const user = result[0];
  console.log(user)

  // Comparamos las password
  const equals = bcrypt.compareSync(password, user.password);

  if (!equals) {
    return res.json({ error: 'Error en email y/o contraseña' });
  }

  // Login y creación de token
  res.json({
    success: 'Login correcto',
    token: createToken(user),
    role: user.role,
    id: user.id
  });
});

// Acceso a solicitud cambio de contraseña
router.post('/forget-password', async (req, res) => {
  // Extraemos el email de req.body
  const { email } = req.body;

  // Buscamos el email por id y lo guardamos
  const [result] = await getByEmail(email);
  // Comprobamos que no venga vacío
  if (result.length === 0) {
    return res.json({ error: 'Email incorrecto' })
  }
  // Se envía el mail al correo que solicita recuperar la contraseña
  sendEmail(email);

  res.json({
    success: 'Correo enviado',
    email: email
  })
});


// **** PUT ****

// Acceso al cambio de contraseña
router.put('/reset-password', async (req, res) => {
  const { email } = req.body;

  const [result] = await getByEmail(email);

  if (result.length === 0) {
    return res.json({ error: 'Error en email y/o contraseña' });
  }

  // Guardamos en una variable el email
  const user = result[0];

  // Encriptamos la nueva password
  req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 9);

  try {
    // Insertamos la información asociada a un id
    const [result] = await changePassword(user.id, req.body);
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;