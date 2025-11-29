"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OverviewTab } from "@/components/dashboard/tabs/OverviewTab";
import { PatientInflowTab } from "@/components/dashboard/tabs/PatientInflowTab";
import { BedStatusTab } from "@/components/dashboard/tabs/BedStatusTab";
import { StaffAllocationTab } from "@/components/dashboard/tabs/StaffAllocationTab";
import { EquipmentUsageTab } from "@/components/dashboard/tabs/EquipmentUsageTab";
import { PredictionsTab } from "@/components/dashboard/tabs/PredictionsTab";
import { AlertsSurgesTab } from "@/components/dashboard/tabs/AlertsSurgesTab";
import { SimulationsTab } from "@/components/dashboard/tabs/SimulationsTab";
import { HistoryInsightsTab } from "@/components/dashboard/tabs/HistoryInsightsTab";
import { AdminPanelTab } from "@/components/dashboard/tabs/AdminPanelTab";

type Tab =
  | "Symptom Overview"
  | "Pattern Analysis"
  | "Differential Diagnosis"
  | "Severity Tracking"
  | "Patient Monitoring"
  | "Early Detection"
  | "Alert Management"
  | "Clinical Insights"
  | "Research Data"
  | "System Config";

const tabs: { id: Tab; icon: string; description: string }[] = [
  { id: "Symptom Overview", icon: "🧠", description: "MG symptom dashboard" },
  { id: "Pattern Analysis", icon: "📊", description: "Temporal patterns" },
  { id: "Differential Diagnosis", icon: "🔬", description: "MG vs LEMS/GBS/CIDP/ALS" },
  { id: "Severity Tracking", icon: "⚡", description: "Escalation monitoring" },
  { id: "Patient Monitoring", icon: "👴", description: "Elderly patient care" },
  { id: "Early Detection", icon: "🎯", description: "Predictive alerts" },
  { id: "Alert Management", icon: "🚨", description: "Caregiver notifications" },
  { id: "Clinical Insights", icon: "📈", description: "Longitudinal data" },
  { id: "Research Data", icon: "🔍", description: "Study analytics" },
  { id: "System Config", icon: "⚙️", description: "AI model settings" },
];

const TabBody = ({ activeTab }: { activeTab: Tab }) => {
  if (activeTab === "Symptom Overview") return <OverviewTab />;
  if (activeTab === "Pattern Analysis") return <PatientInflowTab />;
  if (activeTab === "Differential Diagnosis") return <BedStatusTab />;
  if (activeTab === "Severity Tracking") return <StaffAllocationTab />;
  if (activeTab === "Patient Monitoring") return <EquipmentUsageTab />;
  if (activeTab === "Early Detection") return <PredictionsTab />;
  if (activeTab === "Alert Management") return <AlertsSurgesTab />;
  if (activeTab === "Clinical Insights") return <SimulationsTab />;
  if (activeTab === "Research Data") return <HistoryInsightsTab />;
  if (activeTab === "System Config") return <AdminPanelTab />;
  return null;
};

export function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Symptom Overview");
  const activeMeta = useMemo(() => tabs.find((tab) => tab.id === activeTab), [activeTab]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState<{name: string, email?: string, image?: string, age?: string, gender?: string, weight?: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("grania_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex relative">
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-3xl font-bold text-[#03142d]">User Profile</h2>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-3 hover:bg-slate-200 rounded-full transition-colors"
              >
                <span className="text-slate-500 text-2xl">✕</span>
              </button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* General Information Box */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#2f80ed]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#03142d]">General Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Name</p>
                      <p className="text-xl font-bold text-[#03142d]">{user?.name || "John Doe"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Age</p>
                      <p className="text-xl font-bold text-[#03142d]">{user?.age || "65"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Gender</p>
                      <p className="text-xl font-bold text-[#03142d] capitalize">{user?.gender || "Male"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Weight</p>
                      <p className="text-xl font-bold text-[#03142d]">{user?.weight ? `${user.weight} kg` : "70 kg"}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Email</p>
                    <p className="text-xl font-bold text-[#03142d]">{user?.email || "john.doe@example.com"}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information Box */}
              <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-3xl border border-teal-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#03142d]">Medical Information</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-2xl border border-teal-50 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Diagnosis</p>
                    <p className="text-xl font-bold text-[#03142d]">Myasthenia Gravis (Class IIa)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-2xl border border-teal-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Diagnosis Date</p>
                      <p className="text-xl font-bold text-[#03142d]">Oct 12, 2023</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-teal-50 shadow-sm">
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Blood Type</p>
                      <p className="text-xl font-bold text-[#03142d]">O+</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-teal-50 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Current Medication</p>
                    <p className="text-xl font-bold text-[#03142d]">Pyridostigmine (60mg), Prednisone</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-2xl border border-teal-50 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Last Antibody Test</p>
                    <p className="text-xl font-bold text-[#03142d]">AChR: Elevated (High Titer)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modern Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-10 shrink-0"
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold bg-gradient-to-r from-[#2f80ed] to-[#56cfe1] bg-clip-text text-transparent">
              Grania AI
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Neuroinformatics Platform</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                activeTab === tab.id 
                  ? "bg-blue-50 text-[#2f80ed] shadow-sm ring-1 ring-blue-100" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={`text-xl transition-transform duration-200 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}>
                {tab.icon}
              </span>
              <div>
                <p className="font-semibold text-sm">{tab.id}</p>
                <p className="text-[10px] opacity-70 leading-tight">{tab.description}</p>
              </div>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2f80ed]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => setShowProfileModal(true)}
            className="w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "JD"}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate group-hover:text-[#2f80ed] transition-colors">{user?.name || "John Doe"}</p>
                <p className="text-xs text-slate-500 truncate">View Profile</p>
              </div>
              <div className="text-slate-400 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-end"
          >
            <div>
              <p className="text-sm font-medium text-[#2f80ed] mb-1">{activeMeta?.description}</p>
              <h1 className="text-3xl font-bold text-[#03142d]">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-600">Live Stream</span>
              </div>
              <p className="text-xs text-slate-400">Last updated: Just now</p>
            </div>
          </motion.div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 min-h-[calc(100vh-12rem)]"
        >
          <TabBody activeTab={activeTab} />
        </motion.div>
      </main>
    </div>
  );
}


