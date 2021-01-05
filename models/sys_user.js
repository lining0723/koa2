const db = require('../db');

module.exports = db.defineModel('sys_user', {
  id: db.ID,
  user_name: db.STRING(100),
  mobile: db.STRING(32),
  create_time: db.DATE,
});

