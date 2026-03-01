import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Trash2, Layers } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', level: 'Intermediate' });

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    const res = await api.get('/skills');
    setSkills(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/skills', formData);
    setIsModalOpen(false);
    fetchSkills();
    setFormData({ name: '', level: 'Intermediate' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Skills & Technologies</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-500 transition">
          <Plus size={20} /> Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Layers size={20} /></div>
              <div>
                <p className="font-bold text-white">{skill.name}</p>
                <p className="text-xs text-slate-500">{skill.level}</p>
              </div>
            </div>
            <button onClick={async () => { await api.delete(`/skills/${skill._id}`); fetchSkills(); }} className="text-slate-600 hover:text-red-500 transition">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Skill">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Skill Name</label>
            <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="e.g. React.js" 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Proficiency Level</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
              value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-500 transition mt-4">Save Skill</button>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;