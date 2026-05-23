const prisma = require('../utils/prismaClient')

// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        category: true
      }
    })
    res.json(problems)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get problems by category
const getProblemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const problems = await prisma.problem.findMany({
      where: { categoryId },
      include: { category: true }
    })
    res.json(problems)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Log a solved problem
const logSolvedProblem = async (req, res) => {
  try {
    const { problemId, notes } = req.body
    const userId = req.userId

    const existing = await prisma.solveLog.findFirst({
      where: { userId, problemId }
    })

    if (existing) {
      return res.status(400).json({ message: 'Problem already logged' })
    }

    const log = await prisma.solveLog.create({
      data: { userId, problemId, notes }
    })

    res.status(201).json({ message: 'Problem logged successfully', log })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all solved problems for a user
const getSolvedProblems = async (req, res) => {
  try {
    const userId = req.userId

    const logs = await prisma.solveLog.findMany({
      where: { userId },
      include: {
        problem: {
          include: { category: true }
        }
      },
      orderBy: { solvedAt: 'desc' }
    })

    res.json(logs)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = {
  getAllProblems,
  getProblemsByCategory,
  logSolvedProblem,
  getSolvedProblems
}