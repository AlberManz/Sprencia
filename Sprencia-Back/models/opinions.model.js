const getByActivityId = (activityId) => {
    return db.query('select o.opinion, u.name, o.activity_id from sprencia.opinions as o inner join users as u on o.user_id = u.id where o.activity_id = ?', [activityId])
}





const getGeneralSprencia = () => {
    return db.query('select * from sprencia.opinions where activity_id is null ')
}



module.exports = { getGeneralSprencia, getByActivityId };