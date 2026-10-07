import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/Dashboard/DashboardPage';
import NewInspectionPage from './pages/NewInspection/NewInspectionPage';
import InspectionResultPage from './pages/InspectionResult/InspectionResultPage';
import InspectionHistoryPage from './pages/InspectionHistory/InspectionHistoryPage';
import ReportsAnalyticsPage from './pages/ReportsAnalytics/ReportsAnalyticsPage';

import {
  getDashboardStats,
  getInspectionRecords,
  getInspectionById,
} from './services/api';

export default function App() {
  // Navigation state: 'dashboard' | 'new-inspection' | 'inspection-result' | 'history' | 'reports' | 'system-info'
  const [activePage, setActivePage] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState('dashboard');

  // Selected inspection for InspectionResultPage
  const [selectedInspection, setSelectedInspection] = useState(null);

  // Mobile sidebar drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Telemetry state
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load telemetry data from centralized API service
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, recordsData] = await Promise.all([
        getDashboardStats(),
        getInspectionRecords(),
      ]);
      setStats(statsData);
      setRecords(recordsData.records);

      if (!selectedInspection && recordsData.records.length > 0) {
        setSelectedInspection(recordsData.records[0]);
      }
    } catch (err) {
      console.error('Failed to load inspection data:', err);
      setError('Unable to load inspection data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedInspection]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Navigate to specific page
  const handleNavigate = (pageId) => {
    if (pageId !== activePage) {
      setPreviousPage(activePage);
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Select an inspection to inspect in detail
  const handleSelectInspection = async (inspectionId) => {
    try {
      setLoading(true);
      const detail = await getInspectionById(inspectionId);
      setSelectedInspection(detail);
      setPreviousPage(activePage);
      setActivePage('inspection-result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to retrieve inspection record:', err);
    } finally {
      setLoading(false);
    }
  };

  // When a new inspection is executed in NewInspectionPage
  const handleInspectionCompleted = (newResult) => {
    setSelectedInspection(newResult);
    setPreviousPage('new-inspection');
    setActivePage('inspection-result');
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate back from inspection result
  const handleBackFromResult = () => {
    handleNavigate(previousPage === 'inspection-result' ? 'dashboard' : previousPage);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F4] text-[#172A3A] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              stats={stats}
              recentRecords={records}
              loading={loading}
              error={error}
              onNavigate={handleNavigate}
              onSelectInspection={handleSelectInspection}
              onRefresh={loadData}
            />
          )}

          {activePage === 'new-inspection' && (
            <NewInspectionPage
              onInspectionCompleted={handleInspectionCompleted}
              onCancel={() => handleNavigate('dashboard')}
            />
          )}

          {activePage === 'inspection-result' && (
            <InspectionResultPage
              inspection={selectedInspection}
              loading={loading}
              error={error}
              onBack={handleBackFromResult}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'history' && (
            <InspectionHistoryPage
              records={records}
              loading={loading}
              error={error}
              onSelectInspection={handleSelectInspection}
              onNavigate={handleNavigate}
              onRefresh={loadData}
            />
          )}

          {activePage === 'reports' && (
            <ReportsAnalyticsPage
              stats={stats}
              loading={loading}
              error={error}
              onRefresh={loadData}
            />
          )}

          
        </main>

        {/* Footer */}
        <footer className="mt-auto px-6 py-4 border-t border-[#E2E8F0] bg-white text-xs text-[#64748B]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#172A3A]">VISIONINSPECT</span>
              <span className="text-[#CBD5E1]">|</span>
              <span>Intelligent Visual Inspection System for Industrial Quality Control</span>
            </div>
            <div className="text-[11px] text-[#64748B]">
              Frontend Prototype
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
