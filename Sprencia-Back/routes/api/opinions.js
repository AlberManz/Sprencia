const router = require('express').Router();

const { getGeneralSprencia, getByActivityId } = require('../../models/opinions.model');


router.get('/:activityId', async (req, res) => {
    const { activityId } = req.params;
    try {
        const [result] = await getGeneralSprencia(activityId);

        if (result === null) {

            return res.json({ fatal: 'No es una opinion general' })
        }
        res.json(result[0]);

    } catch (err) {
        res.json(err.message);
    }
});




router.get('/activity/:opinionsId', async (req, res) => {
    const { opinionsId } = req.params;

    try {
        const [result] = await getByActivityId(opinionsId);
        console.log(result)
        if (result.length === 0) {
            return res.json({ fatal: 'No hay opinion con ese ID' });
        }
        res.json(result);

    } catch (err) {
        res.json(err.message);
    }
});






module.exports = router;