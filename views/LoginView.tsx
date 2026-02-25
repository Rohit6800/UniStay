
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Mail, Lock, User as UserIcon, Building2, ChevronRight, GraduationCap, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

interface LoginViewProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onBack }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    onLogin({
      id: Math.random().toString(),
      name: name || (role === UserRole.STUDENT ? 'Demo Student' : 'Demo Dealer'),
      email: email || 'demo@example.com',
      role: role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-700 relative">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white font-black uppercase tracking-widest text-sm transition-all group"
      >
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl group-hover:bg-white/20 transition-all">
          <ArrowLeft size={20} />
        </div>
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <p className="text-slate-500 font-medium mt-1">Join the student housing network</p>
        </div>

        <div className="flex p-1.5 bg-slate-100 rounded-[1.25rem] mb-8">
          <button 
            onClick={() => setRole(UserRole.STUDENT)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${role === UserRole.STUDENT ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <UserIcon size={16} /> Student
          </button>
          <button 
            onClick={() => setRole(UserRole.DEALER)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${role === UserRole.DEALER ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Building2 size={16} /> Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-4 text-slate-300" size={18} />
                <input 
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
              <input 
                type="text"
                placeholder="email@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-rose-500 text-xs font-black uppercase tracking-widest">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
          >
            {isRegistering ? 'Create Account' : 'Login Now'}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isRegistering ? 'Already a member?' : "New to UniStay?"}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 font-black ml-2 hover:underline"
            >
              {isRegistering ? 'LOGIN' : 'JOIN NOW'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
