var express = require('express');
var router = express.Router();

// Load User model
const Game = require("../models/Game");

// GET request
// Getting all the users
router.get("/", function(req, res) {
    Game.find(function(err, games) {
        if (err) {
            console.log(err);
        } else {
            res.json(games);
        }
    })
});

// put a game in the database

router.post("/add", (req, res) => {
    const newGame = new Game({
        gameName: req.body.gameName,
        url: req.body.url,
        author: req.body.author,
        pubDate: req.body.pubDate
    });

    newGame.save()
    .then(game => {
        res.status(200).json(game);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

// find a game by id and update it

router.post("/update/:id", (req, res) => {
    Game.findById(req.params.id, function(err, game) {
        if (!game) {
            res.status(404).send("data is not found");
        } else {
            game.gameName = req.body.gameName;
            game.url = req.body.url;
            game.author = req.body.author;
            game.pubDate = req.body.pubDate;

            game.save().then(game => {
                res.json(game);
            })
            .catch(err => {
                console.log(err);
            });
        }
    });
});

// find a game by id and delete it

router.delete("/delete/:id", (req, res) => {
    Game.findByIdAndRemove(req.params.id, function(err, game) {
        if (err) {
            console.log(err);
        } else {
            res.json(game);
        }
    });
});





module.exports = router