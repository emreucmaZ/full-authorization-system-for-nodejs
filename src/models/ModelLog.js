const mongoose = require("mongoose");

const modelLogSchema = new mongoose.Schema({
  user:Object,
  table:String,
  data:{type:Object,required:false},
  type:String,
  oldData:{type:Object,required:false},
  deletedData:{type:Object,required:false},
  timestamp:{type:Date}
});

const ModelLog = mongoose.model("ModelLog", modelLogSchema);

module.exports = ModelLog;
