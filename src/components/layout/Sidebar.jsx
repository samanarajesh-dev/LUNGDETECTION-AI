import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Activity as LungsIcon, 
  Home, 
  MessageSquare, 
  Scan, 
  Stethoscope,
  Mic, 
  Wind, 
  BarChart2, 
  Video, 
  MapPin, 
  Pill, 
  Settings,
  LogOut,
  Calendar,
  ClipboardList,
  BookOpen,
  Package,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const patientNavItems = {
  main: [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope, path: '/symptom-checker' },
    { id: 'chat', label: 'AI Doctor', icon: MessageSquare, path: '/chat' },
    { id: 'xray', label: 'X-Ray Analysis', icon: Scan, path: '/xray' },
    { id: 'cough', label: 'Cough Detect', icon: Mic, path: '/cough-detect' },
    { id: 'breathing', label: 'Breathing', icon: Wind, path: '/breathing' },
  ],
  secondary: [
    { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
    { id: 'telemedicine', label: 'Telemedicine', icon: Video, path: '/telemedicine' },
    { id: 'hospitals', label: 'Nearby Hospitals', icon: MapPin, path: '/hospitals' },
    { id: 'medications', label: 'Medications', icon: Pill, path: '/medications' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]
};

const doctorNavItems = {
  main: [
    { id: 'doctor-home', label: 'Dashboard', icon: Home, path: '/doctor-home' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/doctor-home' },
    { id: 'ehr', label: 'EHR Records', icon: BookOpen, path: '/doctor-home' },
    { id: 'patients', label: 'Patient Roster', icon: Users, path: '/doctor-home' },
    { id: 'tele', label: 'Telemedicine', icon: Video, path: '/telemedicine' },
  ],
  secondary: [
    { id: 'prescriptions', label: 'E-Prescriptions', icon: ClipboardList, path: '/doctor-home' },
    { id: 'inventory', label: 'Inventory', icon: Package, path: '/doctor-home' },
    { id: 'analytics-doc', label: 'Revenue Analytics', icon: BarChart2, path: '/doctor-home' },
    { id: 'security', label: 'Security Center', icon: ShieldCheck, path: '/doctor-home' },
    { id: 'settings-doc', label: 'Portal Settings', icon: Settings, path: '/settings' },
  ]
};

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const isDoctor = user?.user_metadata?.role === 'doctor';
  const navData = isDoctor ? doctorNavItems : patientNavItems;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const renderNavItem = (item) => (
    <NavLink
      key={item.id}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center w-full min-h-[40px] px-3 rounded-lg mb-1 transition-colors duration-150 relative ${
          isActive 
            ? 'bg-active text-text-primary' 
            : 'bg-transparent text-text-secondary hover:bg-hover hover:text-text-primary'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-brand-blue-light rounded-r-md" />
          )}
          <item.icon size={18} className="shrink-0" />
          <span className="ml-3 text-[13px] font-medium leading-[40px]">{item.label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-secondary border-r border-border-subtle flex flex-col z-50">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-5 shrink-0">
        <LungsIcon className={isDoctor ? "text-blue-500 mr-3" : "text-brand-blue-light mr-3"} size={24} />
        <span className="text-[16px] font-medium text-text-primary tracking-tight">
           {isDoctor ? 'Clinical Portal' : 'LungDetect AI'}
        </span>
      </div>

      {/* Nav Section */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none flex flex-col gap-1">
        <div className="mb-2">
           {isDoctor && <p className="px-3 text-[9px] font-black text-text-muted uppercase tracking-widest mb-3">Management</p>}
          {navData.main.map(renderNavItem)}
        </div>
        
        <div className="h-px bg-border-subtle my-2 mx-1 shrink-0" />
        
        <div className="mt-2">
           {isDoctor && <p className="px-3 text-[9px] font-black text-text-muted uppercase tracking-widest mb-3">Clinical Operations</p>}
          {navData.secondary.map(renderNavItem)}
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="p-3 shrink-0">
        <button
          onClick={handleSignOut}
          className="group flex items-center w-full px-3 py-3 rounded-lg hover:bg-hover transition-colors cursor-pointer justify-between"
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isDoctor ? 'bg-blue-600' : 'bg-brand-teal'}`}>
              <span className="text-text-primary text-sm font-medium">
                 {user?.user_metadata?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-sm font-medium text-text-primary group-hover:hidden">
                 {user?.user_metadata?.first_name || 'User'}
              </span>
              <span className="text-[13px] font-medium text-brand-alert hidden group-hover:flex items-center">
                Sign out
              </span>
            </div>
          </div>
          <LogOut size={16} className="text-text-secondary hidden group-hover:block" />
        </button>
      </div>
    </aside>
  );
}
