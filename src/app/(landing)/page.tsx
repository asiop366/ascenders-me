'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MessageSquare, Users, Zap, Shield, ArrowRight, Sparkles, TrendingUp, Award, Dumbbell, Heart, Star, Clock, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const router = useRouter()
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />

      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Ascenders Logo"
                width={40}
                height={40}
                className="rounded-xl group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Ascenders</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-dark-100 hover:text-white transition-colors font-medium">
              {t('landing.nav_features')}
            </Link>
            <Link href="#community" className="text-dark-100 hover:text-white transition-colors font-medium">
              {t('landing.nav_community')}
            </Link>
            <Link href="#topics" className="text-dark-100 hover:text-white transition-colors font-medium">
              {t('landing.nav_topics')}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1 mr-2">
              <button
                onClick={() => setLanguage('fr')}
                className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded transition-all",
                  language === 'fr' ? "bg-primary text-white" : "text-dark-400 hover:text-white"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded transition-all",
                  language === 'en' ? "bg-primary text-white" : "text-dark-400 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            <Link
              href="/login"
              className="btn-ghost hidden sm:block"
            >
              {t('landing.nav_login')}
            </Link>
            <Link
              href="/register"
              className="btn-primary"
            >
              {t('landing.nav_join')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-primary/30 rounded-full mb-8 backdrop-blur-sm glow">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary-light">{t('landing.hero_badge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-display-xl md:text-[72px] font-display font-bold mb-6 leading-none">
            <span className="gradient-text">{t('landing.hero_title_level')}</span>
            <br />
            <span className="text-white">{t('landing.hero_title_together')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-dark-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {t('landing.hero_subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/register"
              className="group btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              {t('landing.hero_get_started')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/app"
              className="btn-secondary text-lg px-8 py-4"
            >
              {t('landing.hero_browse')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-primary" size={24} />
              </div>
              <div className="text-4xl font-bold text-white mb-1">5K+</div>
              <div className="text-sm text-dark-200">{t('landing.stat_members')}</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="text-accent" size={24} />
              </div>
              <div className="text-4xl font-bold text-white mb-1">12K+</div>
              <div className="text-sm text-dark-200">{t('landing.stat_discussions')}</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="text-secondary" size={24} />
              </div>
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-dark-200">{t('landing.stat_community')}</div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-accent rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      </section>

      {/* Topics Preview Section */}
      <section id="topics" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-display-lg font-display font-bold text-white mb-4">
              {t('landing.topics_title')}
            </h2>
            <p className="text-xl text-dark-100 max-w-2xl mx-auto">
              {t('landing.topics_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <TopicPreviewCard name="Fitness" icon="💪" count="3.2K" color="#FF6B6B" />
            <TopicPreviewCard name="Skincare" icon="✨" count="2.1K" color="#4ECDC4" />
            <TopicPreviewCard name="Style" icon="👔" count="1.8K" color="#95E1D3" />
            <TopicPreviewCard name="Nutrition" icon="🥗" count="1.5K" color="#FFE66D" />
          </div>

          <div className="text-center">
            <Link
              href="/app/topics"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
            >
              {t('landing.topics_view_all')}
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-display-lg font-display font-bold text-white mb-4">
              {t('landing.features_title')}
            </h2>
            <p className="text-xl text-dark-100 max-w-2xl mx-auto">
              {t('landing.features_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Dumbbell className="w-10 h-10" />}
              title={t('landing.feature_fitness_title')}
              description={t('landing.feature_fitness_desc')}
              gradient="from-primary to-primary-light"
            />
            <FeatureCard
              icon={<Heart className="w-10 h-10" />}
              title={t('landing.feature_skincare_title')}
              description={t('landing.feature_skincare_desc')}
              gradient="from-secondary to-secondary-light"
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title={t('landing.feature_style_title')}
              description={t('landing.feature_style_desc')}
              gradient="from-accent to-accent-light"
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title={t('landing.feature_evidence_title')}
              description={t('landing.feature_evidence_desc')}
              gradient="from-primary to-secondary"
            />
            <FeatureCard
              icon={<Users className="w-10 h-10" />}
              title={t('landing.feature_community_title')}
              description={t('landing.feature_community_desc')}
              gradient="from-secondary to-accent"
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10" />}
              title={t('landing.feature_messaging_title')}
              description={t('landing.feature_messaging_desc')}
              gradient="from-accent to-primary"
            />
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section id="community" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-display-lg font-display font-bold text-white mb-4">
              {t('landing.testimonials_title')}
            </h2>
            <p className="text-xl text-dark-100 max-w-2xl mx-auto">
              {t('landing.testimonials_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote={language === 'fr' ? "Cette communauté a changé mon approche du fitness. Les conseils ici sont pratiques et fonctionnent réellement." : "This community changed my approach to fitness. The advice here is practical and actually works."}
              author="Alex M."
              role={language === 'fr' ? "Membre depuis 2024" : "Member since 2024"}
            />
            <TestimonialCard
              quote={language === 'fr' ? "Enfin trouvé un endroit où les gens prennent les soins de la peau au sérieux. Les routines partagées ici ont éclairci ma peau." : "Finally found a place where people take skincare seriously. The routines shared here cleared my skin."}
              author="Jordan K."
              role={language === 'fr' ? "Membre depuis 2024" : "Member since 2024"}
            />
            <TestimonialCard
              quote={language === 'fr' ? "Les guides de style et les retours de la communauté m'ont aidé à refaire complètement ma garde-robe." : "The style guides and feedback from the community helped me completely revamp my wardrobe."}
              author="Sam T."
              role={language === 'fr' ? "Membre depuis 2024" : "Member since 2024"}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-8 glow">
            <Award size={40} className="text-white" />
          </div>
          <h2 className="text-display-lg font-display font-bold text-white mb-6">
            {t('landing.cta_title')}
          </h2>
          <p className="text-xl text-dark-100 mb-12 max-w-2xl mx-auto">
            {t('landing.cta_subtitle')}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 btn-primary text-lg px-10 py-4"
          >
            {t('landing.cta_button')}
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="Ascenders Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold text-white text-lg">Ascenders</span>
              </div>
              <p className="text-sm text-dark-200">
                {t('landing.footer_tagline')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 tracking-tight">{t('nav.topics')}</h3>
              <ul className="space-y-3">
                <li><Link href="/app/topics/fitness" className="text-sm text-dark-200 hover:text-primary transition-colors">Fitness</Link></li>
                <li><Link href="/app/topics/skincare" className="text-sm text-dark-200 hover:text-primary transition-colors">Skincare</Link></li>
                <li><Link href="/app/topics/style" className="text-sm text-dark-200 hover:text-primary transition-colors">Style</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 tracking-tight">{t('landing.footer_resources')}</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-dark-200 hover:text-primary transition-colors">{language === 'fr' ? 'À propos' : 'About'}</Link></li>
                <li><Link href="/app" className="text-sm text-dark-200 hover:text-primary transition-colors">{language === 'fr' ? 'Parcourir le forum' : 'Browse Forum'}</Link></li>
                <li><Link href="/register" className="text-sm text-dark-200 hover:text-primary transition-colors">{language === 'fr' ? 'Rejoindre' : 'Join'}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 tracking-tight">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-sm text-dark-200 hover:text-primary transition-colors">{language === 'fr' ? 'Conditions' : 'Terms'}</Link></li>
                <li><Link href="/privacy" className="text-sm text-dark-200 hover:text-primary transition-colors">{language === 'fr' ? 'Privacité' : 'Privacy'}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-dark-300">
              © 2025 Ascenders. {language === 'fr' ? 'Élevez-vous.' : 'Level up yourself.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TopicPreviewCard({ name, icon, count, color }: { name: string; icon: string; count: string; color: string }) {
  return (
    <Link
      href={`/app/topics/${name.toLowerCase()}`}
      className="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-200 border border-white/5 hover:border-white/10"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-white group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm text-dark-400">{count} discussions</p>
        </div>
      </div>
    </Link>
  )
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className="group gradient-border p-8 hover:translate-y-[-4px]">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-dark-200 leading-relaxed">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-dark-100 mb-6 leading-relaxed">"{quote}"</p>
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-dark-400">{role}</p>
      </div>
    </div>
  )
}
