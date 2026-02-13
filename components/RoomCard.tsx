
import React from 'react';
import { Room } from '../types';
import { MapPin, Users, CheckCircle, ShieldCheck, Heart } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick, isSaved, onToggleSave }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onClick(room)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.photos[0]} 
          alt={room.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {room.isVerified && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={12} /> VERIFIED
            </span>
          )}
          {room.isFeatured && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              FEATURED
            </span>
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave?.(room.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full glass transition-colors ${isSaved ? 'text-rose-500' : 'text-slate-600 hover:text-rose-500'}`}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-800 line-clamp-1">{room.title}</h3>
          <span className="text-blue-600 font-bold">₹{room.rent.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{room.location} • {room.distance}km from {room.collegeName}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
            <Users size={12} /> {room.type}
          </div>
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
            {room.genderPref}
          </div>
          {room.ac && (
            <div className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
              AC
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-500">Available From: {room.availableFrom}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-700">{room.safety.rating}</span>
            <ShieldCheck size={12} className="text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
