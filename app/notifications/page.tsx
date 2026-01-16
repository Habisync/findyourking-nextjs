'use client';

const mockNotifications = [
  { id: '1', type: 'like', user: 'Alex M.', message: 'liked your profile', time: '5 minutes ago', read: false },
  { id: '2', type: 'match', user: 'Jordan K.', message: 'You have a new match!', time: '1 hour ago', read: false },
  { id: '3', type: 'message', user: 'Chris P.', message: 'sent you a message', time: '2 hours ago', read: true },
  { id: '4', type: 'visitor', user: 'Mike T.', message: 'viewed your profile', time: '3 hours ago', read: true }
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Notifications</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockNotifications.filter(n => !n.read).length} unread</p>
      </div>
      <div className="p-4 space-y-2">
        {mockNotifications.map(notif => (
          <div key={notif.id} className={`p-4 rounded-lg ${notif.read ? 'bg-purple-900/30' : 'bg-purple-800/50'} border border-purple-700`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-semibold">{notif.user}</p>
                <p className="text-gray-300 text-sm">{notif.message}</p>
              </div>
              {!notif.read && <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>}
            </div>
            <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
