const express = require('express');
const router = express.Router();

const PlayerBusiness = require('../business/playerBusiness');

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('api works');
});

router.post('/action/getPlayer', function(err, res) {
	PlayerBusiness.getPlayerByName(data, res);
});

router.post('/action/updatePlayer', function(err, res) {
	PlayerBusiness.updatePlayer(data, res);
});

router.post('/action/insertPlayer', function(err, res) {
	PlayerBusiness.insertPlayer(data, res);
});


module.exports = router;