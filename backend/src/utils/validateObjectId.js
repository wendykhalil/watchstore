const mongoose = require("mongoose");

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ID format: ${id}`);
  }
};

module.exports = validateObjectId;
