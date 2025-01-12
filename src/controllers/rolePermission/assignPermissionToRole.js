const sendCreatedModelResponse = require("../../helpers/exception/sendCreatedModelResponse");
const sendResponse = require("../../helpers/exception/sendResponse");
const logger = require("../../helpers/logging/logger");
const Permission = require("../../models/Permission");
const Role = require("../../models/Role");
const RolePermission = require("../../models/RolePermission");

const _logger = logger();
const assignPermissionToRole = async (req,res) => {
    const {roleId,permissionId} = req.body;
    const role = await Role.findById(roleId).then((role)=>role).catch((error) =>{
    })
    const permission = await Permission.findById(permissionId).then((permission)=>permission).catch((error) =>{
    })
    if(!role){
        return sendResponse(false, "message", "Role Bulunamadı", res); // Hata detaylarını döndür
    }
    if(!permission){
        return sendResponse(false, "message", "Permission Bulunamadı", res); // Hata detaylarını döndür
    }
    const newRolePermission = new RolePermission({roleId,permissionId});
    newRolePermission
    .save()
    .then((assignedRolePermission) => {
        _logger.logCreatedModel(req.user, "rolePermissions", assignedRolePermission);
        return sendCreatedModelResponse(res, "Başarıyla Permission Role Atandı", "assignedRolePermission", assignedRolePermission);
    })
    .catch((error) => {
        return sendResponse(false, "message", error, res); // Hata detaylarını döndür
    });

}

module.exports = assignPermissionToRole;