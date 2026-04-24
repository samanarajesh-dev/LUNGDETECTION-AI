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
      last_name: lastName
    });

    if (!error) {
      navigate('/home');
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
        className="w-full max-w-[440px] glassmorphism rounded-2xl p-8 z-10 relative"
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🫁</div>
          <h1 className="text-2xl font-bold text-text-primary">
            LungDetect <span className="text-brand-teal-light">AI</span>
          </h1>
          <p className="text-text-secondary text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Custom Toggle inside dark bg */}
        <div className="bg-input rounded-full p-1 flex mb-8">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${loginRole === 'patient' ? 'bg-card text-text-primary shadow' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('patient'); setIsSignUp(false); }}
          >
            Patient
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${loginRole === 'doctor' ? 'bg-card text-text-primary shadow' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('doctor'); setIsSignUp(false); }}
          >
            Doctor
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${loginRole === 'admin' ? 'bg-card text-text-primary shadow' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => { setLoginRole('admin'); setIsSignUp(false); }}
          >
            Admin
          </button>
        </div>

        {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
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
                className="w-full bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus transition-colors"
                required={isSignUp}
              />
              <input 
                type="text" 
                placeholder="Last name" 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus transition-colors"
                required={isSignUp}
              />
            </div>
          )}
          <div>
            <input 
              type={loginRole === 'doctor' ? 'text' : 'email'} 
              placeholder={loginRole === 'doctor' ? 'Username / Doctor ID' : 'Email address'} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus transition-colors"
              required
            />
          </div>
          <div>
            <input 
               type="password" 
               placeholder="Current password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               className="w-full bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus transition-colors"
               required
            />
            {(!isSignUp && (loginRole === 'patient' || loginRole === 'doctor')) && (
              <div className="flex justify-end mt-2">
                <button type="button" className="text-xs text-brand-teal hover:text-brand-teal-light hover:underline transition-colors">
                  Forgot password?
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
                 className="w-full bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus transition-colors"
                 required={isSignUp}
              />
            </div>
          )}
          
          <button type="submit" className="w-full bg-gradient-button text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSignUp ? 'Create Account' : `${loginRole.charAt(0).toUpperCase() + loginRole.slice(1)} Login`} <ArrowRight size={18} />
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
