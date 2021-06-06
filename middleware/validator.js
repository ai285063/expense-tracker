const { body } = require('express-validator')
const User = require('../models/user')

module.exports = {
  validateRecord: [
    body('name').notEmpty().withMessage('請輸入支出名稱').bail()
      .isLength({ max: 10 }).withMessage('支出名稱最多為 10 字').bail(),
    body('merchant').notEmpty().withMessage('請輸入店家名稱').bail()
      .isLength({ max: 20 }).withMessage('店家名稱最多為 20 字'),
    body('date').isDate().withMessage('請輸入正確的日期格式').bail(),
    body('category').notEmpty().withMessage('請選擇支出類別').bail(),
    body('amount').notEmpty().withMessage('請輸入金額').bail()
      .isInt({ min: 1 }).withMessage('金額請輸入大於 0 的數字').bail()
  ],
  validateRegister: [
    body('name').notEmpty().withMessage('請輸入 Name').bail(),
    body('email').notEmpty().withMessage('請輸入 Email').bail()
      .isEmail().withMessage('請確認 Email 欄輸入的為信箱').bail()
      .custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) {
          throw new Error('信箱已被註冊')
        }
        return true
      }).bail(),
    body('password').notEmpty().withMessage('請輸入 8 - 14 位數密碼').bail()
      .isLength({ min: 8, max: 14 }).withMessage('密碼需介於 8 - 14 位數').bail(),
    body('confirmPassword').custom((value, { req }) => {
      const password = req.body.password
      if (value !== password) {
        throw new Error('確認密碼請與密碼一致')
      }
      return true
    }).bail()
  ]
}
