const ModelLog = require("../../models/ModelLog");

function logUpdatedModel(user, table, data,oldData) {
    const modelLog = new ModelLog({
      user: user,
      table: table,
      type:'update',
      data: data,
      oldData:oldData,
      timestamp: new Date(),
    });
    modelLog.save();
  }

  module.exports = logUpdatedModel