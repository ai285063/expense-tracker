const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')

const Category = require('../../models/category')
const Record = require('../../models/record')
const { validateRecord } = require('../../middleware/validator')

router.get('/new', (req, res) => {
  const dateNow = new Date().toISOString().substring(0, 10)
  Category.find()
    .lean()
    .then(results => res.render('new', { categories: results, dateNow }))
})

router.post('/', validateRecord, async (req, res) => {
  const errorResults = validationResult(req)
  const newRecord = req.body
  newRecord.userId = req.user._id
  if (!errorResults.isEmpty()) {
    const categories = await Category.find().lean()
    res.status(400)
    return res.render('new', { categories, newRecord, error_msg: errorResults.errors })
  }
  try {
    await Record.create(newRecord)
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

router.put('/:id', validateRecord, async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const edited = req.body
  edited.userId = userId
  edited._id = _id
  const errorResults = validationResult(req)
  if (!errorResults.isEmpty()) {
    const categories = await Category.find().lean()
    res.status(400)
    return res.render('edit', { categories, record: edited, error_msg: errorResults.errors })
  }
  try {
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
