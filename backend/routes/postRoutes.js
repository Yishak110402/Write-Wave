const express = require("express")
const router = express.Router()
const postControllers = require("./../controllers/postControllers")

router.use(express.json())

router.route('/').get(postControllers.getAllPosts).post(postControllers.createPost)
// router.route('/:creator').get(postControllers.getUserPosts)
router.route('/:id').get(postControllers.getPostById)

module.exports = router