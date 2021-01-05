const db = require('../db');

module.exports = db.defineModel('people', {
    id: db.ID,
    name: db.STRING(50),
    age: db.BIGINT(8),
    createTime: db.DATE(0),
    creatorName: db.STRING(50),
});
