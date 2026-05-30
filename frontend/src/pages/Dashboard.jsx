import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getStreak } from '../api/streak'
import { getSolvedProblems } from '../api/problems'
import { getAllCategories } from '../api/categories'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [streakData, setStreakData] = useState(null)
  const [solvedProblems, setSolvedProblems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [streakRes, solvedRes, categoriesRes] = await Promise.all([
          getStreak(),
          getSolvedProblems(),
          getAllCategories()
        ])
        setStreakData(streakRes.data)
        setSolvedProblems(solvedRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-500">🧠 LeetCode Tracker</h1>
        <div className="flex items-center gap-4">
          <Link to="/problems" className="text-gray-300 hover:text-white">Problems</Link>
          <Link to="/log" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg">
            + Log Problem
          </Link>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome */}
        <h2 className="text-3xl font-bold mb-8">
          Welcome back, <span className="text-yellow-500">{user?.name}</span>! 👋
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-yellow-500">{streakData?.streak || 0}</p>
            <p className="text-gray-400 mt-1">🔥 Day Streak</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-blue-400">{streakData?.totalSolved || 0}</p>
            <p className="text-gray-400 mt-1">Total Solved</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-green-400">{streakData?.breakdown?.easy || 0}</p>
            <p className="text-gray-400 mt-1">Easy</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-orange-400">{streakData?.breakdown?.medium || 0}</p>
            <p className="text-gray-400 mt-1">Medium</p>
          </div>
        </div>

        {/* Categories Progress */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-bold mb-4">Progress by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const solved = solvedProblems.filter(
                (log) => log.problem.category.id === cat.id
              ).length
              const total = cat._count.problems
              const percent = total > 0 ? Math.round((solved / total) * 100) : 0

              return (
                <div key={cat.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">{cat.name}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{solved}/{total} solved</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Solves */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Recently Solved</h3>
          {solvedProblems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No problems solved yet!</p>
              <Link
                to="/log"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg"
              >
                Log Your First Problem
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {solvedProblems.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div>
                    <p className="font-medium">{log.problem.title}</p>
                    <p className="text-sm text-gray-400">{log.problem.category.name}</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    log.problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    log.problem.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {log.problem.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard