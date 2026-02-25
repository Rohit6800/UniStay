
import React, { useState, useEffect } from 'react';
import { User, UserRole, Room } from './types';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import StudentDashboard from './views/StudentDashboard';
import DealerDashboard from './views/DealerDashboard';
import RoomDetailView from './views/RoomDetailView';
import ChatBot from './components/ChatBot';
import { MOCK_ROOMS } from './constants';
import { fetchListings } from './services/supabase';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [view, setView] = useState<'HOME' | 'AUTH' | 'DASHBOARD' | 'DETAIL'>('HOME');

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const supabaseListings = await fetchListings();
        if (supabaseListings && supabaseListings.length > 0) {
          // Map Supabase fields to our Room type
          const mappedRooms: Room[] = supabaseListings.map((item: any) => ({
            id: item.id,
            title: item.listing_title,
            type: item.room_type.includes('single') ? 'Single' : item.room_type.includes('sharing') ? 'Sharing' : 'PG',
            rent: item.monthly_rent,
            deposit: item.security_deposit,
            location: `${item.city}, ${item.state}`,
            state: item.state,
            city: item.city,
            collegeName: item.near_college,
            distance: 0.5,
            photos: [item.room_picture, item.kitchen_picture, item.bathroom_picture].filter(Boolean),
            isVerified: true,
            isFeatured: false,
            amenities: [
              item.wifi && 'WiFi',
              item.power_backup && 'Power Backup',
              item.geyser && 'Geyser',
              item.tv && 'TV',
              item.refrigerator && 'Refrigerator',
              item.washing_machine && 'Washing Machine',
              item.cctv && 'CCTV',
              item.security_guard && 'Security Guard'
            ].filter(Boolean),
            furnished: true,
            attachedBathroom: true,
            ac: true,
            genderPref: 'Co-ed',
            availableFrom: 'Immediately',
            rules: ['No smoking', 'No loud music'],
            ownerName: item.owner_name,
            ownerPhone: '+91 9999999999',
            safety: { rating: 4.5, policeProximity: '1km', lighting: 'Excellent' },
            reviews: [],
            coordinates: { lat: item.latitude, lng: item.longitude }
          }));
          setRooms([...mappedRooms, ...MOCK_ROOMS]);
        }
      } catch (error) {
        console.error('Error loading rooms from Supabase:', error);
      }
    };
    loadRooms();
  }, []);

  const handleAddRoom = (newRoom: Room) => {
    setRooms(prev => [newRoom, ...prev]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('HOME');
  };

  const handleGoBackHome = () => {
    setView('HOME');
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
      {view === 'HOME' && (
        <HomeView 
          onNavigateAuth={() => setView('AUTH')} 
          onRoomSelect={handleRoomSelect}
          rooms={rooms}
        />
      )}

      {view === 'AUTH' && (
        <LoginView 
          onLogin={handleLogin} 
          onBack={handleGoBackHome}
        />
      )}

      {view === 'DASHBOARD' && currentUser?.role === UserRole.STUDENT && (
        <StudentDashboard 
          user={currentUser} 
          onRoomSelect={handleRoomSelect} 
          onLogout={handleLogout}
          onBack={handleGoBackHome}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          rooms={rooms}
        />
      )}

      {view === 'DASHBOARD' && currentUser?.role === UserRole.DEALER && (
        <DealerDashboard 
          user={currentUser} 
          onLogout={handleLogout} 
          onBack={handleGoBackHome}
          onAddRoom={handleAddRoom}
          rooms={rooms}
        />
      )}

      {view === 'DETAIL' && selectedRoom && (
        <RoomDetailView 
          room={selectedRoom} 
          user={currentUser}
          onBack={() => setView(currentUser ? 'DASHBOARD' : 'HOME')}
          isSaved={wishlist.includes(selectedRoom.id)}
          onToggleSave={() => toggleWishlist(selectedRoom.id)}
          onNavigateAuth={() => setView('AUTH')}
        />
      )}

      {currentUser && <ChatBot />}
    </div>
  );
};

export default App;
