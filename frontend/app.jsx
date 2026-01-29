import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LayoutDashboard, Package, Beaker, BarChart3, Users, Settings, LogOut, ChevronDown, Table, FileText, ShieldCheck } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const App = () => {
  const [logado, setLogado] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selection, setSelection] = useState("🏠 Dashboard");
  const [metrics, setMetrics] = useState({ total_itens: 0, total_equipamentos: 0, total_analises: 0 });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Ajustado para enviar exatamente o que o seu Python espera
        body: JSON.stringify({ 
          email: e.target.l_email.value, 
          password: e.target.l_pass.value 
        })
      });

      const data = await res.json();
      
      if (data.logado || res.ok) {
        setUserData(data.user_data);
        setLogado(true);
        fetchMetrics(data.user_data.org_name);
      } else {
        alert("Dados incorretos.");
      }
    } catch (err) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  const fetchMetrics = async (org_name) => {
    try {
      const res = await fetch(`${API_URL}/dashboard/metrics?org_name=${org_name}`);
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Erro ao carregar métricas");
    }
  };

  if (!logado) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center">
        <img src="https://i.ibb.co/6cKPZ5Pr/Gemini-Generated-Image-jes56ljes56ljes5.png" className="w-44 h-44 rounded-full mx-auto mb-4 object-cover" />
        <h1 className="text-3xl font-bold text-white mb-2">LabSmartAI</h1>
        <h3 className="text-slate-400 mb-6">Login Administrativo</h3>
        <input name="l_email" type="email" placeholder="E-mail Profissional" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-4 outline-none focus:ring-2 focus:ring-green-500" required />
        <input name="l_pass" type="password" placeholder="Senha de Acesso" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-6 outline-none focus:ring-2 focus:ring-green-500" required />
        <button className="w-full bg-green-600 py-3 rounded-lg text-white font-bold hover:bg-green-500 transition-all uppercase tracking-widest">Acessar Sistema</button>
      </form>
    </div>
  );

  const abas = [
    { n: "🏠 Dashboard", i: <LayoutDashboard size={20}/> },
    { n: "🤖 IA & Visão", i: <ShieldCheck size={20}/> },
    { n: "💼 Laboratório", i: <Package size={20}/> },
    { n: "⚛️ Tabelas Químicas", i: <Table size={20}/> },
    { n: "🧮 Calculadora Química", i: <Beaker size={20}/> },
    { n: "📊 Gráficos", i: <BarChart3 size={20}/> }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col p-4 shadow-2xl">
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 mb-6 text-center">
          <small className="font-black text-[10px] text-green-500 uppercase tracking-widest">ORGANIZAÇÃO</small>
          <p className="font-bold text-white mb-3">{userData?.org_name}</p>
          <hr className="border-slate-700 mb-3"/>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.username}`} className="w-16 h-16 mx-auto rounded-full bg-slate-700 mb-2"/>
          <p className="text-sm">{userData?.username}</p>
          <span className="text-[10px] bg-green-600 px-3 py-1 rounded-full font-bold uppercase">{userData?.role}</span>
        </div>

        <nav className="space-y-1 flex-1">
          {abas.map(aba => (
            <button key={aba.n} onClick={() => setSelection(aba.n)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selection === aba.n ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
              {aba.i} <span className="text-sm font-semibold uppercase tracking-tight">{aba.n.split(" ")[1]}</span>
            </button>
          ))}
        </nav>

        <button onClick={() => setLogado(false)} className="mt-auto w-full p-3 text-red-400 font-bold hover:bg-red-500/10 rounded-xl flex items-center gap-3 transition-all uppercase text-xs tracking-widest">
          <LogOut size={18}/> Sair do Sistema
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        {selection === "🏠 Dashboard" && (
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter italic">🚀 Painel de Controle - {userData?.org_name}</h2>
            <div className="grid grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase">Itens no Estoque</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_itens.toLocaleString('pt-BR')}</p>
                <span className="text-green-500 text-[10px] font-bold">● Operacional</span>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase">Equipamentos</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_equipamentos}</p>
                <span className="text-green-500 text-[10px] font-bold">Ativos</span>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase">Registros</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_analises}</p>
                <span className="text-slate-400 text-[10px] font-bold">Total</span>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase">Usuário</p>
                <p className="text-2xl font-black text-slate-900 truncate">{userData?.username}</p>
                <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Nível {userData?.role}</span>
              </div>
            </div>
          </div>
        )}
        {selection !== "🏠 Dashboard" && (
            <div className="h-full bg-white rounded-[2.5rem] border border-dashed border-slate-300 flex items-center justify-center text-slate-400 italic">
                A aba {selection} está pronta para receber a integração de dados.
            </div>
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
