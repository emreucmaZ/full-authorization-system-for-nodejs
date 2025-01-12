function sendResponse(status, field, value, res, code) {
    res.status(code || 200).json({ status: status, [field]: value });
  }
  
  module.exports = sendResponse;
  