import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create grades
  const freeGrade = await prisma.grade.upsert({
    where: { slug: 'free' },
    update: {},
    create: {
      name: 'Free',
      slug: 'free',
      color: '#6B7280',
      position: 0,
      priceMonthly: 0,
    },
  })

  const proGrade = await prisma.grade.upsert({
    where: { slug: 'pro' },
    update: {},
    create: {
      name: 'Pro',
      slug: 'pro',
      color: '#3B82F6',
      position: 1,
      priceMonthly: 999,
    },
  })

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

  // Create spaces
  const generalSpace = await prisma.space.upsert({
    where: { slug: 'general' },
    update: {},
    create: {
      name: 'General',
      slug: 'general',
      icon: '💬',
      position: 0,
    },
  })

  const resourcesSpace = await prisma.space.upsert({
    where: { slug: 'resources' },
    update: {},
    create: {
      name: 'Resources',
      slug: 'resources',
      icon: '📚',
      position: 1,
    },
  })

  // Create channels
  const announcementsChannel = await prisma.channel.upsert({
    where: { slug: 'announcements' },
    update: {},
    create: {
      name: 'Announcements',
      slug: 'announcements',
      spaceId: generalSpace.id,
      type: 'FORUM',
      position: 0,
    },
  })

  const introductionsChannel = await prisma.channel.upsert({
    where: { slug: 'introductions' },
    update: {},
    create: {
      name: 'Introductions',
      slug: 'introductions',
      spaceId: generalSpace.id,
      type: 'FORUM',
      position: 1,
    },
  })

  const discussionsChannel = await prisma.channel.upsert({
    where: { slug: 'discussions' },
    update: {},
    create: {
      name: 'Discussions',
      slug: 'discussions',
      spaceId: generalSpace.id,
      type: 'FORUM',
      position: 2,
    },
  })

  const tutorialsChannel = await prisma.channel.upsert({
    where: { slug: 'tutorials' },
    update: {},
    create: {
      name: 'Tutorials',
      slug: 'tutorials',
      spaceId: resourcesSpace.id,
      type: 'FORUM',
      position: 0,
    },
  })

  // Create Topics (New Model)
  const topicsData = [
    { name: 'General Discussion', slug: 'general', icon: '💬', color: '#6366F1' },
    { name: 'Showcase', slug: 'showcase', icon: '✨', color: '#EC4899' },
    { name: 'Questions & Help', slug: 'help', icon: '❓', color: '#F59E0B' },
    { name: 'Tutorials', slug: 'tutorials', icon: '📖', color: '#10B981' },
    { name: 'Feedback', slug: 'feedback', icon: '💡', color: '#8B5CF6' },
  ]

  const createdTopics = await Promise.all(
    topicsData.map(topic =>
      prisma.topic.upsert({
        where: { slug: topic.slug },
        update: {},
        create: topic
      })
    )
  )

  // Create welcome thread
  await prisma.thread.upsert({
    where: { id: 'welcome-thread' },
    update: {},
    create: {
      id: 'welcome-thread',
      topicId: createdTopics[0].id,
      authorId: admin.id,
      title: 'Welcome to Ascenders! 👋',
      content: `Welcome to our community! We're excited to have you here.

This is a place where you can:
- Share your knowledge and experiences
- Ask questions and get help
- Connect with like-minded people
- Grow together as a community

Please take a moment to introduce yourself.

Enjoy your stay! 🚀`,
      pinned: true,
    },
  })

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

