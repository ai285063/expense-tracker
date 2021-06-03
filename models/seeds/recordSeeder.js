const Record = require('../record')
const db = require('../../config/mongoose')
const data = require('./records.json')

db.once('open', async () => {
  try {
    for (const records of data) {
      await Record.create(records)
    }
    console.log('Records seeder load done.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
