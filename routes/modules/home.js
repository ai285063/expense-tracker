const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  // const categoryList = Category.find()
  // const categories = []
  // categoryList.exec((err, data) => {
  // })
  const totalAmount = 135
  Category
    .find()
    .lean()
    .then(results => res.render('index', { categories: results }))
    .catch(err => console.log(err))
  Record.find()
    .lean()
    .then(records => res.render('index', { records, totalAmount }))
    .catch(err => console.error(err))
})

module.exports = router
