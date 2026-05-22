const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth.routes')
const problemRoutes = require('./routes/problems.routes')
const streakRoutes = require('./routes/streak.routes')
const categoryRoutes = require('./routes/categories.routes')

app.use('/api/auth', authRoutes)
app.use('/api/problems', problemRoutes)
app.use('/api/streak', streakRoutes)
app.use('/api/categories', categoryRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'LeetCode Tracker API is running!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})