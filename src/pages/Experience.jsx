import api from '../api/axios';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Trash2, Edit3, Briefcase } from 'lucide-react';

const Experience = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = { 
    company: '', 
    role: '', 
    description: '', 
    start_date: '', 
    end_date: '', 
    is_current: false,
    company_url: '' 
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchExperience(); }, []);

  const fetchExperience = async () => {
    try {
      const res = await api.get('/experience');
      setItems(res.data.data);
    } catch (err) {
      console.error('Error fetching experience:', err);
    }
  };

  const handleEdit = (item) => {
    const id = item._id?.$oid || item._id;
    setEditingId(id);
    setFormData({
      company: item.company || '',
      role: item.role || '',
      description: item.description || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      is_current: item.is_current || false,
      company_url: item.company_url || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/experience/${editingId}`, formData);
      } else {
        await api.post('/experience', formData);
      }
      closeModal();
      fetchExperience();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Error saving experience. Please try again.');
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white">Experience</h1>
          <p className="text-slate-400 mt-2 text-lg">Manage your professional journey and career milestones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-900/40 transition text-white flex items-center gap-2"
        >
          <Briefcase size={18} /> + Add New Role
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Table Area */}
      {/* Left Side: Table Area */}
<div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm shadow-xl">
  <table className="w-full text-left border-collapse">
    <thead className="bg-slate-800/50 border-b border-slate-800">
      <tr>
        <th className="p-8 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Position & Company</th>
        <th className="p-8 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Duration</th>
        <th className="p-8 text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-800">
      {items.map(item => {
        const id = item._id?.$oid || item._id;
        return (
          <tr key={id} className="hover:bg-slate-800/40 transition-colors group">
            <td className="p-8">
              <p className="font-bold text-base text-white uppercase tracking-tight leading-tight">{item.role}</p>
              <p className="text-slate-500 font-medium text-sm mt-1">{item.company}</p>
            </td>
            <td className="p-8 text-slate-400 font-medium text-sm">
              <span className="whitespace-nowrap">
                {item.start_date} — {item.is_current ? (
                  <span className="text-emerald-500 font-bold">Present</span>
                ) : (
                  item.end_date
                )}
              </span>
            </td>
            <td className="p-8 text-right">
              {/* Flex container to prevent button stacking */}
              <div className="flex justify-end items-center gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-3 bg-slate-800/80 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 rounded-xl transition-all duration-200 border border-slate-700/50"
                  title="Edit Role"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={async () => {
                    if(window.confirm("Delete this role?")) {
                      try {
                        await api.delete(`/experience/${id}`);
                        fetchExperience();
                      } catch (err) { console.error(err); }
                    }
                  }}
                  className="p-3 bg-slate-800/80 hover:bg-red-600/20 text-slate-400 hover:text-red-500 rounded-xl transition-all duration-200 border border-slate-700/50"
                  title="Delete Role"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
      {items.length === 0 && (
        <tr>
          <td colSpan="3" className="p-20 text-center text-slate-600 font-medium italic">
            No experience records found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        {/* Right Side: Visual Sidebar */}
        <div className="space-y-6">
          {/* Animated Career Stats Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-[2.5rem] p-8 group shadow-2xl">
            {/* Background Animation Glow */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700"></div>
            
            <h3 className="text-xl font-bold text-white mb-6">Career Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                <span className="text-slate-400 font-medium">Total Roles</span>
                <span className="text-2xl font-black text-white">{items.length}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                <span className="text-slate-400 font-medium">Employment Status</span>
                <span className="text-emerald-400 font-bold px-3 py-1 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                  {items.some(i => i.is_current) ? 'Currently Employed' : 'Open to Work'}
                </span>
              </div>
            </div>

            {/* Decorative Spinner Animation */}
            <div className="mt-8 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                  <Briefcase size={32} />
                </div>
              </div>
              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">System Active</p>
            </div>
          </div>

          {/* Quick Tip Card */}
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 shadow-inner">
            <h4 className="text-blue-400 font-bold mb-2">Pro Tip</h4>
            <p className="text-blue-400/80 text-sm leading-relaxed">
              Ensure your dates follow the <strong>DD-MM-YYYY</strong> format. Highlighting your current role improves portfolio visibility for recruiters.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingId ? "Edit Experience" : "New Experience"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-2">Company Information</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
              placeholder="Company Name"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
              required
            />
          </div>
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
            placeholder="Company Website URL (optional)"
            value={formData.company_url}
            onChange={e => setFormData({...formData, company_url: e.target.value})}
          />
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-2">Role Details</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
              placeholder="Software Engineer / Senior Designer"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2">Start Date</label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
                placeholder="DD-MM-YYYY"
                value={formData.start_date}
                onChange={e => setFormData({...formData, start_date: e.target.value})}
                required
              />
            </div>
            {!formData.is_current && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">End Date</label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
                  placeholder="DD-MM-YYYY"
                  value={formData.end_date}
                  onChange={e => setFormData({...formData, end_date: e.target.value})}
                  required
                />
              </div>
            )}
          </div>

          <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0"
              checked={formData.is_current}
              onChange={e => setFormData({...formData, is_current: e.target.checked})}
            />
            <span className="text-slate-300 text-sm font-semibold">I currently work here</span>
          </label>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-2">Work Description</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none h-32 transition"
              placeholder="Briefly describe your responsibilities and achievements..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition mt-4 text-white shadow-lg shadow-blue-900/20 uppercase tracking-widest text-sm">
            {editingId ? "Update Record" : "Save Experience"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Experience;