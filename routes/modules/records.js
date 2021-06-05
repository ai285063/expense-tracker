const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')

const Category = require('../../models/category')
const Record = require('../../models/record')
const { validateRecord } = require('../../middleware/validator')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(results => res.render('new', { categories: results }))
})

router.post('/', async (req, res) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //   const categories = await Category.find().lean()
  //   return res.status(400).render('new', { categories, newRecord, errorMsg: errors.array() })
  // }
  try {
    const userId = req.user._id
    const newRecord = req.body
    await Record.create(Object.assign(newRecord, { userId }))
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const [categories, record] = await Promise.all([Category.find().lean(), Record.findOne({ _id, userId }).lean()])
    record.date = new Date(record.date).toISOString().substring(0, 10)
    return res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const edited = req.body
    await Record.findOne({ _id, userId })
      .then(record => {
        record = Object.assign(record, edited)
        return record.save()
      })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Record.findOne({ _id, userId })
      .then(record => record.remove())
      .then(() => res.redirect('/'))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
