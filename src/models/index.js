// by Rafael Balestrini 25/11/2020
// This file combine our models into a single JavaScript module. While this isn’t 
// strictly necessary, it's a good pattern to follow as this application and its
// database models grow.

const License = require('./license');
const User = require('./user');
const Status = require('./status');

const models = {
  License,
  User,
  Status
};

module.exports = models;
