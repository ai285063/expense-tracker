const express = require('express')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')

const routes = require('./routes')

require('./config/mongoose')

const app = express()
hbsHelpers()
const port = 3000

app.engine('hbs', exphbs({
  helpers: {
    getImage: function (categoryName, categoryIcon) {
      return categoryIcon[categoryName]
    }
  },
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
