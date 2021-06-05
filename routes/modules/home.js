const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', async (req, res) => {
  try {
    const [categories, records] = await Promise.all([Category.find().lean(), Record.find().lean()])
    return res.render('index', { categories, records })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
