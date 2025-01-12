const logCreatedModel = require("./logCreatedModel");
const logDeletedModel = require("./logDeletedModel");
const logModelWithActionType = require("./logModelWithActiontype");
const logUpdatedModel = require("./logUpdatedModel");


const modelLogController = ()=>{
    return{
        logCreatedModel,
        logUpdatedModel,
        logDeletedModel,
        logModelWithActionType
    }
}

module.exports = modelLogController;