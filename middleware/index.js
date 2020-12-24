// 引用上方的validator library
const validator = require("../libs/validate");

const createRestaurant = async (req, res, next) => {
  
  const validation_rule = {
      // body params
      name: "required|string|min:5",
      name_en : "required|string",
      category : "required|string",
      image : "required|url",
      location : "required|string",
      google_map: "required|url",  // 故意加入多一個required，所以HTML5不會擋掉
  };
  
  const request_data = { 
   ...req.params,
   ...req.query,
   ...req.body
  };
  
  try {
    await validator(
      request_data, 
      validation_rule, 
      {}, 
      (err, status) => {
        if (err || !status) {
          return res.status(412).json({
            status: "error",
            message: err,
          });
        } else {
          next();
        }
    });
  } catch(error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
module.exports = { createRestaurant };