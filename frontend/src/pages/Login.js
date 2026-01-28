import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-cyan-500/10 rounded-full mb-4">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Synapse<span className="text-cyan-500">Lab</span></h1>
          <p className="text-slate-400 mt-2">Gestão Inteligente para Laboratórios</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" 
              placeholder="seu@email.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg mt-2 shadow-lg shadow-cyan-900/20 transition-all active:scale-[0.98]"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col gap-3 items-center text-sm">
          <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            + Cadastre sua empresa
          </button>
          <button className="text-slate-500 hover:underline">
            Recuperar senha de usuário
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
