export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-dark-muted">
        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including your email address, username,
            profile information, and content you post on the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your requests and transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information only in the
            following circumstances: with your consent, for legal reasons, or to protect our rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to protect your information from unauthorized access,
            alteration, or destruction. However, no internet transmission is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time
            through your account settings.
          </p>
        </section>
      </div>
    </div>
  )
}

