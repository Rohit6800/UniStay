
import React, { useState } from 'react';
import { Room } from '../types';
import { ChevronLeft, Share2, Heart, ShieldCheck, MapPin, Phone, MessageCircle, Calendar, Users, Home, Wind, Bath, Info, AlertTriangle, Eye, Navigation, Camera } from 'lucide-react';

interface RoomDetailViewProps {
  room: Room;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const RoomDetailView: React.FC<RoomDetailViewProps> = ({ room, onBack, isSaved, onToggleSave }) => {
  const [activePhoto, setActivePhoto] = useState(0);

  // Helper to get labels for the specific 3-photo structure requested
  const getPhotoLabel = (index: number) => {
    switch (index) {
      case 0: return 'Bedroom';
      case 1: return 'Kitchen';
      case 2: return 'Bathroom';
      default: return `Photo ${index + 1}`;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-1 font-bold text-slate-700 hover:text-blue-600 transition-colors">
            <ChevronLeft /> Back to Search
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-200 transition-colors"><Share2 size={20} /></button>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
              className={`p-2 rounded-full transition-colors ${isSaved ? 'text-rose-500' : 'text-slate-700 hover:text-rose-500'}`}
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-20 px-4">
        {/* Photo Gallery with Explicit Labels */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main Display */}
            <div className="md:col-span-3 aspect-video rounded-3xl overflow-hidden shadow-lg group relative bg-slate-200">
              <img 
                src={room.photos[activePhoto]} 
                alt={getPhotoLabel(activePhoto)} 
                className="w-full h-full object-cover transition-opacity duration-300" 
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Camera size={16} />
                {getPhotoLabel(activePhoto)}
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="bg-white text-slate-800 px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-xl transform group-hover:scale-105 transition-all">
                   <Eye size={18} /> Virtual Tour (360°)
                 </button>
              </div>
            </div>

            {/* Thumbnail Selection with Labels */}
            <div className="flex md:flex-col gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {room.photos.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => setActivePhoto(i)}
                  className={`relative flex-shrink-0 w-32 md:w-full rounded-2xl overflow-hidden border-2 transition-all group ${activePhoto === i ? 'border-blue-600 shadow-md ring-4 ring-blue-50' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={p} alt={`Thumb ${i}`} className="w-full h-24 md:h-32 object-cover" />
                  <div className={`absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${activePhoto === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">{getPhotoLabel(i)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-2">
                {room.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase">
                    <ShieldCheck size={12} /> Verified Property
                  </span>
                )}
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full uppercase">
                  {room.type} • {room.genderPref} Only
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{room.title}</h1>
              <p className="flex items-center gap-2 text-slate-500 font-medium">
                <MapPin size={18} /> {room.location}, {room.city}, {room.state}
              </p>
            </section>

            <section className="grid grid-cols-3 gap-4 p-6 bg-white rounded-3xl border border-slate-200">
              <div className="text-center border-r border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Monthly Rent</p>
                <p className="text-xl font-black text-blue-600">₹{room.rent}</p>
              </div>
              <div className="text-center border-r border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Deposit</p>
                <p className="text-xl font-black text-slate-800">₹{room.deposit}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Availability</p>
                <p className="text-sm font-black text-slate-800 uppercase">{room.availableFrom}</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Key Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-colors ${room.ac ? 'border-blue-100 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                  <Wind size={24} /> <span className="text-xs font-bold">AC Room</span>
                </div>
                <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-colors ${room.furnished ? 'border-blue-100 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                  <Home size={24} /> <span className="text-xs font-bold">Furnished</span>
                </div>
                <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-colors ${room.attachedBathroom ? 'border-blue-100 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                  <Bath size={24} /> <span className="text-xs font-bold">Attached Bath</span>
                </div>
                <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 border-blue-100 bg-blue-50 text-blue-700`}>
                  <Users size={24} /> <span className="text-xs font-bold">{room.type}</span>
                </div>
              </div>
            </section>

            <section className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-600" /> Safety Score
                </h3>
                <span className="text-2xl font-black text-emerald-700">{room.safety.rating}/5</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-emerald-700">Street Lighting</span>
                  <span className="font-bold text-emerald-900">{room.safety.lighting}</span>
                </div>
                <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[90%]"></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-emerald-700">Police Presence</span>
                  <span className="font-bold text-emerald-900">{room.safety.policeProximity}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">House Rules</h3>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
                {room.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-600">
                    <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{rule}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Nearby Essentials</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Navigation className="text-blue-500" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-400">Metro/Bus Stop</p>
                    <p className="text-sm font-bold text-slate-700">Walking distance (500m)</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
                  <AlertTriangle className="text-amber-500" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-400">Medical Center</p>
                    <p className="text-sm font-bold text-slate-700">Local Clinic (1.2km)</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl">
                  {room.ownerName.charAt(0)}
                </div>
                <h4 className="font-bold text-lg text-slate-800">{room.ownerName}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Property Owner</p>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    <Phone size={18} /> Call Now
                  </button>
                  <button className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200">
                    <MessageCircle size={18} /> WhatsApp
                  </button>
                  <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
                    In-app Chat
                  </button>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
                <div className="p-2 bg-amber-200 rounded-xl text-amber-700">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800 text-sm">Anti-Fraud Tip</h4>
                  <p className="text-xs text-amber-700 mt-1">Never pay the security deposit without visiting the property and seeing the original documents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailView;
