const Player = require('../models/player');

var getPlayerByName = (data, res) => {
    console.log('data', data);
    var playerName = data.playerName;
    Player.find({name: playerName}, function(err, response) {
        console.log('error', err);
        console.log('response', response);
        if (err) { //error
             return res.json({
                message: 'An error occurred',
                error: err
            })
        } else { //got player
            return res.json({
                message: 'Success',
                obj: response
            })
        }
    });
};

var upsertPlayer = (data, res) => {
    var player = data.player;
    var newPoints = data.points;

    Player.findByIdAndUpdate(playerId, player, {upsert: true}, function(err, response){
        if (err) { //error
            return res.json({
                message: 'An error occurred',
                error: err
            })
        } else { //update user
            return res.json({
                message: 'Success',
                obj: response
            })
        }
    });
};

module.exports = {
    "getPlayerByName": getPlayerByName,
    "upsertPlayer": upsertPlayer
}