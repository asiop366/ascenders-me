import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create grades
  const eliteGrade = await prisma.grade.upsert({
    where: { slug: 'elite' },
    update: {},
    create: {
      name: 'Elite',
      slug: 'elite',
      color: '#F59E0B',
      position: 2,
      priceMonthly: 1999,
    },
  })

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ascenders.com' },
    update: {},
    create: {
      email: 'admin@ascenders.com',
      username: 'admin',
      hashedPassword: adminPassword,
      role: 'ADMIN',
      gradeId: eliteGrade.id,
    },
  })

  // 1. Create Categories
  const infoCat = await prisma.forumCategory.upsert({
    where: { slug: 'information' },
    update: {},
    create: { name: 'Information', slug: 'information', position: 0 }
  })

  const selfImpCat = await prisma.forumCategory.upsert({
    where: { slug: 'self-improvement' },
    update: {},
    create: { name: 'Self-Improvement', slug: 'self-improvement', position: 1 }
  })

  const offTopicCat = await prisma.forumCategory.upsert({
    where: { slug: 'off-topic' },
    update: {},
    create: { name: 'Off Topic', slug: 'off-topic', position: 2 }
  })

  // 2. Create Topics under Categories
  const topics = [
    { name: 'News & Announcements', slug: 'news', categoryId: infoCat.id, description: 'Stay informed with essential updates and insightful news.', icon: '📢', color: '#3B82F6', position: 0 },
    { name: 'Rules', slug: 'rules', categoryId: infoCat.id, description: 'The official forum rules and guidelines.', icon: '⚖️', color: '#EF4444', position: 1 },

    { name: 'Looksmaxing', slug: 'looksmaxing', categoryId: selfImpCat.id, description: 'Discuss the many aspects of men\'s self improvement.', icon: '🧬', color: '#10B981', position: 0 },
    { name: 'Moneymaxing & Status', slug: 'moneymaxing', categoryId: selfImpCat.id, description: 'Unlock strategies to level up your life: wealth building, personal growth.', icon: '💰', color: '#F59E0B', position: 1 },

    { name: 'General Discussion', slug: 'general', categoryId: offTopicCat.id, description: 'Talk about anything and everything.', icon: '💬', color: '#6366F1', position: 0 },
    { name: 'Showcase', slug: 'showcase', categoryId: offTopicCat.id, description: 'Show your progress and results.', icon: '✨', color: '#EC4899', position: 1 },
  ]

  for (const t of topics) {
    await prisma.topic.upsert({
      where: { slug: t.slug },
      update: {},
      create: t
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
