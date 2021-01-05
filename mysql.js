var ab = {};
var mysql = require('mysql');
var pool  = mysql.createConnection({
    dialect: 'mysql',
    database: 'test',
    username: 'root',
    password: '123',
    host: '111.229.92.56',
    port: 3306
});

ab.query = function(sql, callback){

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}

module.exports = ab;
