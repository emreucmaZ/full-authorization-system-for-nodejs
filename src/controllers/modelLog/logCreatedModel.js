const ModelLog = require("../../models/ModelLog");

function logCreatedModel(user, table, data) {
    const modelLog = new ModelLog({
      user: user,
      table: table,
      data: data,
      type:'create',
      timestamp: new Date(),
    });
    modelLog.save();
  }

  module.exports = logCreatedModel;