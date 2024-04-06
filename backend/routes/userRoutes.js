const express = require("express")
const router = express.Router()
const authControllers = require("./../controllers/authControllers")
const userControllers = require("./../controllers/userControllers")
router.use(express.json())

router.post('/signup', authControllers.signup)
router.post('/login', authControllers.login)
router.get('/', userControllers.getAllUsers)


module.exports = router
