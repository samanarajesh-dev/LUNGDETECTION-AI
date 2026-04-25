import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, User, Mail, Phone, Calendar as CalendarIcon, 
  ChevronLeft, CheckCircle2, ShieldCheck, Fingerprint,
  Stethoscope, Droplets, UserCheck, Search, Plus
} from 'lucide-react';

export default function DoctorPatientReg() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    patientId: `LD-${Math.floor(100000 + Math.random() * 900000)}`
  });

  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleRegister = () => {
    // In a real app, this would call Supabase to create a patient profile
    setStep(3); // Success phase
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-primary animate-fade-in pb-20 overflow-hidden relative">
      
      {/* ── HEADER ── */}
      <div className="px-6 py-8 flex items-center gap-6 border-b border-white/5 bg-[#0a0c10]/40 backdrop-blur-xl">
        <button 
          onClick={() => step > 1 && step < 3 ? handleBack() : window.history.back()} 
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-xl"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <div>
           <div className="flex items-center gap-2 mb-1">
              <UserPlus size={14} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Patient Intake Portal</span>
           </div>
           <h1 className="text-2xl font-black text-white tracking-tighter">Register New Patient</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 pt-12">
        
        {/* Progress Stepper */}
        {step < 3 && (
          <div className="flex items-center justify-center mb-12 gap-4">
             {[1, 2].map((s) => (
               <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-white/5'}`} />
             ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">First Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                        type="text" placeholder="John" 
                        value={patientData.firstName}
                        onChange={(e) => setPatientData({...patientData, firstName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Last Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                        type="text" placeholder="Doe" 
                        value={patientData.lastName}
                        onChange={(e) => setPatientData({...patientData, lastName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                        type="email" placeholder="john.doe@example.com" 
                        value={patientData.email}
                        onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                        type="tel" placeholder="+91 98765 43210" 
                        value={patientData.phone}
                        onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all shadow-inner"
                       />
                    </div>
                 </div>
              </div>

              <div className="flex justify-end pt-10">
                 <button 
                   disabled={!patientData.firstName || !patientData.email}
                   onClick={handleNext} 
                   className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 disabled:opacity-30 flex items-center gap-3 group"
                 >
                    Next Step <CheckCircle2 className="group-hover:translate-x-1 transition-transform" size={18} />
                 </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Date of Birth</label>
                    <div className="relative">
                       <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                        type="date" 
                        value={patientData.dob}
                        onChange={(e) => setPatientData({...patientData, dob: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Blood Group</label>
                    <div className="relative">
                       <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <select 
                        value={patientData.bloodGroup}
                        onChange={(e) => setPatientData({...patientData, bloodGroup: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all appearance-none"
                       >
                          <option value="" className="bg-[#0a0c10]">Select Group</option>
                          {BLOOD_GROUPS.map(g => <option key={g} value={g} className="bg-[#0a0c10]">{g}</option>)}
                       </select>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Gender</label>
                 <div className="flex flex-wrap gap-3">
                    {GENDERS.map((g) => (
                      <button 
                        key={g}
                        onClick={() => setPatientData({...patientData, gender: g})}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${patientData.gender === g ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'}`}
                      >
                         {g}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[40px] flex items-center justify-between mt-10">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg">
                       <Fingerprint className="text-white" size={28} />
                    </div>
                    <div>
                       <p className="text-xs font-black text-white uppercase tracking-widest">Assigned Patient ID</p>
                       <p className="text-xl font-black text-emerald-400 tracking-tighter mt-1">{patientData.patientId}</p>
                    </div>
                 </div>
                 <button 
                  onClick={handleRegister}
                  className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 hover:scale-105 transition active:scale-95"
                 >
                    Finalize Registration
                 </button>
              </div>

              <div className="flex justify-start">
                 <button onClick={handleBack} className="px-8 py-4 text-xs font-black text-text-muted uppercase tracking-widest hover:text-white transition">Back</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-24 h-24 rounded-[40px] bg-emerald-500 flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/40">
                 <UserCheck size={48} />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Registration Successful!</h2>
              <p className="text-base text-text-secondary max-w-[450px] leading-relaxed mb-10">
                 Patient <span className="text-white font-bold">{patientData.firstName} {patientData.lastName}</span> has been successfully onboarded to the LungDetect Clinical Network with ID: <span className="text-emerald-400 font-bold">{patientData.patientId}</span>.
              </p>
              
              <div className="flex gap-4">
                 <button 
                  onClick={() => navigate('/doctor-home')}
                  className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition"
                 >
                    Return to Hub
                 </button>
                 <button 
                  onClick={() => navigate('/patient-card')}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition"
                 >
                    View Patient Card
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Security Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Enterprise Data Encryption</span>
         </div>
      </div>
    </div>
  );
}
