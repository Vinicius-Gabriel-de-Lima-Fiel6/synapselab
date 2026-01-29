import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LayoutDashboard, Beaker, LogOut, ShieldCheck, Database, Zap, Activity } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const App = () => {
  const [logado, setLogado] = useState(false);
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState({ reagentes: 0, analises: 0, alertas: 0 });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
    });
    const data = await res.json();
    if (data.logado) {
      setUserData(data.user_data);
      setLogado(true);
      fetchMetrics();
    } else {
      alert("Acesso Negado.");
    }
  };

  const fetchMetrics = async () => {
    const res = await fetch(`${API_URL}/api/metricas`);
    const data = await res.json();
    setMetrics(data);
  };

  if (!logado) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 font-sans">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <h1 className="text-4xl font-black text-white mb-8 text-center italic tracking-tighter">Synapse<span className="text-green-500">Lab</span></h1>
        <input name="email" type="email" placeholder="E-mail" className="w-full bg-slate-800 p-4 rounded-xl text-white mb-4 outline-none border border-transparent focus:border-green-500" required />
        <input name="password" type="password" placeholder="Senha" className="w-full bg-slate-800 p-4 rounded-xl text-white mb-8 outline-none border border-transparent focus:border-green-500" required />
        <button className="w-full bg-green-600 py-4 rounded-xl text-white font-black uppercase tracking-widest hover:bg-green-500 transition-all">Entrar no Sistema</button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      <aside className="w-80 bg-slate-950 text-slate-200 flex flex-col p-6 shadow-2xl">
        <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 mb-8 text-center">
          <p className="text-xl font-black text-white">{userData.org_name}</p>
          <p className="text-green-500 text-[10px] font-bold uppercase tracking-[0.2em]">{userData.role}</p>
        </div>
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-600 text-white shadow-lg font-bold">
            <LayoutDashboard size={22}/> DASHBOARD
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-900 transition-all text-slate-400 font-bold">
            <Beaker size={22}/> INVENTÁRIO
          </button>
        </nav>
        <button onClick={() => setLogado(false)} className="mt-auto p-4 text-red-500 font-black flex items-center gap-3 uppercase text-xs hover:bg-red-950/20 rounded-2xl transition-all">
          <LogOut size={20}/> Encerrar Sessão
        </button>
      </aside>

      <main className="flex-1 p-12 overflow-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase">Overview</h2>
            <p className="text-slate-500 font-bold">Bem-vindo, {userData.username}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-widest">Sistema Ativo</span>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <Database className="text-slate-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Reagentes</p>
            <p className="text-5xl font-black text-slate-900">{metrics.reagentes}</p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <Zap className="text-slate-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Análises</p>
            <p className="text-5xl font-black text-slate-900">{metrics.analises}</p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <ShieldCheck className="text-slate-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Alertas</p>
            <p className="text-5xl font-black text-red-600">{metrics.alertas}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
