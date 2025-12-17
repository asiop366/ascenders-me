import './globals.css'

export const metadata = {
  title: 'Mon Serveur Discord',
  description: 'Rejoins notre communauté Discord !',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
