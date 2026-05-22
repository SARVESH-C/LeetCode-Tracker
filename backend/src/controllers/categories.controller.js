const prisma = require('../utils/prismaClient')

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { problems: true }
        }
      }
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Create a category (admin only for now)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    const existing = await prisma.category.findUnique({
      where: { name }
    })

    if (existing) {
      return res.status(400).json({ message: 'Category already exists' })
    }

    const category = await prisma.category.create({
      data: { name }
    })

    res.status(201).json({ message: 'Category created', category })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getAllCategories, createCategory }