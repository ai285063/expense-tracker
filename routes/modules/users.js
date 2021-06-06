const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { validationResult } = require('express-validator')

const User = require('../../models/user')
const { validateRegister } = require('../../middleware/validator')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', validateRegister, async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errorResults = validationResult(req)
  if (!errorResults.isEmpty()) {
    res.status(400)
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      error_msg: errorResults.errors
    })
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
