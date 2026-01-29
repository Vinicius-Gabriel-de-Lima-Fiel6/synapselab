import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Beaker, LogOut, Database, Zap, ShieldAlert } from 'lucide-react';

// Inicialização do Client do Supabase no Frontend
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const App = () => {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState({ reagentes: 0, analises: 0, alertas: 0 });

  useEffect(() => {
    // Mantém a sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
    });
  }, []);

  const fetchUserData = async (userId) => {
    const { data } = await supabase.table('perfis').select('*').eq('id', userId).single();
    setUserData(data);
    loadMetrics();
  };

  const loadMetrics = async () => {
    const { data: m } = await fetch(`${import.meta.env.VITE_API_URL}/api/metricas`).then(r => r.json());
    setMetrics(m);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (error) alert(error.message);
    else {
      setSession(data.session);
      fetchUserData(data.user.id);
    }
  };

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-10 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-black text-white mb-8 text-center italic">Synapse<span className="text-green-500">Lab</span></h1>
        <input name="email" type="email" placeholder="E-mail" className="w-full bg-slate-800 p-4 rounded-xl text-white mb-4 outline-none border border-slate-700 focus:border-green-500" />
        <input name="password" type="password" placeholder="Senha" className="w-full bg-slate-800 p-4 rounded-xl text-white mb-8 outline-none border border-slate-700 focus:border-green-500" />
        <button className="w-full bg-green-600 py-4 rounded-xl text-white font-black uppercase tracking-widest hover:bg-green-500 transition-all">Autenticar</button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className="w-80 bg-slate-950 text-slate-200 flex flex-col p-6 shadow-2xl">
        <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 mb-8 text-center">
          <p className="text-xl font-black text-white">{userData?.org_name || "Carregando..."}</p>
          <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">{userData?.role}</p>
        </div>
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-600 text-white font-bold shadow-lg shadow-green-900/20">
            <LayoutDashboard size={22}/> DASHBOARD
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-900 transition-all text-slate-400 font-bold">
            <Beaker size={22}/> INVENTÁRIO
          </button>
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => setSession(null))} className="p-4 text-red-500 font-black flex items-center gap-3 uppercase text-xs">
          <LogOut size={20}/> SAIR DO SISTEMA
        </button>
      </aside>

      <main className="flex-1 p-12">
        <header className="mb-12">
          <h2 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter">Dashboard</h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Sessão ativa como: {userData?.username}</p>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <Database className="text-slate-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Itens de Estoque</p>
            <p className="text-5xl font-black text-slate-900">{metrics.reagentes}</p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <Zap className="text-slate-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Relatórios</p>
            <p className="text-5xl font-black text-slate-900">{metrics.analises}</p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
            <ShieldAlert className="text-red-300 mb-4" size={32}/>
            <p className="text-slate-400 text-xs font-black uppercase mb-1">Alertas GHS</p>
            <p className="text-5xl font-black text-red-600">{metrics.alertas}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
