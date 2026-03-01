import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  Code, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Settings, 
  Eye, 
  Loader2,
  ArrowUpRight 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    education: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch all counts in parallel for maximum performance
        const [projectsRes, skillsRes, expRes, eduRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/education')
        ]);

        setStats({
          projects: projectsRes.data.data?.length || 0,
          skills: skillsRes.data.data?.length || 0,
          experience: expRes.data.data?.length || 0,
          education: eduRes.data.data?.length || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here’s a summary of your portfolio’s status.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition border border-slate-700 text-white font-medium">
            <Settings size={18} /> Settings
          </button>
          <button 
            onClick={() => navigate('/projects')} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition shadow-lg shadow-blue-900/20 text-white font-bold"
          >
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Code />} 
          label="Projects" 
          count={loading ? null : stats.projects} 
          color="blue" 
        />
        <StatCard 
          icon={<Layers />} 
          label="Skills" 
          count={loading ? null : stats.skills} 
          color="purple" 
        />
        <StatCard 
          icon={<Briefcase />} 
          label="Experience" 
          count={loading ? null : stats.experience} 
          color="emerald" 
        />
        <StatCard 
          icon={<GraduationCap />} 
          label="Education" 
          count={loading ? null : stats.education} 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Activity/Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Content Management</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Quick Access</p>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <p className="text-slate-500 text-sm">Syncing with database...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <ActivityItem 
                  title="Portfolio Projects" 
                  description={`${stats.projects} projects currently live`} 
                  onClick={() => navigate('/projects')} 
                />
                <ActivityItem 
                  title="Work Experience" 
                  description={`${stats.experience} roles documented`} 
                  onClick={() => navigate('/experience')} 
                />
                <ActivityItem 
                  title="Skills & Tech Stack" 
                  description={`${stats.skills} competencies listed`} 
                  onClick={() => navigate('/skills')} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20">
            <h3 className="font-bold text-lg mb-2">Portfolio Analytics</h3>
            <p className="text-blue-100 text-sm mb-6">Your site has seen a steady increase in traffic this week.</p>
            <div className="relative w-full">
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-sm font-bold flex items-center justify-center gap-2 group border border-white/10">
                <Eye size={16} /> View Full Report
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Coming soon...
                </span>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickLink label="Edit Bio" tooltip="In Development" />
              <QuickLink label="Update CV" tooltip="In Development" />
              <QuickLink label="Site Config" tooltip="In Development" />
              <QuickLink label="Messages" tooltip="In Development" />
            </div>
          </div>
        </div>
      </div>
       <p className="text-center mt-8 text-slate-500 text-sm">
          &copy; 2026 Admin Portfolio - by Tejas Kini ❤️. All rights reserved.
        </p>
    </div>
  );
};

/* --- Sub-components --- */

const StatCard = ({ icon, label, count, color }) => {
  const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-600 transition group relative overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full opacity-10 ${colorMap[color].split(' ')[1]}`}></div>
      
      <div className="relative flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        <span className="text-4xl font-black text-white">
          {count === null ? <Loader2 className="animate-spin text-slate-700" size={24} /> : count}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-slate-400 font-medium">{label}</p>
      </div>
      
    </div>
  );
};

const ActivityItem = ({ title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-5 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-500 transition cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 border border-slate-700 group-hover:scale-110 transition">
        <ArrowUpRight size={20} />
      </div>
      <div>
        <p className="font-bold text-slate-100">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <div className="text-slate-600 group-hover:text-white transition">
       <Plus size={18} />
    </div>
  </div>
);

const QuickLink = ({ label, tooltip }) => (
  <div className="relative group">
    <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700 rounded-2xl text-xs font-bold transition border border-slate-700 text-slate-400 hover:text-white">
      {label}
    </button>
    {tooltip && (
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700">
        {tooltip}
      </span>
    )}
  </div>
);

export default Dashboard;