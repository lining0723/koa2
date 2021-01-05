const db = require('../db');

module.exports = db.defineModel('users', {
    id: db.ID,
    name: db.STRING(100),
    passwd: db.STRING(50),
    avatar: db.STRING(100),
    username: db.STRING(100),
});
