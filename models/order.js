const db = require('../db');

module.exports = db.defineModel('sal_sales_order', {
  id: db.ID,
  sales_code: db.STRING(30),
  operate_person: db.STRING(32),
  contact_man: db.STRING(30),
  real_amount: db.DECIMAL(20, 8),
  create_time: db.DATE,
});
