const modelLogController = require("../../controllers/modelLog/modelLogController");
const _modelLogController = modelLogController();

function logger() {
  return {
    logCreatedModel : _modelLogController.logCreatedModel,
    logUpdatedModel : _modelLogController.logUpdatedModel,
    logDeletedModel : _modelLogController.logDeletedModel,
    logModelWithActionType : _modelLogController.logModelWithActionType
  };
}

module.exports = logger;
