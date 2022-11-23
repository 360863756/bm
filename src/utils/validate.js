/**
 * 生成唯一性校验验证器
 * @param {function} api 验证方法
 */
export function generateUniqueValidator(validateMethod) {
  return async(rule, value, cb) => {
    try {
      const { errcode, data: avaliable } = await validateMethod(value);
      if (errcode === 0 && avaliable) {
        cb();
      } else {
        cb(new Error(rule.message));
      }
    } catch (error) {
      console.error(error);
      cb(new Error('异常错误'));
    }
  };
}
