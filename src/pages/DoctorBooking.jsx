import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, User, MessageSquare, 
  ChevronLeft, CheckCircle2, AlertCircle, ChevronRight,
  Stethoscope, ShieldCheck, Zap
} from 'lucide-react';

export default function DoctorBooking() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    doctor: '',
    reason: '',
    priority: 'Routine'
  });

  const SPECIALISTS = [
    { id: 1, name: "Dr. Sarah Mitchell", specialty: "Senior Pulmonologist", available: "10:00 AM - 4:00 PM" },
    { id: 2, name: "Dr. James Wilson", specialty: "Thoracic Specialist", available: "09:00 AM - 2:00 PM" },
    { id: 3, name: "Dr. Rajesh Samana", specialty: "Chief Pulmonologist", available: "Online Now" }
  ];

  const TIME_SLOTS = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const REASONS = [
    "Persistent Cough", "Shortness of Breath", "Chest Pain", 
    "Regular Checkup", "Follow-up", "Diagnostic Review"
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleBooking = () => {
    setStep(4); // Success phase
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-primary animate-fade-in pb-20 overflow-hidden relative">
      
      {/* ── HEADER ── */}
      <div className="px-6 py-8 flex items-center gap-6 border-b border-white/5 bg-[#0a0c10]/40 backdrop-blur-xl">
        <button 
          onClick={() => step > 1 && step < 4 ? prevStep() : window.history.back()} 
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-xl"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <div>
           <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Clinical Appointment System</span>
           </div>
           <h1 className="text-2xl font-black text-white tracking-tighter">Schedule Consultation</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 pt-12">
        
        {/* Progress Stepper */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-12 px-10">
             {[1, 2, 3].map((s) => (
               <React.Fragment key={s}>
                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-white/20 border border-white/5'}`}>
                    {step > s ? <CheckCircle2 size={20} /> : s}
                 </div>
                 {s < 3 && <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${step > s ? 'bg-blue-600' : 'bg-white/5'}`} />}
               </React.Fragment>
             ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                 <h2 className="text-2xl font-black text-white tracking-tight">Select a Specialist</h2>
                 <p className="text-sm text-text-secondary mt-2">Choose the expert you wish to consult with.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {SPECIALISTS.map((doc) => (
                   <button 
                    key={doc.id}
                    onClick={() => { setBookingData({...bookingData, doctor: doc.name}); nextStep(); }}
                    className={`p-6 rounded-[32px] border text-left transition-all flex items-center justify-between group ${bookingData.doctor === doc.name ? 'bg-blue-600/20 border-blue-500 shadow-2xl shadow-blue-600/10' : 'bg-card border-border-subtle hover:border-white/20'}`}
                   >
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                           <Stethoscope size={28} />
                        </div>
                        <div>
                           <h4 className="text-base font-black text-white">{doc.name}</h4>
                           <p className="text-xs text-text-muted font-medium">{doc.specialty}</p>
                           <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">{doc.available}</p>
                        </div>
                     </div>
                     <ChevronRight className="text-white/20 group-hover:text-white transition-colors" />
                   </button>
                 ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Date Picker (Mock) */}
                 <div className="space-y-4">
                    <label className="text-xs font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                       <CalendarIcon size={14} /> Preferred Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all shadow-inner"
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    />
                 </div>

                 {/* Time Picker */}
                 <div className="space-y-4">
                    <label className="text-xs font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                       <Clock size={14} /> Available Slots
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                       {TIME_SLOTS.map((t) => (
                         <button 
                           key={t}
                           onClick={() => setBookingData({...bookingData, time: t})}
                           className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${bookingData.time === t ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'}`}
                         >
                            {t}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="flex justify-between pt-10">
                 <button onClick={prevStep} className="px-8 py-4 text-xs font-black text-text-muted uppercase tracking-widest">Back</button>
                 <button 
                   disabled={!bookingData.date || !bookingData.time}
                   onClick={nextStep} 
                   className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 disabled:opacity-30"
                 >
                    Continue
                 </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                 <div className="space-y-4">
                    <label className="text-xs font-black text-text-muted uppercase tracking-widest">Reason for Visit</label>
                    <div className="grid grid-cols-2 gap-3">
                       {REASONS.map((r) => (
                         <button 
                           key={r}
                           onClick={() => setBookingData({...bookingData, reason: r})}
                           className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border text-left transition-all ${bookingData.reason === r ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'}`}
                         >
                            {r}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-xs font-black text-text-muted uppercase tracking-widest">Additional Notes (Optional)</label>
                    <textarea 
                      placeholder="Describe your symptoms briefly..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-white outline-none focus:border-blue-500 transition-all min-h-[120px] resize-none"
                    />
                 </div>
              </div>

              <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-[40px] flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                       <Zap className="text-white" size={24} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-white">Summary for {bookingData.doctor}</p>
                       <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{bookingData.date} • {bookingData.time} • {bookingData.reason}</p>
                    </div>
                 </div>
                 <button 
                  onClick={handleBooking}
                  className="px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:scale-105 transition active:scale-95"
                 >
                    Confirm Appointment
                 </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-24 h-24 rounded-[40px] bg-emerald-500 flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/40">
                 <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Appointment Confirmed!</h2>
              <p className="text-base text-text-secondary max-w-[400px] leading-relaxed mb-10">
                 Your clinical consultation with <span className="text-white font-bold">{bookingData.doctor}</span> is scheduled for <span className="text-white font-bold">{bookingData.date}</span> at <span className="text-white font-bold">{bookingData.time}</span>.
              </p>
              
              <div className="flex gap-4">
                 <button 
                  onClick={() => window.history.back()}
                  className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition"
                 >
                    Back to Dashboard
                 </button>
                 <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition">
                    View My Schedule
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
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Secure Clinical Link</span>
         </div>
      </div>
    </div>
  );
}
