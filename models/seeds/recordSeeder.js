const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const recordsData = require('./records.json')

const SEED_USER = {
  name: 'example',
  email: 'example@example.com',
  password: '12345678'
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    const { _id: userId } = user
    for (const record of recordsData) {
      await Record.create(Object.assign(record, { userId }))
    }
    console.log(`${SEED_USER.name} Seeder done.`)
    console.log('Records Seeder load done.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
