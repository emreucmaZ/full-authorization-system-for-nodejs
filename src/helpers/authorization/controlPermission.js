const sendResponse = require("../exception/sendResponse");
const getUserPermissions = require("./getUserPermissions");

async function controlPermission(req,res,roleName,controller){
    if(roleName == ""){
      return controller(req, res);
    }
    if (req.user.roles.includes(roleName)) {
      controller(req, res);
    } else {
      return sendResponse(false,"message","Yetkilendirme hatası. Gerekli yetkiye sahip değilsiniz." ,res,403)
    }
}

module.exports = controlPermission;