import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LayoutDashboard, Beaker, LogOut, Table, ShieldCheck, Rocket, FlaskConical, Binary, Download } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const App = () => {
  const [logado, setLogado] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selection, setSelection] = useState("🏠 Dashboard");
  const [subAba, setSubAba] = useState("📊 Power Bancada");
  const [resultadoIA, setResultadoIA] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e.target.l_email.value, password: e.target.l_pass.value })
    });
    const data = await res.json();
    if (data.logado) {
      setUserData(data.user_data);
      setLogado(true);
    } else {
      alert("Credenciais Inválidas");
    }
  };

  if (!logado) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">SynapseLab</h1>
        <input name="l_email" type="email" placeholder="E-mail Profissional" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-4 outline-none focus:ring-2 focus:ring-green-500" required />
        <input name="l_pass" type="password" placeholder="Senha" className="w-full bg-slate-800 p-3 rounded-lg text-white mb-6 outline-none focus:ring-2 focus:ring-green-500" required />
        <button className="w-full bg-green-600 py-3 rounded-lg text-white font-bold hover:bg-green-500 uppercase tracking-widest transition-all">Acessar Sistema</button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col p-4 shadow-2xl">
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 mb-6 text-center">
          <p className="font-bold text-white mb-1">{userData.org_name}</p>
          <small className="text-green-500 font-bold uppercase text-[10px] tracking-widest">{userData.role}</small>
        </div>
        <nav className="space-y-1 flex-1">
          {["🏠 Dashboard", "🧮 Calculadora Química", "⚛️ Tabelas Químicas"].map(n => (
            <button key={n} onClick={() => setSelection(n)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selection === n ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
              <Beaker size={20}/> <span className="text-sm font-semibold uppercase">{n.split(" ")[1]}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => setLogado(false)} className="p-3 text-red-400 font-bold flex items-center gap-3 uppercase text-xs">
          <LogOut size={18}/> Sair
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        {selection === "🏠 Dashboard" && (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic">🚀 Painel Synapse</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase">Status</p>
                <p className="text-4xl font-black text-green-600">ATIVO</p>
              </div>
            </div>
          </div>
        )}

        {selection === "🧮 Calculadora Química" && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase italic">🧪 Central de Cálculos</h2>
            <div className="flex gap-2 mb-8 bg-slate-200 p-1 rounded-xl w-fit">
              {["📊 Power Bancada", "🚀 Estequiometria IA"].map(tab => (
                <button key={tab} onClick={() => setSubAba(tab)} className={`px-6 py-2 rounded-lg font-bold text-xs uppercase transition-all ${subAba === tab ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {subAba === "📊 Power Bancada" ? (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 uppercase mb-6 flex items-center gap-2"><FlaskConical/> 1. Química Analítica</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <select className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-medium">
                      <option>Molaridade (m/MM*V)</option>
                      <option>Diluição (C1V1=C2V2)</option>
                      <option>pH de Ácido Forte</option>
                    </select>
                    <div className="bg-slate-50 border-2 border-dashed rounded-2xl flex items-center justify-center p-4">
                      <p className="text-4xl font-black text-green-600 font-mono">0.0000</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 uppercase">Definição da Reação</h3>
                  <input placeholder="Reagentes (Ex: NaOH + HCl)" className="w-full bg-slate-50 border p-4 rounded-2xl mb-4 outline-none" />
                  <input placeholder="Produtos (Ex: NaCl + H2O)" className="w-full bg-slate-50 border p-4 rounded-2xl mb-6 outline-none" />
                  <button className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-3">
                    <Rocket size={20}/> Analisar com IA
                  </button>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-blue-400 overflow-auto font-mono text-xs">
                  {resultadoIA ? resultadoIA.laudo : "// Aguardando dados para processamento via Llama-3.3..."}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
