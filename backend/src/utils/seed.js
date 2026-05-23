const prisma = require('./prismaClient')

const seed = async () => {
  console.log('Seeding database...')

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { name: 'Arrays' }, update: {}, create: { name: 'Arrays' } }),
    prisma.category.upsert({ where: { name: 'Strings' }, update: {}, create: { name: 'Strings' } }),
    prisma.category.upsert({ where: { name: 'Linked List' }, update: {}, create: { name: 'Linked List' } }),
    prisma.category.upsert({ where: { name: 'Trees' }, update: {}, create: { name: 'Trees' } }),
    prisma.category.upsert({ where: { name: 'Dynamic Programming' }, update: {}, create: { name: 'Dynamic Programming' } }),
    prisma.category.upsert({ where: { name: 'Graphs' }, update: {}, create: { name: 'Graphs' } }),
    prisma.category.upsert({ where: { name: 'Binary Search' }, update: {}, create: { name: 'Binary Search' } }),
    prisma.category.upsert({ where: { name: 'Stack & Queue' }, update: {}, create: { name: 'Stack & Queue' } }),
  ])

  console.log('✅ Categories created')

  // Create Problems
  const problems = [
    { title: 'Two Sum', difficulty: 'Easy', leetcodeId: 1, url: 'https://leetcode.com/problems/two-sum', categoryName: 'Arrays' },
    { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', leetcodeId: 121, url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', categoryName: 'Arrays' },
    { title: 'Contains Duplicate', difficulty: 'Easy', leetcodeId: 217, url: 'https://leetcode.com/problems/contains-duplicate', categoryName: 'Arrays' },
    { title: 'Product of Array Except Self', difficulty: 'Medium', leetcodeId: 238, url: 'https://leetcode.com/problems/product-of-array-except-self', categoryName: 'Arrays' },
    { title: 'Maximum Subarray', difficulty: 'Medium', leetcodeId: 53, url: 'https://leetcode.com/problems/maximum-subarray', categoryName: 'Arrays' },
    { title: 'Valid Anagram', difficulty: 'Easy', leetcodeId: 242, url: 'https://leetcode.com/problems/valid-anagram', categoryName: 'Strings' },
    { title: 'Valid Parentheses', difficulty: 'Easy', leetcodeId: 20, url: 'https://leetcode.com/problems/valid-parentheses', categoryName: 'Strings' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', leetcodeId: 3, url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', categoryName: 'Strings' },
    { title: 'Reverse Linked List', difficulty: 'Easy', leetcodeId: 206, url: 'https://leetcode.com/problems/reverse-linked-list', categoryName: 'Linked List' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', leetcodeId: 21, url: 'https://leetcode.com/problems/merge-two-sorted-lists', categoryName: 'Linked List' },
    { title: 'Invert Binary Tree', difficulty: 'Easy', leetcodeId: 226, url: 'https://leetcode.com/problems/invert-binary-tree', categoryName: 'Trees' },
    { title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', leetcodeId: 104, url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree', categoryName: 'Trees' },
    { title: 'Climbing Stairs', difficulty: 'Easy', leetcodeId: 70, url: 'https://leetcode.com/problems/climbing-stairs', categoryName: 'Dynamic Programming' },
    { title: 'Coin Change', difficulty: 'Medium', leetcodeId: 322, url: 'https://leetcode.com/problems/coin-change', categoryName: 'Dynamic Programming' },
    { title: 'Number of Islands', difficulty: 'Medium', leetcodeId: 200, url: 'https://leetcode.com/problems/number-of-islands', categoryName: 'Graphs' },
    { title: 'Binary Search', difficulty: 'Easy', leetcodeId: 704, url: 'https://leetcode.com/problems/binary-search', categoryName: 'Binary Search' },
    { title: 'Valid Stack Sequences', difficulty: 'Medium', leetcodeId: 946, url: 'https://leetcode.com/problems/validate-stack-sequences', categoryName: 'Stack & Queue' },
  ]

  for (const problem of problems) {
    const category = categories.find(c => c.name === problem.categoryName)
    await prisma.problem.upsert({
      where: { leetcodeId: problem.leetcodeId },
      update: {},
      create: {
        title: problem.title,
        difficulty: problem.difficulty,
        leetcodeId: problem.leetcodeId,
        url: problem.url,
        categoryId: category.id
      }
    })
  }

  console.log('✅ Problems created')
  console.log('🎉 Database seeded successfully!')
  process.exit(0)
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})