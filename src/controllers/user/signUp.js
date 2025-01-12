const logger = require('../../helpers/logging/logger');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const sendResponse = require("../../helpers/exception/sendResponse");
const sendCreatedModelResponse = require('../../helpers/exception/sendCreatedModelResponse');

const _logger = logger();

function signUp(req,res){
    const {username,password} = req.body;
    const newUser = new User({username,password});
    newUser.roleId = "0";
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.error("Parola şifreleme hatası:", err);
          return;
        }
        newUser.password = hash; // Şifrelenmiş parolayı kaydetme
        newUser.creationDate = new Date()
        newUser.roleId = "0"
        newUser
          .save()
          .then((savedUser) => {
            _logger.logModelWithActionType(req.user, "users", savedUser,"signup");
            return sendCreatedModelResponse(res,"Başarıyla Sisteme Kayıt Oldunuz!","user",savedUser)
          })
          .catch((error) => {
            return sendResponse(false,"message","Kullanıcı oluşturma hatası:" + error,res)
          });
      });
    });
}

module.exports = signUp;