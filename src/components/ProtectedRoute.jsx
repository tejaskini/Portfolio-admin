import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    // min-h-screen ensures the background color covers the entire height
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar stays fixed at its width */}
      <Sidebar />
      
      {/* Main Content: flex-1 makes it take 100% of the remaining horizontal space */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Scrollable area for the actual page content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Outlet renders your Dashboard, Projects, etc. */}
          <div className="w-full"> 
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProtectedRoute;