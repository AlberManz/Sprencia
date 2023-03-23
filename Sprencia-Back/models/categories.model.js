const getAll = () => {
  return db.query('select * from categories');
};

module.exports = {
  getAll
};