const getAll = () => {
  return db.query('select * from cities');
};

module.exports = {
  getAll
};