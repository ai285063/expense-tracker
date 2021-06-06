if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const data = require('./categories.json')

db.once('open', async () => {
  try {
    for (const categories of data) {
      await Category.create(categories)
    }
    console.log('Categories seeder load done.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
