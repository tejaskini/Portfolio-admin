import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-4">
              <Lock className="text-blue-500" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 mt-2">Please sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {localError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-shake">
                <AlertCircle size={16} />
                <span>{localError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          &copy; 2026 Admin Portfolio CMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;