//Realizamos las query

//Función que recibe todas los actividades
const getAll = () => {
	return db.query('select a.*, ca.category, c.city from sprencia.activities as a inner join cities as c on c.id = a.city_id inner join categories as ca on ca.id = a.category_id where a.id order by price asc');
}

//Función que recibe una sola actividad por su ID
const getById = (activityId) => {
	return db.query('select a.*, ca.category, c.city from sprencia.activities as a inner join cities as c on c.id = a.city_id inner join categories as ca on ca.id = a.category_id where a.id = ?',
		[activityId]);
}

// Query para conseguir el límite de 20 actividades en home
const getByPage = (page, limit) => {
	// Transformamos a entero los valores page y limit que en req.query vienen como string
	page = parseInt(page);
	limit = parseInt(limit);
	return db.query('select * from activities order by likes desc limit ? offset ?',
		[limit, (page - 1) * limit])
}


const getShift = () => {
	return db.query('select distinct shift from activities')
}

const getIdByCategoryName = (category) => {
	return db.query('select ca.id from categories as ca where ca.category = ?',
		[category]);
}

const getIdByCityName = (city) => {
	return db.query('select ci.id from cities as ci where ci.city = ?',
		[city]);
}

//Función que crea una nueva actividad con todos los campos necesarios
const create = ({ title, description, resume, price, shift, category_id, city_id }) => {
	return db.query(
		'insert into activities (title, description, resume, price, shift, category_id, city_id) values (?, ?, ?, ?, ?, ?, ?)',
		[title, description, resume, price, shift, category_id, city_id]
	);
}

const count = () => {
	return db.query('select count(*) as count from activities');
}

module.exports = {
	getAll,
	getById,
	getByPage,
	getShift,
	getIdByCategoryName,
	getIdByCityName,
	create,
	count
};