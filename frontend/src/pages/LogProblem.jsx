import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllProblems } from '../api/problems'
import { logSolvedProblem } from '../api/problems'

const LogProblem = () => {
  const [problems, setProblems] = useState([])
  const [selectedProblem, setSelectedProblem] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await getAllProblems()
        setProblems(res.data)
      } catch (error) {
        console.error('Error fetching problems:', error)
      } finally {
        setFetchLoading(false)
      }
    }
    fetchProblems()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedProblem) {
      setError('Please select a problem')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await logSolvedProblem({ problemId: selectedProblem, notes })
      setSuccess('Problem logged successfully! 🎉')
      setSelectedProblem('')
      setNotes('')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
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
          <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link to="/problems" className="text-gray-300 hover:text-white">Problems</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-2">Log a Problem</h2>
        <p className="text-gray-400 mb-8">Mark a LeetCode problem as solved</p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl">
          {/* Problem Select */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Select Problem</label>
            <select
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">-- Choose a problem --</option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.id}>
                  #{problem.leetcodeId} - {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">
              Notes <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 resize-none"
              placeholder="Write your approach, key insights, or anything you want to remember..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-3 rounded-lg transition"
          >
            {loading ? 'Logging...' : 'Mark as Solved ✓'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogProblem