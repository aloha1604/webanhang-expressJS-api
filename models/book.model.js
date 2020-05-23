//declare con (conection database to do something)
const con = require("./db");


// module to do 
exports.getAllBook = (result) => {
    const sql = "SELECT * FROM book";
    con.query(sql, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        // console.log("books :", res);
        result(null, res);
    })
}