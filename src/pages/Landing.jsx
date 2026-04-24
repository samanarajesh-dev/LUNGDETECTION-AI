import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scan, Layers, Flame, Mic, Activity, FileText, 
  BarChart2, ShieldAlert, Lock, Image as ImageIcon, 
  Settings, Bot, Eye, GitMerge, CheckCircle2, ArrowRight,
  Star, Brain, Target, Heart, LayoutDashboard, Download
} from 'lucide-react';
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0b0e14] text-white font-body overflow-x-hidden selection:bg-brand-teal/30">
      <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex flex-col">
      {/* Animated Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundPosition: 'center center'
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🫁</span>
          <span className="text-lg font-heading font-bold tracking-tight">
            LungDetect <span className="text-brand-teal-light">AI</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-primary/30 border border-brand-teal-light/30 rounded-full px-4 py-1.5 glassmorphism">
            <div className="w-2 h-2 rounded-full bg-brand-teal-light shadow-[0_0_8px_#4FD1C5]" />
            <span className="text-xs font-medium text-brand-teal-light">AI Online</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-white text-brand-blue hover:bg-gray-100 font-medium text-sm px-5 py-2.5 rounded-full transition-colors active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 -mt-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 glassmorphism flex items-center gap-2"
        >
          <span className="text-xs text-text-secondary font-medium tracking-wide">
            ⚕ Multi-Model AI Ensemble • Grad-CAM Heatmaps
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl sm:text-[80px] leading-[1.1] font-heading font-bold tracking-tight text-white mb-6"
        >
          Medical-Grade AI<br/>Lung Health Platform
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[16px] text-text-secondary max-w-[600px] mb-12 leading-relaxed"
        >
          Analyze chest X-rays with dual-model AI ensemble, detect respiratory diseases, and get AI-powered health insights — all in one platform.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-50 font-semibold text-[15px] px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98]"
          >
            Get Started →
          </button>
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/5 border border-white/20 text-white font-medium text-[15px] px-8 py-3.5 rounded-full transition-all active:scale-[0.98]">
            See How It Works ›
          </button>
        </motion.div>

      </main>

      {/* Animated Audio Waveform */}
      <div className="absolute bottom-0 w-full h-[15vh] flex flex-col items-center justify-end pb-8">
        <div className="relative">
          <div className="flex items-end gap-1.5 h-16 opacity-30">
            {[...Array(40)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 100}%`, `${Math.random() * 40 + 20}%`] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                className="w-1.5 bg-brand-teal-light rounded-t-sm"
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center -top-6">
            <div className="bg-primary/80 border border-brand-teal-light/30 rounded-full px-4 py-1.5 flex items-center gap-2 glassmorphism backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_8px_#319795]" />
               <span className="text-xs text-brand-teal-light font-medium tracking-wide">AI Analyzing...</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Platform Capabilities Section */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-brand-blue-light font-semibold tracking-wider text-sm mb-3 uppercase">Platform Capabilities</h3>
          <h2 className="text-4xl md:text-[44px] font-heading font-bold leading-tight">Everything for respiratory<br/>health intelligence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Scan, title: "X-Ray Disease Detection", desc: "Upload chest X-rays for AI screening of pneumonia, TB, COPD, effusion, cardiomegaly, and 12+ conditions." },
            { icon: Layers, title: "Multi-Model Ensemble", desc: "Triple AI models analyze independently and results are fused for higher accuracy with consensus tracking." },
            { icon: Flame, title: "Grad-CAM Heatmaps", desc: "Visual overlay highlighting affected lung regions with severity-coded colors directly on your X-ray image." },
            { icon: Mic, title: "AI Cough Analysis", desc: "Record or upload cough audio for instant AI classification, severity scoring, and acoustic pattern analysis." },
            { icon: Activity, title: "Lung Health Score", desc: "Weighted 100-point score factoring symptoms, SpO2, AQI, age, and medical history into a single metric." },
            { icon: FileText, title: "Medical PDF Reports", desc: "Download structured radiology-style reports with findings, Grad-CAM regions, confidence metrics, and recommendations." },
            { icon: BarChart2, title: "Health Analytics", desc: "Comprehensive charts showing severity trends, cough frequency, X-ray confidence, and risk progression." },
            { icon: ShieldAlert, title: "Risk Stratification", desc: "AI-powered risk assessment with low/moderate/high/critical levels and confidence thresholds." },
            { icon: Lock, title: "Secure & Private", desc: "Full authentication, encrypted data storage, and secure cloud processing. Your data stays private." },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[#121824] border border-[#1e2738] rounded-2xl p-6 hover:border-[#2d3a54] transition-colors"
            >
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-5 border border-brand-blue/20">
                <feature.icon className="w-6 h-6 text-brand-blue-light" />
              </div>
              <h4 className="text-[17px] font-bold mb-2">{feature.title}</h4>
              <p className="text-[#94a3b8] text-[14px] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#090c14] border-y border-[#1e2738]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-brand-blue-light font-semibold tracking-wider text-sm mb-3 uppercase">How It Works</h3>
            <h2 className="text-4xl md:text-[44px] font-heading font-bold mb-4 leading-tight">Clinical-grade AI in<br/><span className="text-brand-teal-light">three simple steps</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-10">
            {[
              { num: "01", icon: Scan, title: "Upload X-Ray or Cough", desc: "Upload a chest X-ray image for disease detection, or record a cough sample for acoustic analysis. Our preprocessing pipeline validates and enhances your input." },
              { num: "02", icon: Brain, title: "Triple-Model AI Analysis", desc: "Three independent AI models (Gemini Pro + GPT-5 + Gemini 3.1 Pro) analyze simultaneously. Results are ensembled for higher accuracy with consensus detection." },
              { num: "03", icon: Target, title: "Get Visual Results", desc: "Receive Grad-CAM heatmap overlays, differential diagnoses, risk assessment, and downloadable PDF medical reports with full findings." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#121824] border border-[#1e2738] rounded-2xl p-8 relative pt-10 mt-6 md:mt-0"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(49,151,149,0.5)]">
                  {step.num}
                </div>
                <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 border border-brand-blue/20">
                  <step.icon className="w-7 h-7 text-brand-blue-light" />
                </div>
                <h4 className="text-[19px] font-bold mb-3">{step.title}</h4>
                <p className="text-[#94a3b8] text-[15px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h3 className="text-brand-blue-light font-semibold tracking-wider text-sm mb-3 uppercase">AI Technology</h3>
          <h2 className="text-4xl md:text-[44px] font-heading font-bold mb-6 leading-tight">Multi-model ensemble<br/>for clinical-grade<br/>accuracy</h2>
          <p className="text-[#94a3b8] text-lg mb-8 leading-relaxed max-w-md">
            Our X-ray analysis pipeline uses two state-of-the-art AI models running in parallel, with results fused through a weighted ensemble for maximum diagnostic reliability.
          </p>
          <ul className="space-y-4">
            {[
              "Gemini 2.5 Pro + GPT-5 + Gemini 3.1 Pro triple-model ensemble",
              "Grad-CAM heatmap visualization of findings",
              "Systematic A-B-C-D-E radiology methodology",
              "Automated preprocessing & image validation",
              "Confidence thresholds with radiologist referral",
              "Differential diagnoses with reasoning"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-teal-light shrink-0 mt-0.5" />
                <span className="text-[#cbd5e1] font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#121824] border border-[#1e2738] rounded-2xl p-6 md:p-8 shadow-2xl relative"
          >
            <div className="text-xs text-[#94a3b8] font-bold tracking-wider mb-8 pl-2 uppercase">X-Ray Analysis Pipeline</div>
            <div className="space-y-7 relative before:content-[''] before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-blue-light/20">
              {[
                { icon: ImageIcon, title: "Image Upload", desc: "Chest X-ray (PA/AP view)", color: "text-gray-400" },
                { icon: Settings, title: "Preprocessing", desc: "Resize, normalize, validate, enhance", color: "text-gray-400" },
                { icon: Bot, title: "Gemini 2.5 Pro", desc: "Model 1 — Vision analysis", color: "text-brand-blue-light" },
                { icon: Eye, title: "GPT-5 Vision", desc: "Model 2 — Independent analysis", color: "text-brand-teal-light" },
                { icon: GitMerge, title: "Ensemble Fusion", desc: "Merge, consensus check, confidence boost", color: "text-indigo-400" },
                { icon: Flame, title: "Grad-CAM Heatmap", desc: "Region-level finding visualization", color: "text-red-400" },
                { icon: FileText, title: "Results & Report", desc: "Diagnosis, risk level, PDF download", color: "text-green-400" },
              ].map((step, i) => (
                <div key={i} className="flex gap-5 relative z-10">
                  <div className="w-12 h-12 bg-[#1a2333] border border-[#2d3a54] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div className="pt-1">
                    <div className="font-bold text-[15px]">{step.title}</div>
                    <div className="text-[13px] text-[#94a3b8]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-6 bg-[#121824] border-y border-[#1e2738]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-brand-blue-light font-semibold tracking-wider text-sm mb-3 uppercase">Why It Matters</h3>
            <h2 className="text-4xl md:text-[44px] font-heading font-bold mb-4 leading-tight">The power of early detection</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">Respiratory diseases are among the leading causes of death worldwide. Regular monitoring and early detection can dramatically improve outcomes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { num: "339M", label: "Asthma patients globally" },
              { num: "3rd", label: "Leading cause of death (COPD)" },
              { num: "2.5M", label: "Pneumonia deaths annually" },
              { num: "80%", label: "Better outcomes with early detection" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#171e2b] border border-[#1e2738] rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-heading font-bold text-brand-blue-light mb-2">{stat.num}</div>
                <div className="text-xs text-text-secondary leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Activity, color: "text-green-400", title: "Early Risk Detection", desc: "Respiratory conditions are up to 5x more treatable when detected in early stages. Regular monitoring reveals subtle changes before they become serious." },
              { icon: BarChart2, color: "text-brand-teal-light", title: "Track Progression", desc: "Build a personal health timeline with each analysis. Spot worsening trends, measure treatment effectiveness, and share data with your doctor." },
              { icon: ShieldAlert, color: "text-brand-blue-light", title: "Reduce Hospital Visits", desc: "AI preliminary screening helps you understand when home care is sufficient and when professional attention is truly needed." },
              { icon: Heart, color: "text-red-400", title: "Better Quality of Life", desc: "Understanding your respiratory patterns empowers informed lifestyle choices — from exercise modifications to environmental adjustments." },
            ].map((card, i) => (
              <div key={i} className="bg-[#171e2b] border border-[#1e2738] rounded-2xl p-6 sm:p-8 flex items-start gap-5 shadow-lg">
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-[#121824] flex items-center justify-center border border-[#1e2738]">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-[17px] mb-2">{card.title}</h4>
                  <p className="text-[14px] text-[#94a3b8] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpse & Testimonials */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto text-center w-full">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">A glimpse inside the platform</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-32">
          {[
            { icon: Scan, title: "X-Ray Analysis", desc: "Ensemble AI + Grad-CAM heatmaps", grad: "from-[#0F3D52] to-[#0E6E6E]" },
            { icon: LayoutDashboard, title: "Health Dashboard", desc: "Score, AQI, trends & quick actions", grad: "from-[#1B4F8A] to-[#2b6cb0]" },
            { icon: Mic, title: "Cough Analysis", desc: "Record, analyze & AI classification", grad: "from-[#0d9488] to-[#115e59]" },
            { icon: Download, title: "PDF Reports", desc: "Structured medical reports", grad: "from-[#0284c7] to-[#0369a1]" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }} 
              className="w-[220px] text-left"
            >
              <div className={`w-full aspect-[4/3] rounded-[20px] mb-4 bg-gradient-to-br ${item.grad} p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-white/5`}>
                <item.icon className="w-10 h-10 text-white/90" />
              </div>
              <h4 className="font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-[12px] text-text-secondary leading-tight pr-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#121824] border border-[#1e2738] rounded-3xl p-8 md:p-14 max-w-[1000px] mx-auto text-left relative overflow-hidden shadow-2xl">
          <div className="text-center mb-4 text-brand-blue-light font-semibold tracking-wider text-sm uppercase">Testimonials</div>
          <h2 className="text-3xl md:text-[40px] font-heading font-bold text-center mb-14">Trusted by professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                text: "The multi-model ensemble approach provides remarkably reliable screening. The Grad-CAM heatmaps help patients understand their results visually.",
                author: "Dr. Sarah Chen", role: "Pulmonologist", init: "D", bg: "bg-[#0ea5e9]"
              },
              { 
                text: "The X-ray analysis correctly identified my pneumonia and the heatmap showed exactly where. The PDF report was incredibly detailed and professional.",
                author: "James Wilson", role: "Patient", init: "J", bg: "bg-[#319795]"
              },
              { 
                text: "Triple-model consensus with confidence thresholds is exactly the right approach for AI screening. This is one of the best tools I've seen.",
                author: "Dr. Priya Sharma", role: "Radiologist", init: "D", bg: "bg-[#8b5cf6]"
              }
            ].map((test, i) => (
              <div key={i} className="bg-[#1a2333] border border-[#2d3a54] rounded-2xl p-7 flex flex-col justify-between hover:border-[#384868] transition-colors">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#0ea5e9] text-[#0ea5e9]" />)}
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#cbd5e1] mb-8">"{test.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${test.bg} flex items-center justify-center font-bold text-white shadow-md text-sm`}>
                    {test.init}
                  </div>
                  <div>
                    <div className="font-bold text-[13px]">{test.author}</div>
                    <div className="text-xs text-[#94a3b8]">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-6 relative max-w-[1000px] mx-auto w-full lg:px-0 mt-5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0F3D52] to-[#0E6E6E] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden border border-[#319795]/30 shadow-[0_20px_50px_rgba(14,110,110,0.25)] mx-auto"
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10">
            <ShieldAlert className="w-14 h-14 text-white/90 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white leading-tight">Analyze Your Chest X-Ray<br/>with AI in Seconds</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">Join the LungDetect platform for multi-model AI analysis, Grad-CAM heatmaps, and professional medical reports.</p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-[#0F3D52] hover:bg-gray-50 font-bold px-10 py-4 rounded-full shadow-xl transition-all active:scale-[0.98] flex items-center gap-2 mx-auto text-[15px]"
            >
              Start Free Analysis <ArrowRight className="w-5 h-5 ml-1" />
            </button>
            <p className="text-white/50 text-[11px] mt-6 font-medium uppercase tracking-wider">Free to use • Educational tool • Not biological advice</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
