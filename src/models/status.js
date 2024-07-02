// Scripting by Rafael Balestrini
// Code needed to update status data to licenses from within the application.

const mongoose = require('mongoose');

const opts = { timestamps: true };

const statusSchema = new mongoose.Schema(
  {
    code: {type: Number, default: 10, required: true},
    description: {type: String},
    license: {type: mongoose.Schema.Types.ObjectId, ref: 'License', required: true}
  },
  opts
);

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
