
import React, { useState, useEffect } from 'react';
import { User, UserRole, Room } from './types';
import LoginView from './views/LoginView';
import StudentDashboard from './views/StudentDashboard';
import DealerDashboard from './views/DealerDashboard';
import RoomDetailView from './views/RoomDetailView';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [view, setView] = useState<'AUTH' | 'DASHBOARD' | 'DETAIL'>('AUTH');

  useEffect(() => {
    // Session check would go here
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('AUTH');
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setView('DETAIL');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === 'AUTH' && <LoginView onLogin={handleLogin} />}

      {view === 'DASHBOARD' && currentUser?.role === UserRole.STUDENT && (
        <StudentDashboard 
          user={currentUser} 
          onRoomSelect={handleRoomSelect} 
          onLogout={handleLogout}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {view === 'DASHBOARD' && currentUser?.role === UserRole.DEALER && (
        <DealerDashboard 
          user={currentUser} 
          onLogout={handleLogout} 
        />
      )}

      {view === 'DETAIL' && selectedRoom && (
        <RoomDetailView 
          room={selectedRoom} 
          onBack={() => setView('DASHBOARD')}
          isSaved={wishlist.includes(selectedRoom.id)}
          onToggleSave={() => toggleWishlist(selectedRoom.id)}
        />
      )}

      {currentUser && <ChatBot />}
    </div>
  );
};

export default App;
