import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, GraduationCap, Code, Layers, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20}/>, label: 'Dashboard' },
    { path: '/projects', icon: <Code size={20}/>, label: 'Projects' },
    { path: '/experience', icon: <Briefcase size={20}/>, label: 'Experience' },
    { path: '/education', icon: <GraduationCap size={20}/>, label: 'Education' },
    { path: '/skills', icon: <Layers size={20}/>, label: 'Skills' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-800">Admin CMS</div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition ${isActive ? 'bg-blue-300 text-white' : 'hover:bg-slate-800'}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="p-4 flex items-center space-x-3 hover:bg-red-600 transition mt-auto">
        <LogOut size={20}/>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;