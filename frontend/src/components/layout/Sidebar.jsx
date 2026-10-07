import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Info,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function Sidebar({
  activePage,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'new-inspection',
      label: 'New Inspection',
      icon: PlusCircle,
    },
    {
      id: 'history',
      label: 'Inspection History',
      icon: History,
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
    },
    
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#172A3A] text-white border-r border-[#0F1C27] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-[#203A4F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#176B68] flex items-center justify-center text-white font-bold text-sm">
              VI
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-white uppercase">
                VISIONINSPECT
              </h1>
              <p className="text-[11px] text-[#94A3B8]">
                Visual Quality Inspection
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              activePage === item.id ||
              (item.id === 'new-inspection' && activePage === 'inspection-result') ||
              (item.id === 'history' && activePage === 'inspection-result-history');

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#176B68] text-white font-semibold'
                    : 'text-[#CBD5E1] hover:bg-[#203A4F] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-[#94A3B8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </button>
            );
          })}
        </nav>

        {/* System Footer Note */}
        <div className="p-4 border-t border-[#203A4F] bg-[#12222F]/50 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2 text-white font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#176B68]" />
            <span>Industrial Quality Control</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Autoencoder-based visual anomaly detection software
          </p>
        </div>
      </aside>
    </>
  );
}
