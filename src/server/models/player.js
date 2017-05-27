const mongoose = require('moongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number, 
        required: true
    }
});

module.export = mongoose.model('Player', schema);
