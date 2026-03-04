import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Trash2, Layers, Edit3, Tag, BarChart2, Clock } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // FIXED: Changed key to 'month_of_experience' to match your backend
  const initialForm = { name: '', proficiency: 'Intermediate', category: '', month_of_experience: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      // Added safety fallback to prevent undefined map crashes
      setSkills(res.data.data || res.data || []);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleEditClick = (skill) => {
    const skillId = skill._id?.$oid || skill._id;
    setEditingId(skillId);
    setFormData({
      name: skill.name || '',
      proficiency: skill.proficiency || 'Intermediate',
      category: skill.category || '',
      // FIXED: Reading from the correct backend key
      month_of_experience: skill.month_of_experience || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await api.delete(`/skills/${skillId}`);
        fetchSkills();
      } catch (err) {
        console.error('Error deleting skill:', err);
        alert('Error deleting skill.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FIXED: Sending 'month_of_experience' exactly as the backend expects
    const payload = {
      name: formData.name,
      proficiency: formData.proficiency,
      category: formData.category,
      month_of_experience: formData.month_of_experience ? parseInt(formData.month_of_experience, 10) : null
    };

    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, payload);
      } else {
        await api.post('/skills', payload);
      }
      handleCloseModal();
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill:', err.response?.data || err.message);
      alert('Error saving skill. Please try again.');
    }
  };

  return (
    <div className="w-full h-full p-8 space-y-8">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Skills & Technologies</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-slate-800 border border-slate-700 text-slate-300 px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-slate-700 hover:text-white transition shadow-sm"
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {/* FIXED: Changed to lg:grid-cols-2. This forces 2 columns max, making cards much wider! */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills?.map((skill) => {
          const skillId = skill._id?.$oid || skill._id;
          return (
            // Added min-h-[140px] to make the cards a bit taller and more spacious
            <div key={skillId} className="bg-[#131620] border border-slate-800/60 p-6 min-h-[140px] rounded-3xl flex flex-col justify-between hover:border-slate-700 transition group relative">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-5 w-full min-w-0">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500 h-fit shrink-0">
                    <Layers size={28} />
                  </div>
                  <div className="flex-1 min-w-0 pr-2 pt-1">
                    <h3 className="text-2xl font-bold text-white break-words">{skill.name}</h3>
                    {skill.category && (
                      <p className="text-slate-400 text-sm font-medium flex items-center gap-1.5 mt-2">
                        <Tag size={14} /> {skill.category}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => handleEditClick(skill)} className="text-slate-500 hover:text-blue-400 transition p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => handleDelete(skillId)} className="text-slate-500 hover:text-red-500 transition p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Badges Container */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300">
                  <BarChart2 size={16} className="text-blue-400" />
                  {skill.proficiency}
                </div>
                
                {/* FIXED: Reading from month_of_experience and updated text display */}
                {skill.month_of_experience && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300">
                    <Clock size={16} className="text-purple-400" />
                    {skill.month_of_experience} Months Exp.
                  </div>
                )}
              </div>
              
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? "Update Skill" : "Add New Skill"}>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Skill Name</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
              placeholder="e.g. Rust, ReactJS, MongoDB" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
                placeholder="e.g. Backend" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Experience (Months)</label>
              <input 
                type="number"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
                placeholder="e.g. 24 (Optional)" 
                // FIXED: Bound strictly to month_of_experience
                value={formData.month_of_experience} 
                onChange={(e) => setFormData({...formData, month_of_experience: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Proficiency Level</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition appearance-none"
              value={formData.proficiency} 
              onChange={(e) => setFormData({...formData, proficiency: e.target.value})}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 py-3.5 rounded-2xl font-bold text-white hover:bg-blue-500 transition mt-6 shadow-lg shadow-blue-500/20">
            {editingId ? "Save Changes" : "Save Skill"}
          </button>
        </form>
      </Modal>
      
    </div>
  );
};

export default Skills;