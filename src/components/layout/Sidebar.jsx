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
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mainNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope, path: '/symptom-checker' },
  { id: 'chat', label: 'AI Doctor', icon: MessageSquare, path: '/chat' },
  { id: 'xray', label: 'X-Ray Analysis', icon: Scan, path: '/xray' },
  { id: 'cough', label: 'Cough Detect', icon: Mic, path: '/cough-detect' },
  { id: 'breathing', label: 'Breathing', icon: Wind, path: '/breathing' },
];

const secondaryNavItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { id: 'telemedicine', label: 'Telemedicine', icon: Video, path: '/telemedicine' },
  { id: 'hospitals', label: 'Nearby Hospitals', icon: MapPin, path: '/hospitals' },
  { id: 'medications', label: 'Medications', icon: Pill, path: '/medications' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

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
        <LungsIcon className="text-brand-blue-light mr-3" size={24} />
        <span className="text-[16px] font-medium text-text-primary tracking-tight">LungDetect AI</span>
      </div>

      {/* Nav Section */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none flex flex-col gap-1">
        <div className="mb-2">
          {mainNavItems.map(renderNavItem)}
        </div>
        
        <div className="h-px bg-border-subtle my-2 mx-1 shrink-0" />
        
        <div className="mt-2">
          {secondaryNavItems.map(renderNavItem)}
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="p-3 shrink-0">
        <button
          onClick={handleSignOut}
          className="group flex items-center w-full px-3 py-3 rounded-lg hover:bg-hover transition-colors cursor-pointer justify-between"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
              <span className="text-text-primary text-sm font-medium">RJ</span>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-sm font-medium text-text-primary group-hover:hidden">Rajesh</span>
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
