import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Github, ExternalLink, Trash2, Edit3 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track if editing
  
  const initialForm = { title: '', description: '', tech_stack: [], repo_link: '', live_link: '', image_url: '' };
  const [formData, setFormData] = useState(initialForm);
  const [newTech, setNewTech] = useState('');

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleEdit = (project) => {
    const id = project._id?.$oid || project._id;
    setEditingId(id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      tech_stack: project.tech_stack || [],
      repo_link: project.repo_link || '',
      live_link: project.live_link || '',
      image_url: project.image_url || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
    setNewTech('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare payload
    const payload = {
      title: formData.title,
      description: formData.description,
      tech_stack: formData.tech_stack,
    };
    if (formData.repo_link) payload.repo_link = formData.repo_link;
    if (formData.live_link) payload.live_link = formData.live_link;
    if (formData.image_url) payload.image_url = formData.image_url;

    try {
      if (editingId) {
        // PUT request for editing
        await api.put(`/projects/${editingId}`, payload);
      } else {
        // POST request for new project
        await api.post('/projects', payload);
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Error saving project. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Portfolio Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-500 transition text-white"
        >
          <Plus size={20} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const projectId = project._id?.$oid || project._id;
          return (
            <div key={projectId} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-600 transition group relative">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {project.image_url && (
                      <img src={project.image_url} alt={project.title} className="w-16 h-16 object-cover rounded-xl" />
                    )}
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(project)} 
                      className="text-slate-500 hover:text-blue-400 transition p-1"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={async () => { 
                        if(window.confirm("Delete this project?")) {
                          try {
                            await api.delete(`/projects/${projectId}`);
                            fetchProjects();
                          } catch (err) { console.error(err); }
                        }
                      }} 
                      className="text-slate-500 hover:text-red-500 transition p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-slate-400 mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a href={project.repo_link} target="_blank" rel="noreferrer" className="flex-1 bg-slate-800 py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition text-white">
                  <Github size={18} /> Code
                </a>
                <a href={project.live_link} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600/10 text-blue-500 py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600/20 transition">
                  <ExternalLink size={18} /> Demo
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingId ? "Update Project" : "Create Project Entry"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
            placeholder="Project Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <textarea 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none h-32" 
            placeholder="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            required 
          />
          
          <div className="space-y-2">
            <label className="text-sm text-slate-300 font-medium">Tech Stack</label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-slate-900/50 rounded-xl border border-slate-800">
              {formData.tech_stack.map((tech, idx) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
                  {tech}
                  <button type="button" onClick={() => {
                      const newArr = [...formData.tech_stack];
                      newArr.splice(idx, 1);
                      setFormData({...formData, tech_stack: newArr});
                    }} className="hover:text-red-400 ml-1">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="Add tech (e.g. React)"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const trimmed = newTech.trim();
                    if (trimmed) {
                      setFormData({...formData, tech_stack: [...formData.tech_stack, trimmed]});
                      setNewTech('');
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const trimmed = newTech.trim();
                  if (trimmed) {
                    setFormData({...formData, tech_stack: [...formData.tech_stack, trimmed]});
                    setNewTech('');
                  }
                }}
                className="bg-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-600 transition text-white"
              >
                Add
              </button>
            </div>
          </div>

          <input 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
            placeholder="Image URL (optional)" 
            value={formData.image_url} 
            onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="Repo Link (optional)" 
              value={formData.repo_link} 
              onChange={(e) => setFormData({...formData, repo_link: e.target.value})} 
            />
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
              placeholder="Demo Link (optional)" 
              value={formData.live_link} 
              onChange={(e) => setFormData({...formData, live_link: e.target.value})} 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition mt-4 text-white shadow-lg">
            {editingId ? "Save Changes" : "Publish Project"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;