const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')
const data = require('./records.json')

db.once('open', async () => {
  try {
    for (const item of data) {
      await Record.create(item)
    }
    console.log('Records seeder load done.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
  // return Promise.all(Array.from(
  //   { length: data.length }, (_, i) => {
  //     return Category.findOne({ name: data[i].category })
  //       .lean()
  //       .then(obj => {
  //         return Record.create({
  //           name: data[i].name,
  //           category: obj._id,
  //           date: data[i].date,
  //           amount: data[i].amount,
  //           merchant: data[i].merchant
  //         })
  //       })
  //       .then(() => {
  //         console.log('Records seeder load done.')
  //         process.exit()
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // ))
// try {
//   for (const records of data) {
//     await Record.create(records)
//   }
//   console.log('Records seeder load done.')
//   process.exit()
// } catch (err) {
//   console.log(err)
// }
})
