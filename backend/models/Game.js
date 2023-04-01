const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GameSchema = new Schema({
    gameName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pubDate: {
        type: String,
        required: false
    }
});

module.exports = Game = mongoose.model("game", GameSchema);