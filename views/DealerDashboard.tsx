
import React, { useState, useMemo, useEffect } from 'react';
import { User, Room, RoomType } from '../types';
import { 
  PlusCircle, List, Settings, TrendingUp, ShieldCheck, 
  Clock, Users, X, Home, MapPin, IndianRupee, 
  Info, Camera, Check, ArrowLeft, Upload, Image as ImageIcon,
  MessageCircle, Globe, GraduationCap, ChevronRight
} from 'lucide-react';
import { MOCK_ROOMS, STATES_DATA, STATE_COLLEGE_MAPPING } from '../constants';

interface DealerDashboardProps {
  user: User;
  onLogout: () => void;
}

const DealerDashboard: React.FC<DealerDashboardProps> = ({ user, onLogout }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Single' as RoomType,
    rent: '',
    deposit: '',
    location: '',
    city: '',
    state: '',
    collegeName: '',
    genderPref: 'Co-ed',
    furnished: false,
    ac: false,
    attachedBathroom: false,
    rules: '',
    availableFrom: ''
  });

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    Bedroom: null,
    Kitchen: null,
    Bathroom: null
  });

  const availableCities = useMemo(() => {
    const state = STATES_DATA.find(s => s.name === formData.state);
    return state ? state.cities : [];
  }, [formData.state]);

  const availableColleges = useMemo(() => {
    return STATE_COLLEGE_MAPPING[formData.state] || [];
  }, [formData.state]);

  // Reset city and college if state changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, city: '', collegeName: '' }));
  }, [formData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    const val = type === 'checkbox' ? (e.target as any).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleToggle = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: !(prev as any)[field] }));
  };

  const handlePhotoClick = (part: string) => {
    const mockImages: { [key: string]: string } = {
      Bedroom: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=400',
      Kitchen: 'https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=400',
      Bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400'
    };
    setPreviews(prev => ({ ...prev, [part]: mockImages[part] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.state || !formData.city || !formData.collegeName) {
      alert('Please select State, City, and Near College');
      return;
    }
    alert('Room listing submitted for verification!');
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setShowAddForm(false)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
             <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                Step 1 of 2: Listing Details
              </div>
              <h2 className="text-3xl font-black mb-2">Add New Property Listing</h2>
              <p className="text-indigo-100 opacity-80">Fill in the details to reach students in your selected location.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-12">
            <section className="bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Camera className="text-indigo-600" size={20} /> Property Visuals
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Mandatory: Add 3 clear photos</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Bedroom', 'Kitchen', 'Bathroom'].map((part) => (
                  <div 
                    key={part} 
                    onClick={() => handlePhotoClick(part)}
                    className={`relative aspect-square rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                      previews[part] 
                        ? 'border-indigo-500 shadow-lg shadow-indigo-100' 
                        : 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/30'
                    }`}
                  >
                    {previews[part] ? (
                      <>
                        <img src={previews[part]!} alt={part} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-black uppercase tracking-widest">Change Photo</p>
                        </div>
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1 rounded-full shadow-lg">
                          <Check size={14} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-inner">
                          <Upload size={24} />
                        </div>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upload {part}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Globe size={14} className="text-indigo-500" /> Auto-Select Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">State</label>
                  <select 
                    name="state"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {STATES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">City</label>
                  <select 
                    name="city"
                    required
                    disabled={!formData.state}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none disabled:opacity-50"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Near College</label>
                  <select 
                    name="collegeName"
                    required
                    disabled={!formData.state}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none disabled:opacity-50"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select College</option>
                    {availableColleges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Info size={14} className="text-indigo-500" /> Basic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Listing Title</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="e.g., Luxury Single Room near Campus"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Room Type</label>
                  <select 
                    name="type"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Single">Single Room</option>
                    <option value="Sharing">Sharing Room</option>
                    <option value="PG">Hostel / PG</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Monthly Rent</label>
                  <div className="relative">
                    <IndianRupee size={18} className="absolute left-5 top-5 text-slate-400" />
                    <input 
                      type="number" 
                      name="rent"
                      required
                      placeholder="0.00"
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-slate-800"
                      value={formData.rent}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button 
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                PUBLISH LISTING <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Owner Dashboard 🏢</h1>
          <p className="text-slate-500 font-medium text-lg mt-1">Manage your student housing listings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onLogout}
            className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-900 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-800">Your Properties</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100"
        >
          <PlusCircle size={20} /> Add New Listing
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-20 text-center">
           <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={28} />
           </div>
          <p className="text-slate-400 text-sm font-bold italic">No active listings found for your account. Start by adding one!</p>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
