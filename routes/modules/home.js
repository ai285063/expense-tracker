const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryChosen = req.query.category
  const monthChosen = req.query.month
  try {
    let totalAmount = 0
    const [categories, records] = await Promise.all([Category.find().lean(),
      Record.aggregate([
        { $match: { $and: [getCategory(categoryChosen), getMonth(monthChosen), { userId }] } }
      ])
    ])
    const dates = []
    for (let i = 0; i < records.length; i++) {
      dates[i] = new Date(records[i].date).toISOString().substring(0, 10)
      records[i].date = dates[i]
      totalAmount += records[i].amount
    }
    return res.render('index', { categories, records, totalAmount, categoryChosen, monthChosen })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

function getCategory (categoryChosen) {
  if (categoryChosen) {
    if (categoryChosen !== '所有類別') {
      return { category: categoryChosen }
    } else if (categoryChosen === '所有類別') {
      return {}
    }
  } else {
    return {}
  }
}

function getMonth (monthChosen) {
  if (monthChosen) {
    const firstDayOfMonth = new Date(monthChosen)
    const LastDayOfMonth = new Date(monthChosen.substring(0, 4), monthChosen.substring(5, 7), 0)
    return { date: { $gt: firstDayOfMonth, $lt: LastDayOfMonth } }
  } else {
    return {}
  }
}
