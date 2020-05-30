//declare con (conection database to do something)
const con = require("./db");

// module to do 
exports.getAdminById = (adminId, result) => {
    const sql = `SELECT * FROM admin where admin_id=${adminId}`;
    con.query(sql, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        console.log("books :", res);
        result(null, res);
    })
}

exports.getAdmin = (result) => {
    const sql = "SELECT * FROM admin";
    con.query(sql, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        console.log("admin :", res);
        result(null, res);
    })
}