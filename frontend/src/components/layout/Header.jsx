import React from 'react';
import { Menu, PlusCircle } from 'lucide-react';
import Button from '../common/Button';

export default function Header({
  activePage,
  onNavigate,
  onOpenMobileSidebar,
}) {
  const getPageTitle = (page) => {
    switch (page) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Inspection overview and quality metrics',
        };
      case 'new-inspection':
        return {
          title: 'New Inspection',
          subtitle: 'Upload product image for quality inspection',
        };
      case 'inspection-result':
        return {
          title: 'Inspection Result',
          subtitle: 'Visual comparison and defect analysis',
        };
      case 'history':
        return {
          title: 'Inspection History',
          subtitle: 'Searchable inspection log and records',
        };
      case 'reports':
        return {
          title: 'Reports & Analytics',
          subtitle: 'Quality control monitoring and trends',
        };
      case 'system-info':
        return {
          title: 'System Information',
          subtitle: 'VisionInspect workflow and system architecture',
        };
      default:
        return {
          title: 'VisionInspect',
          subtitle: 'Industrial Visual Inspection System',
        };
    }
  };

  const pageMeta = getPageTitle(activePage);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-[#E2E8F0]">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-md text-[#475569] hover:bg-[#F1F5F9] hover:text-[#172A3A] lg:hidden focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#172A3A] tracking-tight">
            {pageMeta.title}
          </h1>
          <p className="hidden sm:block text-xs text-[#64748B]">
            {pageMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls: New Inspection CTA */}
      <div className="flex items-center gap-3">
        {activePage !== 'new-inspection' && (
          <Button
            variant="secondary"
            size="sm"
            icon={PlusCircle}
            onClick={() => onNavigate('new-inspection')}
            className="font-semibold"
          >
            New Inspection
          </Button>
        )}
      </div>
    </header>
  );
}
