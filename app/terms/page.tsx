export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4">
        <h1 className="text-2xl font-bold text-gold-400">Terms of Service</h1>
        <p className="text-cyan-300 text-sm mt-1">Last updated: January 2026</p>
      </div>
      <div className="p-6 space-y-6 text-gray-300">
        <section>
          <h2 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using FindYourKing, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">2. Use License</h2>
          <p className="leading-relaxed">
            Permission is granted to use this service for personal, non-commercial purposes only. You must not modify, distribute, or use the service for any commercial purpose without prior written consent.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">3. User Conduct</h2>
          <p className="leading-relaxed mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Harass, abuse, or harm other users</li>
            <li>Post inappropriate or offensive content</li>
            <li>Impersonate others or misrepresent your identity</li>
            <li>Spam or send unsolicited messages</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">4. Privacy</h2>
          <p className="leading-relaxed">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">5. Termination</h2>
          <p className="leading-relaxed">
            We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason.
          </p>
        </section>
        <section>
          <h2 className="text-white font-bold text-lg mb-3">6. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of any changes.
          </p>
        </section>
      </div>
    </div>
  );
}
