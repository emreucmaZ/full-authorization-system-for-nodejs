const sendCreatedModelResponse = require("../../helpers/exception/sendCreatedModelResponse");
const sendResponse = require("../../helpers/exception/sendResponse");
const logger = require("../../helpers/logging/logger");
const Role = require("../../models/Role");

const _logger = logger();

function createRole(req,res){
    const {name} = req.body;
    const newRole = new Role({name});
    newRole
      .save()
      .then((savedRole) => {
        _logger.logCreatedModel(req.user, "roles", savedRole);
        return sendCreatedModelResponse(res,"Başarıyla Rol Oluşturuldu","role",savedRole)
      })
      .catch((error) => {
        return sendResponse(false,"message",error,res)
      });
}

module.exports = createRole;