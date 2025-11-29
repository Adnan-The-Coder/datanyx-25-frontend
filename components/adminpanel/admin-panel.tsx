"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  Database, 
  Bell, 
  Lock,
  Brain,
  ChevronRight
} from "lucide-react";

export function AdminPanel() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-10 shrink-0"
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-6 h-6 text-[#2f80ed]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#2f80ed] to-[#56cfe1] bg-clip-text text-transparent">
              Grania AI
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Admin Console</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "overview", label: "System Overview", icon: <Activity className="w-4 h-4" /> },
            { id: "users", label: "User Management", icon: <Users className="w-4 h-4" /> },
            { id: "models", label: "AI Models", icon: <Brain className="w-4 h-4" /> },
            { id: "data", label: "Data Governance", icon: <Database className="w-4 h-4" /> },
            { id: "security", label: "Security & Compliance", icon: <Shield className="w-4 h-4" /> },
            { id: "settings", label: "Platform Settings", icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-50 text-[#2f80ed] font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#2f80ed] transition-colors px-4 py-2"
          >
            <Activity className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#03142d]">
              {activeSection === 'overview' && 'System Overview'}
              {activeSection === 'users' && 'User Management'}
              {activeSection === 'models' && 'AI Model Performance'}
              {activeSection === 'data' && 'Data Governance'}
              {activeSection === 'security' && 'Security & Compliance'}
              {activeSection === 'settings' && 'Platform Settings'}
            </h1>
            <p className="text-slate-500 text-sm">
              {activeSection === 'overview' && 'Real-time monitoring of system health and key metrics.'}
              {activeSection === 'users' && 'Manage clinical roles, permissions, and access logs.'}
              {activeSection === 'models' && 'Track accuracy, retraining schedules, and inference latency.'}
              {activeSection === 'data' && 'Configure data retention, backups, and interoperability.'}
              {activeSection === 'security' && 'Ensure HIPAA compliance and manage encryption keys.'}
              {activeSection === 'settings' && 'Global system configuration and alert thresholds.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-[#2f80ed] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              AD
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {/* OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-[#2f80ed]"><Activity className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-700">System Health</h3>
                </div>
                <div className="text-3xl font-bold text-[#03142d] mb-1">99.9%</div>
                <p className="text-xs text-green-600 font-medium">All systems operational</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Users className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-700">Active Sessions</h3>
                </div>
                <div className="text-3xl font-bold text-[#03142d] mb-1">42</div>
                <p className="text-xs text-slate-500">Across 3 departments</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><Brain className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-700">Daily Inferences</h3>
                </div>
                <div className="text-3xl font-bold text-[#03142d] mb-1">1,247</div>
                <p className="text-xs text-green-600 font-medium">↑ 12% vs yesterday</p>
              </div>
              
              <div className="col-span-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-4">Recent System Activity</h3>
                <div className="space-y-4">
                  {[
                    { time: "10:42 AM", event: "New Neurologist account created", user: "Admin", status: "Success" },
                    { time: "09:15 AM", event: "Model v2.4 retraining completed", user: "System", status: "Success" },
                    { time: "08:30 AM", event: "Weekly backup initiated", user: "System", status: "Processing" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-slate-400">{log.time}</span>
                        <span className="text-sm font-medium text-slate-700">{log.event}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{log.user}</span>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                          log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>{log.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* USERS SECTION */}
          {activeSection === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">Clinical Staff Directory</h3>
                <button className="px-4 py-2 bg-[#2f80ed] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  + Add User
                </button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "Dr. Sarah Chen", role: "Neurologist", status: "Active", last: "2 mins ago" },
                    { name: "Dr. James Wilson", role: "Geriatrician", status: "Active", last: "1 hour ago" },
                    { name: "Maria Garcia", role: "Head Nurse", status: "Away", last: "4 hours ago" },
                    { name: "Research Team A", role: "Researcher", status: "Active", last: "Just now" },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#03142d]">{user.name}</td>
                      <td className="px-6 py-4 text-slate-600">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>{user.status}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{user.last}</td>
                      <td className="px-6 py-4 text-[#2f80ed] font-medium cursor-pointer hover:underline">Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MODELS SECTION */}
          {activeSection === 'models' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-4">Model Performance</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Ptosis Detection (CNN)</span>
                      <span className="text-sm font-bold text-[#2f80ed]">98.2%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2f80ed] rounded-full" style={{ width: "98.2%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Dysarthria Analysis (Audio)</span>
                      <span className="text-sm font-bold text-[#2f80ed]">94.5%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2f80ed] rounded-full" style={{ width: "94.5%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Gait Analysis (Video)</span>
                      <span className="text-sm font-bold text-[#2f80ed]">91.8%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2f80ed] rounded-full" style={{ width: "91.8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-4">Retraining Schedule</h3>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-[#2f80ed]" />
                    <span className="text-sm font-bold text-[#2f80ed]">Next Scheduled Retraining</span>
                  </div>
                  <p className="text-2xl font-bold text-[#03142d]">In 14 hours</p>
                  <p className="text-xs text-slate-500">Using 450 new validated patient samples.</p>
                </div>
                <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                  Trigger Manual Retraining
                </button>
              </div>
            </div>
          )}

          {/* DATA SECTION */}
          {activeSection === 'data' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Database className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="font-bold text-slate-700 mb-1">Storage Usage</h3>
                <p className="text-2xl font-bold text-[#03142d] mb-2">4.2 TB <span className="text-sm font-normal text-slate-400">/ 10 TB</span></p>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Activity className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-bold text-slate-700 mb-1">Data Ingestion</h3>
                <p className="text-2xl font-bold text-[#03142d] mb-2">1.2 GB <span className="text-sm font-normal text-slate-400">/ day</span></p>
                <p className="text-xs text-slate-500">Video & Audio telemetry</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Shield className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-slate-700 mb-1">Backup Status</h3>
                <p className="text-2xl font-bold text-[#03142d] mb-2">Synced</p>
                <p className="text-xs text-slate-500">Last backup: 15 mins ago</p>
              </div>
            </div>
          )}

          {/* SECURITY SECTION */}
          {activeSection === 'security' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#03142d]">Security & Compliance</h2>
                    <p className="text-xs text-slate-500">HIPAA compliance and data encryption settings.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">Data Encryption</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">AES-256 encryption enabled for all patient records at rest.</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-green-700">Active</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">Audit Logs</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">Comprehensive logging of all data access and modifications.</p>
                    <button className="text-xs font-semibold text-[#2f80ed] hover:underline">View Logs</button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* SETTINGS SECTION (Default) */}
          {activeSection === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2f80ed]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#03142d]">MG Detection Parameters</h2>
                    <p className="text-xs text-slate-500">Configure sensitivity thresholds for symptom analysis.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Ptosis Detection Sensitivity</label>
                      <span className="text-sm font-bold text-[#2f80ed]">94%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2f80ed] rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Dysphagia Alert Trigger</label>
                      <span className="text-sm font-bold text-[#2f80ed]">Medium</span>
                    </div>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High'].map((level) => (
                        <button 
                          key={level}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg border ${
                            level === 'Medium' 
                              ? 'bg-blue-50 border-blue-200 text-[#2f80ed]' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
