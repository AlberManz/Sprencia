const getByActivityId = (activityId) => {
  return db.query('select * from images where activity_id = ?', [activityId]);
}

const insertImages = (activity_id, images) => {
  return db.query('insert into images (activity_id, url) values (?, ?)', [activity_id, `${images}`])
}

module.exports = {
  getByActivityId,
  insertImages
}
