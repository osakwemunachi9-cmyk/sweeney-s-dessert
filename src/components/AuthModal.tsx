import React, { useState } from 'react';
import { X, Lock, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ENUGU_AREAS } from '../data/products';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    register,
    setIsAccountDrawerOpen,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regArea, setRegArea] = useState(ENUGU_AREAS[0]);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginEmail, loginPassword);
    setFeedback(res);
    if (res.success) {
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setIsAccountDrawerOpen(true);
      }, 500);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(regName, regEmail, regPhone, regAddress, regArea, 'Enugu');
    setFeedback(res);
    if (res.success) {
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setIsAccountDrawerOpen(true);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-rose-100 bg-[#fdf5f6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 text-[#5c1d2e] rounded-xl">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {mode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
              </h3>
              <span className="text-[11px] text-stone-500">
                Track your order history & Enugu delivery status
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-100/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-rose-100 text-xs font-semibold">
          <button
            onClick={() => {
              setMode('login');
              setFeedback(null);
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'border-b-2 border-[#5c1d2e] text-[#5c1d2e] bg-white'
                : 'text-stone-500 hover:text-stone-800 bg-stone-50/50'
            }`}
          >
            Sign In with Email
          </button>
          <button
            onClick={() => {
              setMode('register');
              setFeedback(null);
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'border-b-2 border-[#5c1d2e] text-[#5c1d2e] bg-white'
                : 'text-stone-500 hover:text-stone-800 bg-stone-50/50'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-medium ${
                feedback.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chidera Eze"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800 block">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="chidera@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800 block">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="0803 000 0000"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">Enugu Delivery Area</label>
                <select
                  value={regArea}
                  onChange={(e) => setRegArea(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-2.5 py-2 text-stone-800 focus:outline-none"
                >
                  {ENUGU_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 12 Rangers Ave, Independence Layout"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer mt-2"
              >
                Create Account
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-center text-stone-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
            <span>Encrypted customer profiles & secure order history</span>
          </div>
        </div>

      </div>
    </div>
  );
};
