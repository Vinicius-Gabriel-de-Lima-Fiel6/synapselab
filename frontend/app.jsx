import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LayoutDashboard, Package, Beaker, BarChart3, Users, Settings, LogOut, ChevronDown } from 'lucide-react';

const API_URL = "https://seu-backend-no-python.vercel.app"; // URL do seu FastAPI

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total_itens: 0, total_equipamentos: 0, total_registros: 0 });

  // Função de Login Conectada ao FastAPI
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.status === 'success') {
      setUser(data.user);
      setIsAuth(true);
      fetchStats(data.user.org_name);
    } else {
      alert("Erro no login!");
    }
  };

  const fetchStats = async (orgName) => {
    const res = await fetch(`${API_URL}/dashboard/metrics?org_name=${orgName}`);
    const data = await res.json();
    setStats(data);
  };

  if (!isAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">LabSmartAI</h1>
        <input name="email" type="email" placeholder="E-mail" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-4 outline-none" required />
        <input name="password" type="password" placeholder="Senha" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-6 outline-none" required />
        <button className="w-full bg-cyan-600 py-3 rounded-lg text-white font-bold hover:bg-cyan-500 transition-all">ACESSAR SISTEMA</button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col p-4">
        <div className="mb-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-cyan-400 uppercase">{user.org_name}</p>
          <p className="font-bold text-white">{user.username}</p>
          <span className="text-[10px] bg-cyan-600 px-2 py-0.5 rounded-full">{user.role}</span>
        </div>
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg"><LayoutDashboard size={20}/> Dashboard</button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg"><Package size={20}/> Laboratório</button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg"><Beaker size={20}/> Calculadora</button>
        </nav>
        <button onClick={() => setIsAuth(false)} className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg"><LogOut size={20}/> Sair</button>
      </aside>
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">🚀 Painel de Controle</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-slate-500 text-sm">Itens no Estoque</p>
            <p className="text-4xl font-bold text-cyan-600">{stats.total_itens}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-slate-500 text-sm">Equipamentos Ativos</p>
            <p className="text-4xl font-bold text-cyan-600">{stats.total_equipamentos}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-slate-500 text-sm">Total de Registros</p>
            <p className="text-4xl font-bold text-cyan-600">{stats.total_registros}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
