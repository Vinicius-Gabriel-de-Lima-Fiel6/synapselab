import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">SynapseLab</h1>
          <p className="text-slate-400 mt-2">Acesse sua conta</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm text-slate-300 mb-1">E-mail</label>
            <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="nome@empresa.com" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Senha</label>
            <input type="password" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="••••••••" />
          </div>
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors">
            Entrar
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 items-center text-sm">
          <button className="text-cyan-400 hover:underline">Cadastre sua empresa</button>
          <button className="text-slate-400 hover:underline">Esqueci minha senha</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
