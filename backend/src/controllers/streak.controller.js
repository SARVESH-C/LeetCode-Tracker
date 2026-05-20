const prisma = require('../utils/prismaClient')
const calculateStreak = require('../utils/streakCalculator')

const getStreak = async (req, res) => {
  try {
    const userId = req.userId

    const solveLogs = await prisma.solveLog.findMany({
      where: { userId },
      orderBy: { solvedAt: 'desc' }
    })

    const streak = calculateStreak(solveLogs)
    const totalSolved = solveLogs.length

    // Get solved count by difficulty
    const solvedWithProblems = await prisma.solveLog.findMany({
      where: { userId },
      include: {
        problem: true
      }
    })

    const easy = solvedWithProblems.filter(
      (log) => log.problem.difficulty === 'Easy'
    ).length

    const medium = solvedWithProblems.filter(
      (log) => log.problem.difficulty === 'Medium'
    ).length

    const hard = solvedWithProblems.filter(
      (log) => log.problem.difficulty === 'Hard'
    ).length

    res.json({
      streak,
      totalSolved,
      breakdown: { easy, medium, hard }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getStreak }