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

exports.getAdmin = async (req, res) => {
    var data = function () {
        return new Promise((resolve, reject) => {
            admin.getAdmin((err, data) => {
                if (err)
                    reject(err);
                else {
                    resolve(data);
                }

            })
        })
    }

    var a = await data();
    console.log(a);
    res.send(a);


}




//module test
exports.test = (req, res) => {
    res.send(process.env.VIETNAM);
}