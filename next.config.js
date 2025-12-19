/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Corriger les erreurs au lieu de les ignorer
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['localhost'], // Ajouter les domaines d'images autorisés
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
