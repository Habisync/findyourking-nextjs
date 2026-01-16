export default function PremiumPage() {
  const plans = [
    { name: 'Monthly', price: '$9.99', period: '/month', features: ['Unlimited likes', 'See who likes you', 'Rewind swipes', 'Priority support'] },
    { name: '6 Months', price: '$39.99', period: '/6 months', savings: 'Save 33%', features: ['All monthly features', 'Boost profile', 'Advanced filters', 'Read receipts'] },
    { name: 'Yearly', price: '$59.99', period: '/year', savings: 'Save 50%', features: ['All 6-month features', 'Unlimited boosts', 'Profile verification', 'VIP support'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-gold-600 to-gold-500 p-4">
        <h1 className="text-2xl font-bold text-black text-center">Upgrade to Premium</h1>
        <p className="text-black/80 text-center text-sm mt-1">Unlock all features and boost your profile</p>
      </div>
      <div className="p-4 space-y-4">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-purple-900/50 rounded-lg p-6 border-2 ${i === 1 ? 'border-gold-400' : 'border-purple-700'}`}>
            {plan.savings && (
              <div className="inline-block bg-gold-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                {plan.savings}
              </div>
            )}
            <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-gold-400 font-bold text-3xl">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, j) => (
                <li key={j} className="text-white flex items-center gap-2">
                  <span className="text-green-400">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 text-center text-gray-400 text-sm">
        <p>Cancel anytime. Recurring billing. Terms apply.</p>
      </div>
    </div>
  );
}
