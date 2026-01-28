import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Beaker, LayoutDashboard, Package, BarChart3, 
  FileText, Settings, Users, ChevronDown, LogOut, 
  UserCircle, Table, ShieldCheck 
} from 'lucide-react';

const Login = ({ onLogin }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
    <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Synapse<span className="text-cyan-500">Lab</span></h1>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <input type="email" placeholder="E-mail" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500" />
        <input type="password" placeholder="Senha" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500" />
        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all">Entrar</button>
      </form>
      <div className="mt-6 flex flex-col gap-3 text-center text-sm">
        <button className="text-cyan-400 hover:underline">1) Cadastre sua empresa</button>
        <button className="text-slate-500 hover:underline">2) Recupere sua senha de usuário</button>
      </div>
    </div>
  </div>
);

const Dashboard = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const abas = [
    { n: 'Sala de estoque', i: <Package size={20}/> },
    { n: 'Calculadora química', i: <Beaker size={20}/> },
    { n: 'Gráficos', i: <BarChart3 size={20}/> },
    { n: 'Relatórios', i: <FileText size={20}/> },
    { n: 'Painel de controle', i: <LayoutDashboard size={20}/> },
    { n: 'Tabelas', i: <Table size={20}/> },
    { n: 'Gestão de equipe', i: <Users size={20}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold">HS</div>
              <div className="text-xs">
                <p className="font-bold text-white">Henrique Souza</p>
                <p className="text-cyan-400">SynapseLab</p>
                <p className="text-slate-400 italic">Diretor Técnico</p>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between bg-slate-700 p-2 rounded text-[10px] font-bold uppercase">
                Opções <ChevronDown size={14} className={open ? 'rotate-180' : ''}/>
              </button>
              {open && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white text-slate-900 rounded shadow-xl overflow-hidden z-50">
                  <button className="w-full px-4 py-2 text-left hover:bg-slate-100 flex items-center gap-2 text-xs border-b"><Settings size={14}/> Configurações</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-slate-100 flex items-center gap-2 text-xs border-b"><UserCircle size={14}/> Editar Perfil</button>
                  <button onClick={onLogout} className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 text-xs font-bold"><LogOut size={14}/> Sair</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {abas.map(a => (
            <button key={a.n} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
              {a.i} {a.n}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10 flex items-center justify-center text-slate-300">
        <p className="text-2xl font-light italic">Selecione uma aba para começar</p>
      </main>
    </div>
  );
};

export default function App() {
  const [auth, setAuth] = useState(false);
  return auth ? <Dashboard onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
