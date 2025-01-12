function sendCreatedModelResponse(res,message, modelName,value) {
    res.status(200).json({ message: message, [modelName]: value });
  }
  
module.exports = sendCreatedModelResponse;
  