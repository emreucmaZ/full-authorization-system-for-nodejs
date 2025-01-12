const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    name: { type: String,unique:true },
    description : {type:String},
    isDisabled: {type:Boolean,default:false},
    isDeleted : {type:Boolean,default:false}
})


const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;