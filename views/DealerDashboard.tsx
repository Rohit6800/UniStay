
import React, { useState, useMemo, useEffect } from 'react';
import { User, Room, RoomType } from '../types';
import { 
  PlusCircle, List, Settings, TrendingUp, ShieldCheck, 
  Clock, Users, X, Home, MapPin, IndianRupee, 
  Info, Camera, Check, ArrowLeft, Upload, Image as ImageIcon,
  MessageCircle, Globe, GraduationCap, ChevronRight, ShoppingBag, Calendar, User as UserIcon
} from 'lucide-react';
import { STATES_DATA, STATE_COLLEGE_MAPPING } from '../constants';
import Logo from '../components/Logo';
import { supabase, Order, submitListing } from '../services/supabase';

interface DealerDashboardProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  onAddRoom: (room: Room) => void;
  rooms: Room[];
}

const DealerDashboard: React.FC<DealerDashboardProps> = ({ user, onLogout, onBack, onAddRoom, rooms }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [bookingRequests, setBookingRequests] = useState<Order[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [activeTab, setActiveTab] = useState<'properties' | 'bookings'>('properties');

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    setLoadingBookings(true);
    try {
      // In a real app, we'd filter by rooms owned by this user
      // For now, we'll fetch all and filter client-side or just show all for demo
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBookingRequests(data || []);
    } catch (error) {
      console.error('Error fetching booking requests:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
      
      if (error) throw error;
      setBookingRequests(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };
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
    availableFrom: '',
    lat: '',
    lng: '',
    // Amenities
    wifi: false,
    powerBackup: false,
    geyser: false,
    tv: false,
    refrigerator: false,
    washingMachine: false,
    kitchenAccess: false,
    microwave: false,
    roWater: false,
    wardrobe: false,
    studyTable: false,
    cctv: false,
    securityGuard: false,
    lift: false,
    parking: false,
    housekeeping: false,
    laundryService: false,
    // Food Options
    foodType: 'Veg',
    mealFrequency: '3',
    breakfastIncluded: false,
    sundaySpecial: false,
    tiffinFacility: false,
    // Pricing
    maintenanceCharges: '',
    electricityType: 'Separate Meter',
    latePaymentFine: '',
    discountOffers: '',
    seasonalPricing: '',
  });

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    Room: null,
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

  const handlePhotoUpload = (part: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [part]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = (part: string) => {
    const input = document.getElementById(`file-input-${part}`) as HTMLInputElement;
    if (input) input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.state || !formData.city || !formData.collegeName) {
      alert('Please select State, City, and Near College');
      return;
    }

    const listingData = {
      owner_name: user.name,
      owner_email: user.email,
      owner_password: 'demo_password', // In a real app, this would be handled by Auth
      room_picture: previews.Room,
      kitchen_picture: previews.Kitchen,
      bathroom_picture: previews.Bathroom,
      wifi: formData.wifi,
      power_backup: formData.powerBackup,
      geyser: formData.geyser,
      tv: formData.tv,
      refrigerator: formData.refrigerator,
      washing_machine: formData.washingMachine,
      kitchen_access: formData.kitchenAccess,
      microwave: formData.microwave,
      ro_water: formData.roWater,
      wardrobe: formData.wardrobe,
      study_table: formData.studyTable,
      cctv: formData.cctv,
      security_guard: formData.securityGuard,
      lift: formData.lift,
      parking: formData.parking,
      housekeeping: formData.housekeeping,
      laundry_service: formData.laundryService,
      security_deposit: Number(formData.deposit),
      maintenance_charges: Number(formData.maintenanceCharges),
      electricity: formData.electricityType.toLowerCase(),
      late_payment_fine: formData.latePaymentFine,
      discount_offers: formData.discountOffers,
      latitude: Number(formData.lat) || 0,
      longitude: Number(formData.lng) || 0,
      state: formData.state,
      city: formData.city,
      near_college: formData.collegeName,
      listing_title: formData.title,
      room_type: formData.type.toLowerCase() === 'pg' ? 'hostel/pg' : `${formData.type.toLowerCase()} room`,
      monthly_rent: Number(formData.rent)
    };

    try {
      await submitListing(listingData);
      
      // Also update local state for immediate UI feedback
      const newRoom: Room = {
        id: `room-${Date.now()}`,
        title: formData.title,
        type: formData.type,
        rent: Number(formData.rent),
        deposit: Number(formData.deposit),
        location: formData.location || `${formData.city}, ${formData.state}`,
        state: formData.state,
        city: formData.city,
        collegeName: formData.collegeName,
        distance: 0.5,
        photos: Object.values(previews).filter(p => p !== null) as string[],
        isVerified: false,
        isFeatured: false,
        amenities: listingData.wifi ? ['WiFi'] : [], // Simplified for local state
        furnished: formData.furnished,
        attachedBathroom: formData.attachedBathroom,
        ac: formData.ac,
        genderPref: formData.genderPref as any,
        availableFrom: formData.availableFrom || 'Immediately',
        rules: formData.rules.split(',').map(r => r.trim()),
        ownerName: user.name,
        ownerPhone: '+91 9999999999',
        safety: { rating: 4.0, policeProximity: '1km away', lighting: 'Good' },
        reviews: [],
        coordinates: { lat: listingData.latitude, lng: listingData.longitude }
      };

      onAddRoom(newRoom);
      alert('Room listing published successfully to Supabase!');
      setShowAddForm(false);
      // Reset form...
    } catch (error) {
      console.error('Error saving listing:', error);
      alert('Failed to save listing to Supabase.');
    }
  };

  if (showAddForm) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <Logo />
        </div>

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
                {['Room', 'Kitchen', 'Bathroom'].map((part) => (
                  <div 
                    key={part} 
                    onClick={() => handlePhotoClick(part)}
                    className={`relative aspect-square rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                      previews[part] 
                        ? 'border-indigo-500 shadow-lg shadow-indigo-100' 
                        : 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/30'
                    }`}
                  >
                    <input 
                      type="file" 
                      id={`file-input-${part}`}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(part, e)}
                    />
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
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest text-center px-2">Click to add {part} picture</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-500" /> Amenities (Very Important)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                {[
                  { id: 'wifi', label: 'WiFi' },
                  { id: 'powerBackup', label: 'Power Backup' },
                  { id: 'geyser', label: 'Geyser' },
                  { id: 'tv', label: 'TV' },
                  { id: 'refrigerator', label: 'Refrigerator' },
                  { id: 'washingMachine', label: 'Washing Machine' },
                  { id: 'kitchenAccess', label: 'Kitchen Access' },
                  { id: 'microwave', label: 'Microwave' },
                  { id: 'roWater', label: 'RO Water' },
                  { id: 'wardrobe', label: 'Wardrobe' },
                  { id: 'studyTable', label: 'Study Table' },
                  { id: 'cctv', label: 'CCTV' },
                  { id: 'securityGuard', label: 'Security Guard' },
                  { id: 'lift', label: 'Lift' },
                  { id: 'parking', label: 'Parking (Bike/Car)' },
                  { id: 'housekeeping', label: 'Housekeeping' },
                  { id: 'laundryService', label: 'Laundry Service' }
                ].map((amenity) => (
                  <label key={amenity.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name={amenity.id}
                        checked={(formData as any)[amenity.id]}
                        onChange={() => handleToggle(amenity.id)}
                        className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {formData.type === 'PG' && (
              <section className="animate-in fade-in slide-in-from-top-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  🍽 Food Options (For PG/Hostel)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">Food Preference</label>
                      <div className="flex gap-4">
                        {['Veg', 'Non-Veg', 'Both'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, foodType: type }))}
                            className={`px-6 py-3 rounded-xl font-black text-xs transition-all ${
                              formData.foodType === type 
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                                : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">Meals Provided</label>
                      <select 
                        name="mealFrequency"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                        value={formData.mealFrequency}
                        onChange={handleInputChange}
                      >
                        <option value="1">1 Time Meal</option>
                        <option value="2">2 Time Meals</option>
                        <option value="3">3 Time Meals</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'breakfastIncluded', label: 'Breakfast Included' },
                      { id: 'sundaySpecial', label: 'Sunday Special Menu' },
                      { id: 'tiffinFacility', label: 'Tiffin Facility Available' }
                    ].map(opt => (
                      <label key={opt.id} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:border-orange-200 transition-all">
                        <input 
                          type="checkbox" 
                          checked={(formData as any)[opt.id]}
                          onChange={() => handleToggle(opt.id)}
                          className="w-5 h-5 rounded-lg border-2 border-slate-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-xs font-bold text-slate-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                💰 Pricing & Payment Controls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Security Deposit</label>
                  <div className="relative">
                    <IndianRupee size={14} className="absolute left-4 top-4.5 text-slate-400" />
                    <input 
                      type="number" 
                      name="deposit"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                      value={formData.deposit}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Maintenance Charges</label>
                  <div className="relative">
                    <IndianRupee size={14} className="absolute left-4 top-4.5 text-slate-400" />
                    <input 
                      type="number" 
                      name="maintenanceCharges"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                      value={formData.maintenanceCharges}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Electricity</label>
                  <select 
                    name="electricityType"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                    value={formData.electricityType}
                    onChange={handleInputChange}
                  >
                    <option value="Included">Included in Rent</option>
                    <option value="Separate Meter">Separate Meter</option>
                    <option value="Fixed Monthly">Fixed Monthly Extra</option>
                  </select>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Late Payment Fine (per day)</label>
                    <input 
                      type="text" 
                      name="latePaymentFine"
                      placeholder="e.g., ₹100 after 5th of month"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                      value={formData.latePaymentFine}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Discount Offers</label>
                    <input 
                      type="text" 
                      name="discountOffers"
                      placeholder="e.g., 5% off on 6-month advance"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
                      value={formData.discountOffers}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <MapPin size={14} className="text-indigo-500" /> Google Map Location
              </h3>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-4">Enter the exact coordinates of your property to show it on the map.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Latitude</label>
                    <input 
                      type="text" 
                      name="lat"
                      placeholder="e.g., 28.6139"
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700"
                      value={formData.lat}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Longitude</label>
                    <input 
                      type="text" 
                      name="lng"
                      placeholder="e.g., 77.2090"
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700"
                      value={formData.lng}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-indigo-900 uppercase tracking-wider">Map Preview</p>
                    <p className="text-[10px] text-indigo-600 font-bold">Location will be pinned at: {formData.lat || '0'}, {formData.lng || '0'}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      // Mock getting current location
                      navigator.geolocation.getCurrentPosition((pos) => {
                        setFormData(prev => ({
                          ...prev,
                          lat: pos.coords.latitude.toString(),
                          lng: pos.coords.longitude.toString()
                        }));
                      });
                    }}
                    className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 underline uppercase tracking-widest"
                  >
                    Use Current Location
                  </button>
                </div>
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase tracking-widest text-xs transition-all group w-fit"
            >
              <div className="p-2 bg-white border border-slate-100 rounded-xl group-hover:border-indigo-200 transition-all">
                <ArrowLeft size={16} />
              </div>
              <span>Exit</span>
            </button>
            <Logo />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Owner Dashboard 🏢</h1>
            <p className="text-slate-500 font-medium text-lg mt-1">Manage your student housing listings.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 px-8 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Earnings</p>
              <p className="text-lg font-black text-indigo-600">₹45,200</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tenants</p>
              <p className="text-lg font-black text-slate-800">12</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupancy</p>
              <p className="text-lg font-black text-green-500">85%</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-900 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              <button 
                onClick={() => setActiveTab('properties')}
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'properties' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                My Properties
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                Booking Requests
                {bookingRequests.filter(b => b.status === 'pending').length > 0 && (
                  <span className="ml-2 bg-rose-500 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px]">
                    {bookingRequests.filter(b => b.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
            {activeTab === 'properties' && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100"
              >
                <PlusCircle size={20} /> Add New Listing
              </button>
            )}
          </div>

          {activeTab === 'properties' ? (
            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
              {rooms.filter(r => r.ownerName === user.name).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                  {rooms.filter(r => r.ownerName === user.name).map(room => (
                    <div key={room.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 group hover:shadow-xl transition-all">
                      <div className="aspect-video relative overflow-hidden">
                        <img src={room.photos[0] || 'https://picsum.photos/400/300'} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600">
                          {room.type}
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-black text-slate-800 mb-2 line-clamp-1">{room.title}</h4>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-4">
                          <MapPin size={14} /> {room.city}, {room.state}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-black text-indigo-600">₹{room.rent}<span className="text-[10px] text-slate-400 font-bold uppercase">/mo</span></p>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${room.isVerified ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                            {room.isVerified ? 'Verified' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                   <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={28} />
                   </div>
                  <p className="text-slate-400 text-sm font-bold italic">No active listings found for your account. Start by adding one!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm p-8">
              {loadingBookings ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : bookingRequests.length > 0 ? (
                <div className="space-y-4">
                  {bookingRequests.map(booking => (
                    <div key={booking.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                          <UserIcon size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800">{booking.student_name}</h4>
                          <p className="text-xs text-slate-400 font-bold">{booking.student_email}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">{booking.room_title}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Calendar size={10} /> {new Date(booking.move_in_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        {booking.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(booking.id!, 'confirmed')}
                              className="flex-1 md:flex-none bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(booking.id!, 'cancelled')}
                              className="flex-1 md:flex-none bg-white text-slate-400 border border-slate-200 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all"
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {booking.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                   <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={28} />
                   </div>
                  <p className="text-slate-400 text-sm font-bold italic">No booking requests received yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-slate-800">{user.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Owner</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Email</p>
                <p className="text-xs font-bold text-slate-700">{user.email}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                <p className="text-xs font-bold text-slate-700">Oct 2023</p>
              </div>
              <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-black mb-2 relative z-10">Owner Pro Tip 💡</h3>
            <p className="text-xs text-indigo-100 opacity-80 leading-relaxed relative z-10">
              Listings with clear photos of the kitchen and bathroom get 3x more inquiries from students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
