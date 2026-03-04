import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Layers, 
  LogOut, 
  UserCircle ,
  ExternalLink
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20}/>, label: 'Dashboard' },
    { path: '/projects', icon: <Code size={20}/>, label: 'Projects' },
    { path: '/experience', icon: <Briefcase size={20}/>, label: 'Experience' },
    { path: '/education', icon: <GraduationCap size={20}/>, label: 'Education' },
    { path: '/skills', icon: <Layers size={20}/>, label: 'Skills' },
   { path: '/account', icon: <UserCircle size={20}/>, label: 'Account' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // Updated background to match your #0A0D14 theme
    <aside className="w-64 bg-[#0A0D14] text-white flex flex-col border-r border-slate-800/60 shadow-xl">
      <div className="p-6 text-2xl font-bold border-b border-slate-800/60 tracking-tight">
        Admin CMS
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button Section */}
      <div className="p-4 border-t border-slate-800/60">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200"
        >
          <LogOut size={20}/>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;