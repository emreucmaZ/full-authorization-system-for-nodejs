const ModelLog = require("../../models/ModelLog");

function logDeletedModel(user, table, deletedObject) {
    const modelLog = new ModelLog({
      user: user,
      table: table,
      deletedData:deletedObject,
      type:'delete',
      timestamp: new Date(),
    });
    modelLog.save();
  }

  module.exports = logDeletedModel;