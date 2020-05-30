//declare model
const admin = require('../models/admin.model');

//controller module
exports.postAdminDangnhap = (req, res) => {
    admin.getAdminById(1, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);

    })
}

exports.getAdmin = (req, res) => {
    admin.getAdmin((err, data) => {
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