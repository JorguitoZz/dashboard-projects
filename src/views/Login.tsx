import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Dev-Connect <span className="text-emerald-500">BR</span>
        </h1>
        <Link 
          to="/dashboard" 
          className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white text-center font-medium py-3 rounded-lg transition-all"
        >
          Entrar ao Dashboard
        </Link>
      </div>
    </div>
  );
};