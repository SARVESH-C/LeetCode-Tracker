const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  getAllProblems,
  getProblemsByCategory,
  logSolvedProblem,
  getSolvedProblems
} = require('../controllers/problems.controller')

router.get('/', getAllProblems)
router.get('/category/:categoryId', getProblemsByCategory)
router.post('/log', authMiddleware, logSolvedProblem)
router.get('/solved', authMiddleware, getSolvedProblems)

module.exports = router