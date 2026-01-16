export default function HelpPage() {
  const faqs = [
    { q: 'How do I create an account?', a: 'Click the Sign Up button and follow the registration process.' },
    { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and enter your email.' },
    { q: 'How does matching work?', a: 'When you both like each other, you get a match and can start chatting.' },
    { q: 'Can I change my profile picture?', a: 'Yes! Go to Settings > Edit Profile to update your photos.' },
    { q: 'How do I report a user?', a: 'Visit their profile and click the "Report" button to notify our team.' },
    { q: 'What is Premium?', a: 'Premium gives you unlimited likes, advanced filters, and more features.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Help & Support</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-purple-900/50 rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-purple-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-purple-900/50 rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-2">Need More Help?</h2>
          <p className="text-gray-300 mb-4">Contact our support team</p>
          <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
