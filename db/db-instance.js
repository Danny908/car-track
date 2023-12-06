const sqlite3 = require('sqlite3').verbose();

function ERROR_CATALOG(key, value) {
  const catalog = {
    'UNIQUE constraint failed': {
      value,
      status: 400,
      get message() {
        return `${value} already exist.`;
      },
      'NOT NULL constraint failed': {
        value,
        status: 400,
        get message() {
          return `${value} cannot be null.`;
        },
      },
    },
  };

  return catalog[key];
}

class DBInstance {
  get db() {
    const _db = new sqlite3.Database(
      `${__dirname}/cartrack.db`,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.log('ERROR WHEN TRYING TO CONNECT TO DATABASE: ', err);
          return;
        }
        console.log('SUCCESSFULLY CONNECTED TO DATABASE');
      }
    );
    _db.get('PRAGMA foreign_keys = ON');
    _db.get('PRAGMA case_sensitive_like = true');
    return _db;
  }

  handleError(err, value = '') {
    const key = err.message.split(':')[1].trim();
    return ERROR_CATALOG(key, value) || err;
  }
}

module.exports = DBInstance;
