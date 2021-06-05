const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', async (req, res) => {
  try {
    let totalAmount = 0
    const [categories, records] = await Promise.all([Category.find().lean(), Record.find().lean()])
    const dates = []
    for (let i = 0; i < records.length; i++) {
      dates[i] = new Date(records[i].date).toISOString().substring(0, 10)
      records[i].date = dates[i]
      totalAmount += records[i].amount
    }
    return res.render('index', { categories, records, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
