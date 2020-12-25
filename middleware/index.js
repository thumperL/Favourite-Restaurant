// 引用上方的validator library
const validator = require('../libs/validate');

const createRestaurant = async (req, res, next) => {
  const validation_rule = {
    // body params
    name: 'required|string|min:5',
    name_en: 'required|string',
    category: 'required|string',
    image: 'required|url',
    location: 'required|string',
  };

  const request_data = {
    ...req.params,
    ...req.query,
    ...req.body,
  };

  try {
    await validator(
      request_data,
      validation_rule,
      {},
      (err, status) => {
        if (err || !status) {
          return res.render(
            'restaurantForm',
            {
              restaurantData: req.body,
              status: 'error',
              error: err.errors,
            },
          );
        }
        next();
      },
    );
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
module.exports = { createRestaurant };
