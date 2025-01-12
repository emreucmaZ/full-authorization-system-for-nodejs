const ModelLog = require("../../models/ModelLog");

function logModelWithActionType(user, table, object,actionType) {
    const modelLog = new ModelLog({
      user: user,
      table: table,
      data:object,
      type:actionType,
      timestamp: new Date(),
    });
    modelLog.save();
  }

  module.exports = logModelWithActionType