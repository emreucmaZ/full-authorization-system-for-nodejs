const sendCreatedModelResponse = require("../../helpers/exception/sendCreatedModelResponse");
const sendResponse = require("../../helpers/exception/sendResponse");
const logger = require("../../helpers/logging/logger");
const Permission = require("../../models/Permission");


const _logger = logger();
const createPermission = (req,res)=>{
    const {name,description} = req.body;
    const newPermission = new Permission({name,description});
    newPermission
      .save()
      .then((savedPermission) => {
        _logger.logCreatedModel(req.user, "permissions", savedPermission);
        return sendCreatedModelResponse(res,"Başarıyla Permission Oluşturuldu","permission",savedPermission)
      })
      .catch((error) => {
        return sendResponse(false,"message",error,res)
      });
}


module.exports = createPermission;