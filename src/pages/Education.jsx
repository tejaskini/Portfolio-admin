import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';

const Education = () => {
  const [eduList, setEduList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '' });

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      console.log('Education data:', res.data);
      setEduList(res.data.data);
    } catch (err) {
      console.error('Error fetching education:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/education', formData);
      setIsModalOpen(false);
      fetchEducation();
      setFormData({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '' });
    } catch (err) {
      console.error('Error saving education:', err);
      alert('Error saving education. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Academic History</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-500 transition">
          <Plus size={20} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {eduList.map((edu) => {
          const eduId = edu._id?.$oid || edu._id;
          return (
          <div key={eduId} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-center hover:border-slate-700 transition">
            <div className="flex gap-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 h-fit"><GraduationCap size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <p className="text-slate-400">{edu.institution}</p>
                {edu.field_of_study && <p className="text-slate-500 text-sm">{edu.field_of_study}</p>}
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <Calendar size={12} /> {edu.start_year} — {edu.end_year || 'Ongoing'}
                </div>
              </div>
            </div>
            <button onClick={async () => { 
              try {
                await api.delete(`/education/${eduId}`); 
                fetchEducation();
              } catch (err) {
                console.error('Error deleting education:', err);
              }
            }} className="text-slate-600 hover:text-red-500 transition p-2">
              <Trash2 size={20} />
            </button>
          </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Education Record">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="University Name" 
            value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} required />
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Degree / Certificate" 
            value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} required />
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Field of Study" 
            value={formData.field_of_study} onChange={(e) => setFormData({...formData, field_of_study: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Start Year" 
              value={formData.start_year} onChange={(e) => setFormData({...formData, start_year: e.target.value})} required />
            <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="End Year" 
              value={formData.end_year} onChange={(e) => setFormData({...formData, end_year: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-blue-600 py-3 rounded-2xl font-bold hover:bg-blue-500 transition mt-4">Save Education</button>
        </form>
      </Modal>
    </div>
  );
};

export default Education;