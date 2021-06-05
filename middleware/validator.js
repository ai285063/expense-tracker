const { body } = require('express-validator')

module.exports = {
  validateRecord: [
    body('name').notEmpty().withMessage('請輸入名稱').bail()
      .isLength({ max: 10 }).withMessage('名稱最多為 10 個字').bail()
      .escape(),
    body('date').isDate().withMessage('請輸入正確的日期格式').bail(),
    body('amount').notEmpty().withMessage('請輸入金額').bail()
      .isInt().withMessage('請輸入數字'),
    body('merchant').isLength({ max: 10 }).withMessage('店家名稱最多為 10 個字')
  ]
}
