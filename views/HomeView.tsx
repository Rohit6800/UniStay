
import React, { useState, useMemo } from 'react';
// Import Home icon from lucide-react to fix the error on line 149
import { Search, MapPin, Globe, GraduationCap, Star, ShieldCheck, Zap, Users, Heart, ArrowRight, MessageSquare, Shield, CheckCircle, Wifi, Utensils, Shirt, BookOpen, Lock, ShieldAlert, ZapOff, Home } from 'lucide-react';
import Logo from '../components/Logo';
import { STATES_DATA, STATE_COLLEGE_MAPPING } from '../constants';
import RoomCard from '../components/RoomCard';
import { Room } from '../types';

interface HomeViewProps {
  onNavigateAuth: () => void;
  onRoomSelect: (room: Room) => void;
  rooms: Room[];
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigateAuth, onRoomSelect, rooms }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [roomType, setRoomType] = useState('Any');
  const [filterTab, setFilterTab] = useState('All');

  const availableCities = useMemo(() => {
    const state = STATES_DATA.find(s => s.name === selectedState);
    return state ? state.cities : [];
  }, [selectedState]);

  const availableColleges = useMemo(() => {
    return STATE_COLLEGE_MAPPING[selectedState] || [];
  }, [selectedState]);

  const filteredStays = useMemo(() => {
    return rooms.filter(room => {
      if (filterTab === 'All') return true;
      if (filterTab === 'Girls') return room.genderPref === 'Girls';
      if (filterTab === 'Boys') return room.genderPref === 'Boys';
      if (filterTab === 'AC') return room.ac;
      return true;
    }).slice(0, 4);
  }, [filterTab, rooms]);

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#stays" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Stays</a>
            <a href="#amenities" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Amenities</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onNavigateAuth} className="text-sm font-bold text-slate-600 px-5 py-2 hover:bg-slate-100 rounded-xl transition-colors">Login</button>
            <button onClick={onNavigateAuth} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105">Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 hero-gradient overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -mr-64 -mt-64 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-black tracking-widest uppercase mb-6 animate-in slide-in-from-top-4 duration-500">
            <Zap size={14} /> The #1 Housing Network for Students
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            Find Your Perfect Student Home <span className="text-indigo-200">Near Campus</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-50 font-medium mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Safe. Affordable. Verified stays specifically curated for college students. Start your journey with UniStay.
          </p>

          {/* Search Box */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl p-3 md:p-4 rounded-[2rem] shadow-2xl border border-white flex flex-col gap-3 animate-in slide-in-from-bottom-8 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-slate-400 group-hover:text-indigo-500 transition-colors"><Globe size={20} /></div>
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none"
                  >
                    <option value="">Select State</option>
                    {STATES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-slate-400 group-hover:text-indigo-500 transition-colors"><MapPin size={20} /></div>
                  <select 
                    value={selectedCity}
                    disabled={!selectedState}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none disabled:opacity-50"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-slate-400 group-hover:text-indigo-500 transition-colors"><GraduationCap size={20} /></div>
                  <select 
                    value={selectedCollege}
                    disabled={!selectedState}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none disabled:opacity-50"
                  >
                    <option value="">Select College</option>
                    {availableColleges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-slate-400 group-hover:text-indigo-500 transition-colors"><Users size={20} /></div>
                  <select 
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none"
                  >
                    <option value="Any">Any Room Type</option>
                    <option value="Single">Single</option>
                    <option value="Sharing">Sharing</option>
                    <option value="PG">Hostel / PG</option>
                  </select>
                </div>
              </div>
              <button onClick={onNavigateAuth} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                <Search size={22} /> FIND MY HOME <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Simple Process</h2>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">How UniStay Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: MapPin, title: 'Search by College', desc: 'Enter your university or college name to see stays within walking distance.' },
              { icon: ShieldCheck, title: 'Compare Stays', desc: 'Browse high-quality photos, verified amenities, and read real student reviews.' },
              { icon: Home, title: 'Book & Move-in', desc: 'Secure your room with a small deposit and move in instantly with complete peace of mind.' }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform transition-transform group-hover:-translate-y-2 group-hover:rotate-6">
                  <step.icon size={40} />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-4">{step.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stays Section */}
      <section id="stays" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Explore Choices</h2>
              <h3 className="text-4xl font-black text-slate-800 tracking-tight">Popular Stays Near You</h3>
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
              {['All', 'Girls', 'Boys', 'AC'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setFilterTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filterTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredStays.map(room => (
              <div key={room.id} className="relative group">
                <div className="absolute -top-2 -right-2 z-10 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">10% OFF</div>
                <RoomCard room={room} onClick={onRoomSelect} />
                <div className="mt-4 px-2">
                   <button onClick={() => onRoomSelect(room)} className="w-full py-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-6">Our Values</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 tracking-tight">Built with Trust, Designed for Students</h3>
              <div className="space-y-8">
                {[
                  { icon: CheckCircle, title: '100% Verified Listings', desc: 'Every property is physically verified by our team for safety and amenities.' },
                  { icon: Lock, title: 'Secure Booking', desc: 'Safe payment gateways and instant booking confirmations.' },
                  { icon: MessageSquare, title: '24/7 Support', desc: 'Need help? Our student support team is just a chat away.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative z-10 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                  <h4 className="text-3xl font-black mb-6">List Your Property</h4>
                  <p className="text-indigo-100 text-lg mb-8 opacity-90">Are you a property owner in Ranchi or any major city? Reach 10,000+ students looking for homes daily.</p>
                  <button onClick={onNavigateAuth} className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">Partner with Us</button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 border-4 border-indigo-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Standard Quality</h2>
             <h3 className="text-4xl font-black tracking-tight">World-Class Amenities</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { icon: Wifi, label: 'High Speed WiFi' },
               { icon: Utensils, label: 'Home Style Food' },
               { icon: Shirt, label: 'Laundry Service' },
               { icon: BookOpen, label: 'Quiet Study Table' },
               { icon: Shield, label: '24/7 Security' },
               { icon: Camera, label: 'CCTV Monitoring' },
               { icon: Zap, label: 'Power Backup' },
               { icon: Wind, label: 'AC/Non-AC Options' }
             ].map((am, i) => (
               <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-colors">
                  <am.icon className="mx-auto mb-4 text-indigo-400" size={32} />
                  <p className="font-bold text-sm tracking-wide">{am.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Student Stories</h2>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Trusted by 5,000+ Students</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Amit Kumar', college: 'Sarala Birla University', review: 'Found a great budget single room near campus within 10 minutes. The verified photos were exactly as the room.', avatar: 'https://i.pravatar.cc/150?u=amit' },
              { name: 'Sneha Singh', college: 'Ranchi University', review: 'Safe and secure. As a girl student, safety was my priority. UniStay’s safety score helped me decide quickly.', avatar: 'https://i.pravatar.cc/150?u=sneha' },
              { name: 'Rahul Roy', college: 'BIT Mesra', review: 'Excellent filter options. I needed a roommate to split the rent, and the match feature worked perfectly!', avatar: 'https://i.pravatar.cc/150?u=rahul' }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group hover:bg-white hover:shadow-2xl transition-all">
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic mb-8">"{t.review}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">{t.name}</h5>
                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto hero-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Find Your New Home?</h3>
              <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium opacity-90">Join thousands of students who found their perfect stay near campus with UniStay.</p>
              <button onClick={onNavigateAuth} className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">Explore Stays Now</button>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Logo className="mb-6" />
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">Connecting students with safe, verified, and affordable homes near their colleges across India.</p>
              <div className="flex gap-4">
                {['fb', 'tw', 'ig', 'in'].map(s => <div key={s} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer"><span className="uppercase text-[10px] font-black">{s}</span></div>)}
              </div>
            </div>
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8">Quick Links</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8">For Partners</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">List Your Property</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Owner Login</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Agent Portal</a></li>
                <li><a href="#" className="text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors">Verification Process</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8">Newsletter</h5>
              <p className="text-slate-500 text-sm font-medium mb-4">Get the latest student living tips and exclusive deals.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                <button className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors"><ArrowRight size={20} /></button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 UniStay Marketplace. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Local icon imports for HomeView
import { Wind, Camera } from 'lucide-react';

export default HomeView;
