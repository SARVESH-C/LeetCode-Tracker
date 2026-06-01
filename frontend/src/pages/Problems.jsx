import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProblems } from '../api/problems'
import { getAllCategories } from '../api/categories'

const Problems = () => {
  const [problems, setProblems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsRes, categoriesRes] = await Promise.all([
          getAllProblems(),
          getAllCategories()
        ])
        setProblems(problemsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = problems.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category.name === selectedCategory
    const matchDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchDifficulty && matchSearch
  })

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
          <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link to="/log" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg">
            + Log Problem
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">All Problems</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-64"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Problems count */}
        <p className="text-gray-400 mb-4">{filtered.length} problems found</p>

        {/* Problems List */}
        <div className="space-y-3">
          {filtered.map((problem) => (
            <div key={problem.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm w-8">#{problem.leetcodeId}</span>
                <div>
                  
                    href={problem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium hover:text-yellow-500 transition"
                  <a>
                    {problem.title}
                  </a>
                  <p className="text-sm text-gray-400">{problem.category.name}</p>
                </div>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                problem.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {problem.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Problems