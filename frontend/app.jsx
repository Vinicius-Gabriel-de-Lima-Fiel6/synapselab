import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  LayoutDashboard, Package, Beaker, BarChart3, Users, Settings, 
  LogOut, ChevronDown, Table, FileText, ShieldCheck, Rocket, 
  FlaskConical, Binary, Download 
} from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

// --- INÍCIO DO COMPONENTE DA CALCULADORA (SUA LÓGICA FIEL) ---
const CalculadoraQuimica = () => {
  const [subAba, setSubAba] = useState("📊 Power Bancada");
  const [resAnalitica, setResAnalitica] = useState("0.0000");

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic">
        🧪 Central de Inteligência Química
      </h2>
      
      {/* Sub-abas FIÉIS ao st.tabs do seu código original */}
      <div className="flex gap-4 mb-8 bg-slate-200 p-1 rounded-2xl w-fit">
        {["📊 Power Bancada", "🚀 Estequiometria IA"].map(tab => (
          <button 
            key={tab}
            onClick={() => setSubAba(tab)}
            className={`px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
              subAba === tab ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {subAba === "📊 Power Bancada" ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><FlaskConical size={24}/></div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">1. Química Analítica e Soluções</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Cálculo Analítico</label>
                <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 font-medium text-slate-700">
                  <option>Molaridade (m/MM*V)</option>
                  <option>Diluição (C1V1=C2V2)</option>
                  <option>pH de Ácido Forte</option>
                  <option>pH de Base Forte</option>
                  <option>pOH</option>
                  <option>Normalidade</option>
                  <option>Fração Molar</option>
                  <option>Rendimento Percentual</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Fórmula (Ex: NaCl)" className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" />
                  <input type="number" placeholder="Massa (g)" className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 p-6 text-center">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-2 tracking-widest">Resultado do Cálculo</p>
                <p className="text-5xl font-black text-green-600 font-mono tracking-tighter">{resAnalitica}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-500">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
             <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tight">1. Definição da Reação</h3>
             <div className="space-y-4">
                <input placeholder="Reagentes: NaOH + HCl" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Produtos: NaCl + H2O" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black hover:bg-blue-500 shadow-lg shadow-blue-200 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                  <Rocket size={20}/> Analisar com IA
                </button>
             </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col min-h-[300px]">
             <h3 className="text-lg font-black mb-6 uppercase text-blue-400 tracking-widest">3. Resultado e PDF</h3>
             <div className="flex-1 flex items-center justify-center text-slate-500 italic text-sm text-center px-6">
                Insira os dados da reação à esquerda para processar o balanceamento e o laudo técnico.
             </div>
             <button className="mt-6 w-full bg-slate-800 py-3 rounded-xl text-slate-500 font-bold border border-slate-700 cursor-not-allowed flex items-center justify-center gap-2">
               <Download size={18}/> Baixar Laudo PDF
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
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
        body: JSON.stringify({ email: e.target.l_email.value, password: e.target.l_pass.value })
      });
      const data = await res.json();
      if (data.logado) {
        setUserData(data.user_data);
        setLogado(true);
        fetchMetrics(data.user_data.org_name);
      } else {
        alert("Dados incorretos.");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const fetchMetrics = async (org_name) => {
    try {
      const res = await fetch(`${API_URL}/dashboard/metrics?org_name=${org_name}`);
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Erro ao buscar métricas");
    }
  };

  if (!logado) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center">
        <img src="https://i.ibb.co/6cKPZ5Pr/Gemini-Generated-Image-jes56ljes56ljes5.png" className="w-44 h-44 rounded-full mx-auto mb-4 object-cover border-4 border-slate-800" />
        <h1 className="text-3xl font-bold mb-2">SynapseLab</h1>
        <h3 className="text-slate-400 mb-6 font-medium">Login Pessoal</h3>
        <input name="l_email" type="email" placeholder="E-mail Profissional" className="w-full bg-slate-800 p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
        <input name="l_pass" type="password" placeholder="Senha de Acesso" className="w-full bg-slate-800 p-3 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
        <button className="w-full bg-green-600 py-3 rounded-lg font-bold hover:bg-green-500 transition-all uppercase tracking-widest">Acessar Sistema</button>
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
    <div className="flex min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col p-4 shadow-2xl sticky top-0 h-screen">
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 mb-6 text-center shadow-inner">
          <small className="font-black text-[10px] text-green-500 uppercase tracking-widest">ORGANIZAÇÃO</small>
          <p className="font-bold text-white mb-3 truncate px-2">{userData.org_name}</p>
          <hr className="border-slate-700 mb-3"/>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`} className="w-16 h-16 mx-auto rounded-full bg-slate-700 mb-2 border-2 border-slate-600 shadow-md"/>
          <p className="text-sm font-medium">{userData.username}</p>
          <span className="text-[10px] bg-green-600 px-3 py-1 rounded-full font-bold uppercase tracking-tighter">{userData.role}</span>
        </div>

        <nav className="space-y-1 flex-1">
          {abas.map(aba => (
            <button 
              key={aba.n} 
              onClick={() => setSelection(aba.n)} 
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                selection === aba.n ? 'bg-green-600 text-white shadow-lg translate-x-1' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {aba.i} <span className="text-sm font-semibold uppercase tracking-tight">{aba.n.split(" ")[1]}</span>
            </button>
          ))}
        </nav>

        <button onClick={() => setLogado(false)} className="mt-auto w-full p-3 text-red-400 font-bold hover:bg-red-500/10 rounded-xl flex items-center gap-3 transition-all uppercase text-[10px] tracking-widest">
          <LogOut size={18}/> Sair do Sistema
        </button>
      </aside>

      {/* ÁREA DE CONTEÚDO */}
      <main className="flex-1 p-10 overflow-auto">
        {selection === "🏠 Dashboard" ? (
          <div className="animate-in fade-in duration-700 slide-in-from-bottom-2">
            <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter italic">🚀 Painel de Controle - {userData.org_name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Itens no Estoque</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_itens.toLocaleString('pt-BR')}</p>
                <span className="text-green-500 text-[10px] font-bold uppercase">● Online</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Equipamentos</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_equipamentos}</p>
                <span className="text-green-500 text-[10px] font-bold uppercase">Ativos</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Registros</p>
                <p className="text-4xl font-black text-slate-900">{metrics.total_analises}</p>
                <span className="text-slate-400 text-[10px] font-bold uppercase">Total</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Perfil Ativo</p>
                <p className="text-xl font-black text-slate-900 truncate tracking-tight">{userData.username}</p>
                <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Nível {userData.role}</span>
              </div>
            </div>
          </div>
        ) : selection === "🧮 Calculadora Química" ? (
          <CalculadoraQuimica />
        ) : (
          <div className="h-full bg-white rounded-[2.5rem] border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-400 italic shadow-inner">
            A aba {selection} está em fase de conexão de dados.
          </div>
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
