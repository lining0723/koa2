const db = require('../db');

module.exports = db.defineModel('error', {
  id: db.STRING(255),
  key: db.STRING(255),
  networkType:db.STRING(255),
  notifierVersion:db.STRING(255),
  latitude:db.DECIMAL(10,5),
  longitude:db.DECIMAL(10,5),
  locationInfoErrMsg:db.STRING(20),
});
