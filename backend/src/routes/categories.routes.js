const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  getAllCategories,
  createCategory
} = require('../controllers/categories.controller')

// Public
router.get('/', getAllCategories)

// Protected
router.post('/', authMiddleware, createCategory)

module.exports = router