const db = require('../config/db');

const createUser = (name, email, password, role = 'reader', plan = 'free') => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password, role, plan) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, password, role, plan], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  createUser,
};
