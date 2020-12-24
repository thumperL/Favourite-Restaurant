const Validator = require("validatorjs");
/**
 * @description Vaildator
 * @public
 * @param {Express.Request.body} body
 * @param {{ [key: string]: string; }} rules
 * @param {{ [key: string]: string; } | unknown} custom_messages
 * @param {Function} cb
 */
const validator = (body, rules, custom_messages, cb) => {
  const validation = new Validator(
   body,
   rules,
   custom_messages
  );
  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};

module.exports = validator;