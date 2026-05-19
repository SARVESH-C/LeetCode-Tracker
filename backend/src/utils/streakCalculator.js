const calculateStreak = (solveLogs) => {
  if (!solveLogs || solveLogs.length === 0) return 0

  // Get unique dates when problems were solved
  const uniqueDates = [
    ...new Set(
      solveLogs.map((log) => {
        const date = new Date(log.solvedAt)
        return date.toISOString().split('T')[0]
      })
    )
  ].sort((a, b) => new Date(b) - new Date(a))

  if (uniqueDates.length === 0) return 0

  let streak = 1
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // If last solve was not today or yesterday, streak is 0
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

  // Count consecutive days
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i])
    const next = new Date(uniqueDates[i + 1])
    const diffDays = (current - next) / (1000 * 60 * 60 * 24)

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

module.exports = calculateStreak