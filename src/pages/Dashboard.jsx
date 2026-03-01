import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Layers, Briefcase, GraduationCap, Plus, Settings, Eye } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  // ... existing fetch logic ...

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here’s a summary of your portfolio’s status.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition border border-slate-700">
            <Settings size={18}  /> Settings
          </button>
          <button onClick={() => navigate('/projects')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition shadow-lg shadow-blue-900/20">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {/* Stats Grid - Now with glowing borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Code />} label="Projects" count="1" color="blue" />
        <StatCard icon={<Layers />} label="Skills" count="1" color="purple" />
        <StatCard icon={<Briefcase />} label="Experience" count="2" color="emerald" />
        <StatCard icon={<GraduationCap />} label="Education" count="0" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6">Recent Additions</h3>
            <div className="space-y-4">
              {/* Dummy Activity Items to fill space */}
              <ActivityItem title="Rust Backend CMS" type="Project" date="" />
              <ActivityItem title="Senior Developer at TechCorp" type="Experience" date="" />
              <ActivityItem title="React & Tailwind" type="Skill" date="" />
            </div>
          </div>
        </div>

        {/* Sidebar Area - Quick Tasks */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20">
            <h3 className="font-bold text-lg mb-2">Portfolio Analytics</h3>
            <p className="text-blue-100 text-sm mb-4">Your site has seen a 15% increase in traffic this week.</p>
            <div className="relative w-full">
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl transition text-sm font-semibold flex items-center justify-center gap-2 group">
                <Eye size={16} /> View Reports
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Coming soon...
                </span>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickLink label="Edit Bio" tooltip="Coming soon..." />
              <QuickLink label="Update CV" tooltip="Coming soon..." />
              <QuickLink label="Site Config" tooltip="Coming soon..." />
              <QuickLink label="Messages" tooltip="Coming soon..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatCard = ({ icon, label, count, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-600 transition group relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-600/10 blur-2xl rounded-full`}></div>
    <div className="relative flex justify-between items-start">
      <div className={`p-3 rounded-2xl bg-slate-800 text-${color}-500`}>{icon}</div>
      <span className="text-4xl font-black text-white">{count}</span>
    </div>
    <div className="mt-4">
      <p className="text-slate-400 font-medium">{label}</p>
    </div>
  </div>
);

const ActivityItem = ({ title, type, date }) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:bg-slate-800/50 transition">
    <div className="flex items-center gap-4">
      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-slate-500">{type}</p>
      </div>
    </div>
    <span className="text-xs text-slate-500 font-medium">{date}</span>
  </div>
);

const QuickLink = ({ label, tooltip }) => (
  <div className="relative">
    <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700 rounded-2xl text-xs font-semibold transition border border-slate-700 group">
      {label}
      {tooltip && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {tooltip}
        </span>
      )}
    </button>
  </div>
);

export default Dashboard;