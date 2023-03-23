const create = ({ name, email, web, city, activity, category_id, comment, number }) => {
  return db.query('insert into contacto_empresas (name, email, web, city, activity, category_id, comment, number) values (?,?,?,?,?,?,?,?)', [name, email, web, city, activity, category_id, comment, number])
}

module.exports = {
  create
}