
import React, { useState, useMemo, useEffect } from 'react';
import { User, Room, RoomType } from '../types';
import RoomCard from '../components/RoomCard';
import { MOCK_ROOMS, STATES_DATA, STATE_COLLEGE_MAPPING } from '../constants';
import { Search, SlidersHorizontal, Map as MapIcon, GraduationCap, X, Wallet, Heart, UserPlus, MapPin, Globe, Star, Sparkles, Navigation } from 'lucide-react';
import BudgetCalculator from '../components/BudgetCalculator';

interface StudentDashboardProps {
  user: User;
  onRoomSelect: (room: Room) => void;
  onLogout: () => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onRoomSelect, onLogout, wishlist, onToggleWishlist }) => {
  const [search, setSearch] = useState('');
  // Changed auto-select options to empty strings for a clean start
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 20000]);
  const [roomType, setRoomType] = useState<RoomType | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'wishlist' | 'calculator' | 'roommates'>('listings');

  // Reset dependent fields when state changes
  useEffect(() => {
    setSelectedCity('');
    setSelectedCollege('');
  }, [selectedState]);

  const availableCities = useMemo(() => {
    const state = STATES_DATA.find(s => s.name === selectedState);
    return state ? state.cities : [];
  }, [selectedState]);

  const availableColleges = useMemo(() => {
    return STATE_COLLEGE_MAPPING[selectedState] || [];
  }, [selectedState]);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(search.toLowerCase()) || 
                          room.location.toLowerCase().includes(search.toLowerCase());
      const matchesState = selectedState ? room.state === selectedState : true;
      const matchesCity = selectedCity ? room.city === selectedCity : true;
      const matchesCollege = selectedCollege ? room.collegeName === selectedCollege : true;
      const matchesType = roomType === 'All' ? true : room.type === roomType;
      const matchesBudget = room.rent >= budgetRange[0] && room.rent <= budgetRange[1];
      
      if (activeTab === 'wishlist') return wishlist.includes(room.id);
      return matchesSearch && matchesState && matchesCity && matchesCollege && matchesType && matchesBudget;
    });
  }, [search, selectedState, selectedCity, selectedCollege, roomType, budgetRange, activeTab, wishlist]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header Section */}
      <div className="relative bg-indigo-900 text-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-400 rounded-full blur-[100px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-800/50 border border-indigo-700/50 px-3 py-1 rounded-full text-xs font-bold text-indigo-200 mb-4">
                <Sparkles size={14} /> AI-POWERED SEARCH
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Find Your Second Home.</h1>
              <p className="text-indigo-200 text-lg font-medium opacity-90 max-w-xl">
                Best budget rooms, PGs and hostels across India for students. Select your location below.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-white text-indigo-900 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm">Welcome, {user.name}</h4>
                <button onClick={onLogout} className="text-xs text-indigo-300 font-bold hover:text-white transition-colors">Logout Account</button>
              </div>
            </div>
          </div>

          {/* Attractive Quick Search Bar */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-2 shadow-2xl flex flex-col lg:flex-row items-center gap-2 border border-white">
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="relative">
                  <Globe className="absolute left-4 top-4 text-slate-400" size={18} />
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-slate-800 font-bold text-sm focus:outline-none bg-transparent"
                  >
                    <option value="">Select State</option>
                    {STATES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="relative border-t md:border-t-0 md:border-l border-slate-100">
                  <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                  <select 
                    value={selectedCity}
                    disabled={!selectedState}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-slate-800 font-bold text-sm focus:outline-none bg-transparent disabled:opacity-50"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative border-t md:border-t-0 md:border-l border-slate-100">
                  <GraduationCap className="absolute left-4 top-4 text-slate-400" size={18} />
                  <select 
                    value={selectedCollege}
                    disabled={!selectedState}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-slate-800 font-bold text-sm focus:outline-none bg-transparent disabled:opacity-50"
                  >
                    <option value="">Select College</option>
                    {availableColleges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-200">
                <Search size={18} /> SEARCH ROOMS
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        {/* Secondary Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-white flex gap-1 overflow-x-auto scrollbar-hide max-w-full">
            {[
              { id: 'listings', label: 'Explore', icon: MapIcon },
              { id: 'wishlist', label: 'Saved', icon: Heart },
              { id: 'roommates', label: 'Match', icon: UserPlus },
              { id: 'calculator', label: 'Planner', icon: Wallet }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'listings' && (
          <div className="pb-20">
            {/* Active Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Navigation size={18} />
                </div>
                <h2 className="text-xl font-black text-slate-800">
                  {filteredRooms.length} Premium Options {selectedCity && `in ${selectedCity}`}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 font-bold text-sm transition-all shadow-sm ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <div className="hidden md:flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
                  <button className="p-1.5 bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Star size={18} /></button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="mb-10 p-8 bg-white border border-slate-200 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-800">Refine Your Search</h3>
                  </div>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} className="text-slate-400" /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Accommodation Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Single', 'Sharing', 'PG'].map(t => (
                        <button
                          key={t}
                          onClick={() => setRoomType(t as any)}
                          className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${roomType === t ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-100 text-slate-500 hover:border-indigo-200'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Search Anything</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-4 text-slate-300" size={20} />
                      <input 
                        type="text" 
                        placeholder="WiFi, AC, Near Station..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Max Monthly Budget</label>
                    <div className="space-y-6">
                      <input 
                        type="range" 
                        min="0" 
                        max="20000" 
                        step="500"
                        value={budgetRange[1]}
                        onChange={(e) => setBudgetRange([budgetRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black text-slate-300">₹0</span>
                        <div className="px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100">
                          ₹{budgetRange[1].toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map(room => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onClick={onRoomSelect} 
                  isSaved={wishlist.includes(room.id)}
                  onToggleSave={onToggleWishlist}
                />
              ))}
            </div>
            
            {filteredRooms.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">No results matching your vibe.</h3>
                <p className="text-slate-400 font-medium mb-8">Try adjusting your filters or search keywords.</p>
                <button 
                  onClick={() => { setSearch(''); setSelectedState(''); setSelectedCity(''); setSelectedCollege(''); setRoomType('All'); setBudgetRange([0, 20000]); }}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="pb-20">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
               <Heart className="text-rose-500" fill="currentColor" /> My Favorite Stays
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map(room => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onClick={onRoomSelect} 
                  isSaved={true}
                  onToggleSave={onToggleWishlist}
                />
              ))}
            </div>
            {wishlist.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-slate-100">
                <Heart size={64} className="mx-auto text-slate-100 mb-6" />
                <h3 className="text-xl font-bold text-slate-400">Your wishlist is empty.</h3>
                <p className="text-slate-300 mt-2">Love a room? Tap the heart icon to save it here!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calculator' && <div className="pb-20"><BudgetCalculator /></div>}

        {activeTab === 'roommates' && (
          <div className="pb-20">
            <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
               <div className="relative z-10">
                <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transform rotate-6">
                  <UserPlus size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-4">The Roommate Matcher</h2>
                <p className="text-slate-500 max-w-xl mx-auto mb-12 text-lg">
                  Don't live alone! Split the rent and double the fun by connecting with other students from your campus.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] text-left border border-slate-100 hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-200 overflow-hidden shadow-inner">
                        <img src="https://picsum.photos/120/120?random=50" alt="Avatar" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800">Siddharth V.</h4>
                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">B.Tech • 3rd Year</p>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-8 font-medium leading-relaxed italic">"Looking for a quiet roommate. I'm tidy and usually study in the evenings. Non-smoker preferred."</p>
                    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">CONNECT NOW</button>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] text-left border border-slate-100 hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-200 overflow-hidden shadow-inner">
                        <img src="https://picsum.photos/120/120?random=51" alt="Avatar" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800">Priya M.</h4>
                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Economics • 1st Year</p>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-8 font-medium leading-relaxed italic">"Starting college this month! Looking for someone friendly and chill to share a 2BHK with."</p>
                    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">CONNECT NOW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
