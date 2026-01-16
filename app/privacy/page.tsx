export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4">
        <h1 className="text-2xl font-bold text-gold-400">Privacy Policy</h1>
        <p className="text-cyan-300 text-sm mt-1">Last updated: January 2026</p>
      </div>
      <div className="p-6 space-y-6 text-gray-300">
        <section>
          <h2 className="text-white font-bold text-lg mb-3">1. Information We Collect</h2>
          <p className="leading-relaxed mb-2">We collect information you provide directly to us, including:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Profile information (name, age, photos, bio)</li>
            <li>Account credentials</li>
            <li>Messages and interactions</li>
            <li>Location data (with your permission)</li>
            <li>Usage data and preferences</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">2. How We Use Your Information</h2>
          <p className="leading-relaxed mb-2">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide and improve our services</li>
            <li>Match you with other users</li>
            <li>Send you notifications and updates</li>
            <li>Ensure safety and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">3. Information Sharing</h2>
          <p className="leading-relaxed">
            We do not sell your personal information. We may share your information with service providers, for legal reasons, or with your consent.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">4. Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate security measures to protect your information from unauthorized access, alteration, or destruction.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">5. Your Rights</h2>
          <p className="leading-relaxed mb-2">You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">6. Contact Us</h2>
          <p className="leading-relaxed">
            For privacy-related questions, contact us at privacy@findyourking.com
          </p>
        </section>
      </div>
    </div>
  );
}
