import { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import { Plus, Github, ExternalLink, Trash2, Code } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', tech_stack: '', github_link: '', live_link: '' });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, tech_stack: formData.tech_stack.split(',').map(s => s.trim()) };
    await api.post('/projects', dataToSend);
    setIsModalOpen(false);
    fetchProjects();
    setFormData({ title: '', description: '', tech_stack: '', github_link: '', live_link: '' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Portfolio Projects</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-500 transition">
          <Plus size={20} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-600 transition group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <button onClick={async () => { await api.delete(`/projects/${project._id}`); fetchProjects(); }} className="text-slate-600 hover:text-red-500 transition">
                  <Trash2 size={20} />
                </button>
              </div>
              <p className="text-slate-400 mb-6 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech_stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <a href={project.github_link} className="flex-1 bg-slate-800 py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition">
                <Github size={18} /> Code
              </a>
              <a href={project.live_link} className="flex-1 bg-blue-600/10 text-blue-500 py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600/20 transition">
                <ExternalLink size={18} /> Demo
              </a>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Project Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Project Title" 
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none h-32" placeholder="Description" 
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Tech Stack (comma separated)" 
            value={formData.tech_stack} onChange={(e) => setFormData({...formData, tech_stack: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Github Link" 
              value={formData.github_link} onChange={(e) => setFormData({...formData, github_link: e.target.value})} />
            <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Live Demo Link" 
              value={formData.live_link} onChange={(e) => setFormData({...formData, live_link: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition mt-4 shadow-xl shadow-blue-900/20">Publish Project</button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;