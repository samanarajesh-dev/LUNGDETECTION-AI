import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const [loginRole, setLoginRole] = useState('patient');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const { signIn, signInWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleGoogleBtnClick = () => {
    // Use guest mode to bypass Supabase and grant full dashboard access
    loginAsGuest();
    navigate('/home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp && password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const { error } = await signIn(email, password, isSignUp, {
      role: loginRole,
      first_name: firstName,
      last_name: lastName,
      license_id: licenseId
    });

    if (!error) {
      if (loginRole === 'doctor') {
        navigate('/doctor-home');
      } else {
        navigate('/home');
      }
    } else {
      setErrorMsg(error);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-teal rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] glassmorphism rounded-[32px] p-8 z-10 relative border border-white/10"
      >
        <div className="text-center mb-8">
          <motion.div 
            key={loginRole}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-5xl mb-4"
          >
            {loginRole === 'doctor' ? '👨‍⚕️' : loginRole === 'admin' ? '🛡️' : '🫁'}
          </motion.div>
          <h1 className="text-3xl font-black text-text-primary tracking-tighter">
            LungDetect <span className="text-brand-teal-light">AI</span>
          </h1>
          <div className="flex justify-center mt-2">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${loginRole === 'doctor' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {loginRole === 'doctor' ? 'Clinical Portal Active' : 'Patient Portal'}
             </span>
          </div>
        </div>

        {/* Custom Toggle inside dark bg */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-1.5 flex mb-8">
          <button 
            type="button"
            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${loginRole === 'patient' ? 'bg-card text-text-primary shadow-xl' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('patient'); setIsSignUp(false); }}
          >
            Patient
          </button>
          <button 
            type="button"
            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${loginRole === 'doctor' ? 'bg-card text-text-primary shadow-xl' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('doctor'); setIsSignUp(false); }}
          >
            Doctor
          </button>
          <button 
            type="button"
            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${loginRole === 'admin' ? 'bg-card text-text-primary shadow-xl' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('admin'); setIsSignUp(false); }}
          >
            Admin
          </button>
        </div>

        {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold text-center animate-pulse">
                {errorMsg}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="First name" 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-teal transition-all"
                required={isSignUp}
              />
              <input 
                type="text" 
                placeholder="Last name" 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-teal transition-all"
                required={isSignUp}
              />
            </div>
          )}

          {loginRole === 'doctor' && (
            <div className="relative">
               <input 
                type="text" 
                placeholder="Medical License ID" 
                value={licenseId}
                onChange={e => setLicenseId(e.target.value)}
                className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl px-4 py-4 text-sm text-white placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                required={loginRole === 'doctor'}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/30 text-[10px] font-black uppercase tracking-widest">Verify</div>
            </div>
          )}

          <div>
            <input 
              type={loginRole === 'doctor' ? 'text' : 'email'} 
              placeholder={loginRole === 'doctor' ? 'Clinical Username' : 'Email address'} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-teal transition-all"
              required
            />
          </div>
          <div>
            <input 
               type="password" 
               placeholder="Access password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-teal transition-all"
               required
            />
            {(!isSignUp && (loginRole === 'patient' || loginRole === 'doctor')) && (
              <div className="flex justify-end mt-2">
                <button type="button" className="text-[11px] font-bold text-brand-teal hover:text-brand-teal-light transition-colors">
                  Recovery Access?
                </button>
              </div>
            )}
          </div>
          {isSignUp && (
            <div>
              <input 
                 type="password" 
                 placeholder="Re-enter password"
                 value={confirmPassword}
                 onChange={e => setConfirmPassword(e.target.value)}
                 className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-teal transition-all"
                 required={isSignUp}
              />
            </div>
          )}
          
          <button type="submit" className={`w-full py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl ${loginRole === 'doctor' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-gradient-button shadow-emerald-500/20'}`}>
            {isSignUp ? 'Create Account' : loginRole === 'doctor' ? 'Enter Clinical Portal' : 'Access Dashboard'} <ArrowRight size={18} />
          </button>
        </form>

        {(loginRole === 'patient' || loginRole === 'doctor') && (
          <div className="mt-6 text-center text-sm text-text-secondary">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="text-brand-teal hover:text-brand-teal-light hover:underline font-medium transition-colors"
            >
              {isSignUp ? 'Login' : 'Sign up'}
            </button>
          </div>
        )}

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-border-subtle"></div>
          <span className="px-3 text-xs text-text-muted">or continue with</span>
          <div className="flex-1 border-t border-border-subtle"></div>
        </div>

        <button 
          onClick={handleGoogleBtnClick}
          type="button"
          className="w-full bg-input hover:bg-hover border border-border-subtle text-text-primary font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          Continue with Google
        </button>

        <button
          onClick={handleGoogleBtnClick}
          type="button"
          className="w-full mt-3 bg-transparent hover:bg-hover border border-dashed border-border-subtle text-text-muted hover:text-text-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm active:scale-[0.98]"
        >
          🧪 Continue as Guest (Demo Mode)
        </button>

      </motion.div>
      <div className="mt-8 text-center text-xs text-text-muted max-w-[300px]">
        For research & educational use only. Always consult a qualified physician.
      </div>
    </div>
  );
}
