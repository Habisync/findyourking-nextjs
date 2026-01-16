'use client';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Settings</h1>
      </div>
      <div className="p-4 space-y-4">
        {/* Account Settings */}
        <div className="bg-purple-900/50 rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-4">Account</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-purple-800 rounded-lg text-white hover:bg-purple-700 transition">
              Edit Profile
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-800 rounded-lg text-white hover:bg-purple-700 transition">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-800 rounded-lg text-white hover:bg-purple-700 transition">
              Email Preferences
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-purple-900/50 rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-4">Privacy</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">Show Online Status</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">Show Distance</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">Profile Visible</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-purple-900/50 rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-4">Notifications</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">New Matches</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">Messages</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-800 rounded-lg">
              <span className="text-white">Profile Visits</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="bg-gradient-to-r from-gold-600 to-gold-500 rounded-lg p-4">
          <h2 className="text-black font-bold text-lg mb-2">Upgrade to Premium</h2>
          <p className="text-black/80 text-sm mb-4">Unlock unlimited features!</p>
          <button className="w-full bg-black text-gold-400 font-bold py-3 rounded-lg hover:bg-gray-900 transition">
            View Premium Plans
          </button>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
          Logout
        </button>
      </div>
    </div>
  );
}
