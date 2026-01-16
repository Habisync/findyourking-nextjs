export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4">
        <h1 className="text-2xl font-bold text-gold-400">About FindYourKing</h1>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-purple-900/50 rounded-lg p-6">
          <h2 className="text-white font-bold text-xl mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            FindYourKing is dedicated to bringing together the LGBTQ+ community in a safe, inclusive, and vibrant environment. We believe everyone deserves to find meaningful connections, whether for friendship, romance, or community.
          </p>
        </div>
        <div className="bg-purple-900/50 rounded-lg p-6">
          <h2 className="text-white font-bold text-xl mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-gold-400">✨</span>
              <span>Verified profiles for authentic connections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">✨</span>
              <span>Advanced matching algorithms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">✨</span>
              <span>Safe and moderated community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">✨</span>
              <span>Event discovery and community engagement</span>
            </li>
          </ul>
        </div>
        <div className="bg-purple-900/50 rounded-lg p-6">
          <h2 className="text-white font-bold text-xl mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-2">Email: support@findyourking.com</p>
          <p className="text-gray-300">Follow us on social media @findyourking</p>
        </div>
      </div>
    </div>
  );
}
