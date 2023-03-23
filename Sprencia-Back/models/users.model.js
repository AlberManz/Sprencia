//Seleccionar por id
const getById = (userId) => {
  return db.query('SELECT * FROM sprencia.users where id = ?', [userId]);
}

// Seleccionar por actividades reservadas por usuario
const getActivityBooked = (userId) => {
  return db.query('SELECT a.title FROM sprencia.users as u inner join activities as a on u.activity_id_booked = a.id where u.id = ?',
    [userId])
}

// Seleccionar por actividades hechas por usuario
const getActivityDone = (userId) => {
  return db.query('SELECT a.title FROM sprencia.users as u inner join activities as a on u.activity_id_done = a.id where u.id = ?',
    [userId])
}

//Seleccionar por role
const getByRole = (role) => {
  return db.query('select * from users where role = ?', [role]);
};

//Traer nombre por role
const getNameByRole = () => {
  return db.query('select * from sprencia.users name where role = ?', [role]);
};

// Recuperar por email
const getByEmail = (email) => {
  return db.query('select * from users where email = ?', [email]);
};

//Crear un usuario
const create = ({ name, surname, email, password, city, birth_date, role = 'regular', avatar }) => {
  return db.query(
    'insert into users (name, surname, email, password, city, birth_date, role, avatar) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, surname, email, password, city, birth_date, role, avatar]
  );
};

const createAdmin = ({ name, surname, email, password, city, birth_date, role = 'admin' }) => {
  return db.query(
    'insert into users (name, surname, email, password, city, birth_date, role) values (?, ?, ?, ?, ?, ?, ?)',
    [name, surname, email, password, city, birth_date, role]
  );
};

// Establecer la nueva contraseña
const changePassword = (id, { newPassword }) => {
  return db.query('update users set password = ? where id = ?', [newPassword, id]);
};



module.exports = {
  getActivityBooked,
  getActivityDone,
  getById,
  create,
  createAdmin,
  getByEmail,
  changePassword,
  getByRole,
  getNameByRole
};