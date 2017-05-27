const Player = require('../models/player');

var getPlayerByName = (data, res) => {
    var playerName = data.name;

    this.findIfPlayerExists(playerName, function(err, response) {
        if (err) { //player does not exist

        } else { //return player

        }
    });
},

var updatePlayer = (data, res) => {
    var playerId = data.id;
    var newPoints = data.points;

    Player.findByIdAndUpdate(playerId, {point: newPoints}, function(err, player){
        if (err) { //error

        } else { //update user
            
        }
    });
},

var insertPlayer = (data, res) => {
    var playerName = data.name;
    var playerPoints = data.points;

    this.findIfPlayerExists(playerName, function(err, response) {
        if (err) {
            //player does not exist, create new
            var newPlayer = new Player({
                name: playerName,
                points: playerPoints
            });

            newPlayer.save(function(err) {
                if (err) { //error
                
                } else { //player was inserted

                }
            });
        } else { //player exists, error
            
        }
    });
    
}

findIfPlayerExists = (name, callback) => {
    Player.find({name: playerName}, function(err, player) {
        if (err) { //error
            throw err;
        } else { //got player
            return player;
        }
    });
}

module.exports = {
    "getPlayerByName": getPlayerByName,
    "updatePlayer": updatePlayer,
    "insertPlayer": insertPlayer
}