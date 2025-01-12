const jwt = require("jsonwebtoken");
const getSecretKey = require("../../helpers/authorization/getSecretKey");
const User = require("../../models/User");
const getUserPermissions = require("../../helpers/authorization/getUserPermissions");
const createToken = require("../../helpers/authorization/createToken");
const sendResponse = require("../../helpers/exception/sendResponse");

async function signIn(req, res) {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanından bulun
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(false,"message","Geçersiz kullanıcı adı",res,401)
    }

    // Parolayı doğrula
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return sendResponse(false,"message","Geçersiz Parola",res,401)
    }
    // JWT oluştur
    if(user.roleId != 0){
      user.roles = await getUserPermissions(user.roleId);
    }
    // Kullanıcı bilgileri ve token'i dön
    return sendResponse(true,"response",{user:user,token:createToken(user)},res,200)
  } catch (err) {
    console.error(err);
    return sendResponse(false,"message","Sunucu hatası",res,500)
  }
}

module.exports = signIn;
