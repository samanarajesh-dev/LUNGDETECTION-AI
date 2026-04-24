import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, User, ShieldCheck, Activity, Globe, Chrome, Loader2 } from 'lucide-react';

export default function Login() {
  const [loginRole, setLoginRole] = useState('patient');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsGuest();
      navigate('/home');
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (isSignUp && password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const { error } = await signIn(email, password, isSignUp, {
      role: loginRole,
      first_name: firstName,
      last_name: lastName
    });

    if (!error) {
      navigate('/home');
    } else {
      setErrorMsg(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[160px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      {/* ── LOGO & HEADER ── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-20 mb-10"
      >
        <div className="relative inline-block mb-6">
           <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
           <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[28px] flex items-center justify-center shadow-2xl border border-white/20">
              <Activity size={40} className="text-white" />
           </div>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
          LungDetect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI</span>
        </h1>
        <p className="text-text-secondary text-sm font-medium tracking-wide uppercase">The Future of Respiratory Intelligence</p>
      </motion.div>

      {/* ── LOGIN CARD ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[480px] bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 z-10 relative shadow-3xl"
      >
        {/* Role Selector */}
        <div className="bg-white/5 p-1.5 rounded-[24px] flex mb-10 border border-white/5">
          {['patient', 'doctor', 'admin'].map((role) => (
            <button 
              key={role}
              type="button"
              className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-[18px] transition-all duration-300 ${loginRole === role ? 'bg-white text-gray-900 shadow-xl' : 'text-white/40 hover:text-white'}`}
              onClick={() => { setLoginRole(role); setIsSignUp(false); }}
            >
              {role}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? 'signup' : 'login'}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      required
                    />
                  </div>
                  <input 
                    type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                  required
                />
              </div>

              {isSignUp && (
                 <div className="relative">
                 <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                   type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                   required
                 />
               </div>
              )}

              {errorMsg && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-xs font-bold text-center">{errorMsg}</motion.p>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-3xl shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : (isSignUp ? 'Initialize Account' : 'Authenticate')}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
           <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all"
           >
              {isSignUp ? 'Existing User? Login' : 'New User? Sign Up'}
           </button>
           <button className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-all">
              Recover Access
           </button>
        </div>

        <div className="relative my-10">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
           <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-[#0a0c10] px-4 text-white/20">Secured Entry</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
            onClick={handleDemoAccess}
            className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all active:scale-[0.98]"
           >
              <Chrome size={18} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
           </button>
           <button 
            onClick={handleDemoAccess}
            className="flex items-center justify-center gap-3 py-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400 hover:bg-blue-600/30 transition-all active:scale-[0.98]"
           >
              <Globe size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Guest</span>
           </button>
        </div>

      </motion.div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center gap-8 text-white/20"
      >
         <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">HIPAA Compliant</span>
            <div className="h-[2px] w-8 bg-blue-500/20 rounded-full" />
         </div>
         <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI-Powered</span>
            <div className="h-[2px] w-8 bg-emerald-500/20 rounded-full" />
         </div>
         <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted</span>
            <div className="h-[2px] w-8 bg-indigo-500/20 rounded-full" />
         </div>
      </motion.div>
    </div>
  );
}
