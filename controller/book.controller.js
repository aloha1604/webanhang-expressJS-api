//declare model
const book = require('../models/book.model');

//controller module
exports.getAllBook = (req, res) => {
    book.getAllBook((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);

    })
}


//module test
exports.test = (req, res) => {
    res.send('aaaaa');
}