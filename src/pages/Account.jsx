import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  User, Mail, Phone, Lock, FileText, 
  MessageSquare, Globe, Save, Upload, CheckCircle, ExternalLink, UserCircle
} from 'lucide-react';

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Combined state for User Info, Bio, and Site Configuration
  const [accountData, setAccountData] = useState({
    name: 'Tejas Kini', // Initial values based on your profile
    email: '',
    phone: '',
    bio: '',
    site_title: 'Tejas Kini | Portfolio',
    announcement: '',
    is_maintenance_mode: false
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await api.put('/user/profile', accountData);
      setMessage({ type: 'success', text: 'Account updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update account.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="w-full min-h-full p-8 space-y-8 bg-slate-50 dark:bg-[#0A0D14] transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile, credentials, and site configuration.</p>
        </div>
        {message.text && (
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold ${
            message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
          }`}>
            <CheckCircle size={18} /> {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column: Profile & Bio */}
        <div className="space-y-8">
          
          {/* Profile Section */}
          <section className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="text-blue-500" size={22} /> Personal Information
            </h3>
            <form onSubmit={handleUpdateAccount} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                  <input name="name" value={accountData.name} onChange={handleInputChange}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
                  <input name="phone" placeholder="+91 ..." value={accountData.phone} onChange={handleInputChange}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                <input name="email" type="email" value={accountData.email} onChange={handleInputChange}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Edit Bio</label>
                <textarea name="bio" rows="4" value={accountData.bio} onChange={handleInputChange}
                  placeholder="Tell your story..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500 resize-none" />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition ml-auto">
                <Save size={18} /> Save Changes
              </button>
            </form>
          </section>

          {/* Password Reset Section */}
          <section className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="text-orange-500" size={22} /> Security
            </h3>
            <div className="space-y-4">
              <input type="password" placeholder="Current Password" 
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="password" placeholder="New Password" 
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500" />
                <input type="password" placeholder="Confirm Password" 
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500" />
              </div>
              <button className="text-orange-500 font-bold text-sm hover:underline">Update Password</button>
            </div>
          </section>
        </div>

        {/* Right Column: Site Config & CV */}
        <div className="space-y-8">
          
          {/* Site Configuration */}
          <section className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="text-purple-500" size={22} /> Site Configuration
            </h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Site Title</label>
                <input name="site_title" value={accountData.site_title} onChange={handleInputChange}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                  Announcement Message <span className="text-[10px] text-purple-400 underline cursor-help">Displays on Public Site</span>
                </label>
                <textarea name="announcement" rows="2" value={accountData.announcement} onChange={handleInputChange}
                  placeholder="e.g., Open for freelance opportunities!"
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 resize-none" />
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                <input type="checkbox" id="maintenance" name="is_maintenance_mode" 
                  checked={accountData.is_maintenance_mode} onChange={handleInputChange}
                  className="w-5 h-5 accent-purple-500" />
                <label htmlFor="maintenance" className="text-sm font-bold text-purple-200">Enable Maintenance Mode</label>
              </div>
            </div>
          </section>

          {/* CV Upload Section */}
          <section className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="text-emerald-500" size={22} /> Curriculum Vitae (CV)
            </h3>
            <div className="border-2 border-dashed border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-emerald-500/50 transition cursor-pointer group">
              <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500 group-hover:scale-110 transition">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold">Upload New CV</p>
                <p className="text-slate-500 text-xs mt-1">PDF, DOCX up to 5MB</p>
              </div>
              <button className="bg-emerald-600/10 text-emerald-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600/20 transition">
                Browse Files
              </button>
            </div>
            <div className="mt-6 flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-500" size={20} />
                <span className="text-sm text-slate-300 font-medium">current_resume_2026.pdf</span>
              </div>
              <button className="text-slate-500 hover:text-white"><ExternalLink size={16} /></button>
            </div>
          </section>

        </div>
      </div>
      
      <p className="text-center text-slate-500 text-sm mt-8 pb-4">
        &copy; 2026 Admin Portfolio - Secure Account Management
      </p>
    </div>
  );
};

export default Account;