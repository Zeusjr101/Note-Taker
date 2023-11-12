const router = require('express').Router();

const saveDB = require('../db/save_db');

router.get('/notes', (req, res) => {
saveDB
    .getnotes()
    .then((notes) => {
    return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));

    
});

module.exports = router;