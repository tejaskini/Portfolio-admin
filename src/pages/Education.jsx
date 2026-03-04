import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Trash2, GraduationCap, Calendar, Edit3, MapPin, Award } from 'lucide-react';

const Education = () => {
  const [eduList, setEduList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { institution: '', degree: '', field_of_study: '', start_year: '', end_year: '', location: '', score: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      setEduList(res.data.data);
    } catch (err) {
      console.error('Error fetching education:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleEditClick = (edu) => {
    const eduId = edu._id?.$oid || edu._id;
    setEditingId(eduId);
    setFormData({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field_of_study: edu.field_of_study || '',
      start_year: edu.start_year || '',
      end_year: edu.end_year || '',
      location: edu.location || '',
      score: edu.score || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (eduId) => {
    if (window.confirm("Are you sure you want to delete this education record?")) {
      try {
        await api.delete(`/education/${eduId}`);
        fetchEducation();
      } catch (err) {
        console.error('Error deleting education:', err);
        alert('Error deleting education.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enforcing integers for the backend
    const payload = {
      ...formData,
      start_year: parseInt(formData.start_year, 10),
      end_year: formData.end_year ? parseInt(formData.end_year, 10) : null 
    };

    try {
      if (editingId) {
        await api.put(`/education/${editingId}`, payload);
      } else {
        await api.post('/education', payload);
      }
      
      handleCloseModal();
      fetchEducation();
    } catch (err) {
      console.error('Error saving education:', err.response?.data || err.message);
      alert('Error saving education. Please try again.');
    }
  };

  return (
    // w-full h-full stretches perfectly into your new fixed Layout wrapper
    <div className="w-full h-full p-8 space-y-8 bg-slate-50 dark:bg-[#0A0D14] transition-colors duration-300">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Academic History</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-500 transition text-white"
        >
          <Plus size={20} /> Add Education
        </button>
      </div>

      {/* Grid Layout matching Projects.jsx */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {eduList.map((edu) => {
          const eduId = edu._id?.$oid || edu._id;
          return (
            <div key={eduId} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-600 transition group relative">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 h-fit">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                    <div className="text-slate-400 font-medium flex items-center gap-2 text-sm mt-1">
                      <span>{edu.institution}</span>
                      {edu.location && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500 flex items-center gap-1">
                            <MapPin size={14} /> {edu.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(edu)} className="text-slate-500 hover:text-blue-400 transition p-1">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => handleDelete(eduId)} className="text-slate-500 hover:text-red-500 transition p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {edu.field_of_study && <p className="text-slate-400 mb-6 text-sm">{edu.field_of_study}</p>}

              {/* Badges mimicking the tech_stack chips from Projects.jsx */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700 flex items-center gap-1.5">
                  <Calendar size={14} /> {edu.start_year} — {edu.end_year || 'Ongoing'}
                </span>
                {edu.score && (
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30 flex items-center gap-1.5">
                    <Award size={14} /> {edu.score}
                  </span>
                )}
              </div>
              
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? "Update Education" : "Create Education Entry"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
            placeholder="Institution Name" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} required />
          
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
            placeholder="Location (e.g., Mumbai, India)" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />

          <div className="grid grid-cols-2 gap-4">
            <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="Degree (e.g., B.E.)" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} required />
            <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="Score / CGPA (Optional)" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} />
          </div>

          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
            placeholder="Field of Study (e.g., Computer Science)" value={formData.field_of_study} onChange={(e) => setFormData({...formData, field_of_study: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="Start Year" value={formData.start_year} onChange={(e) => setFormData({...formData, start_year: e.target.value})} required />
            <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="End Year" value={formData.end_year} onChange={(e) => setFormData({...formData, end_year: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-white hover:bg-blue-500 transition mt-4 shadow-lg">
            {editingId ? "Save Changes" : "Publish Education"}
          </button>
        </form>
      </Modal>
      
    </div>
  );
};

export default Education;