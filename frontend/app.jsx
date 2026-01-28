import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Beaker, LayoutDashboard, Package, BarChart3, 
  FileText, Settings, Users, ChevronDown, LogOut, 
  UserCircle, Table, ShieldCheck 
} from 'lucide-react';

// --- TELA DE LOGIN ---
const Login = ({ onLogin }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
    <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Synapse<span className="text-cyan-500">Lab</span></h1>
        <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">Acesso ao Sistema</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <input type="email" placeholder="E-mail" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
        <input type="password" placeholder="Senha" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg">
          Entrar
        </button>
      </form>
      <div className="mt-8 flex flex-col gap-3 items-center text-sm">
        <button className="text-cyan-400 hover:text-cyan-300 font-medium">Cadastre sua empresa</button>
        <button className="text-slate-500 hover:underline">Recuperar sua senha de usuário</button>
      </div>
    </div>
  </div>
);

// --- DASHBOARD ---
const Dashboard = ({ onLogout }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const menuItems = [
    { name: 'Sala de estoque', icon: <Package size={20}/> },
    { name: 'Calculadora química', icon: <Beaker size={20}/> },
    { name: 'Gráficos', icon: <BarChart3 size={20}/> },
    { name: 'Relatórios', icon: <FileText size={20}/> },
    { name: 'Painel de controle', icon: <LayoutDashboard size={20}/> },
    { name: 'Tabelas', icon: <Table size={20}/> },
    { name: 'Gestão de equipe', icon: <Users size={20}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter text-center">Synapse<span className="text-cyan-500">Lab</span></h2>
        </div>

        {/* Card de Perfil */}
        <div className="p-4">
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center font-bold text-white text-xl">HS</div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-sm truncate">Henrique Souza</h3>
                <p className="text-[10px] text-cyan-400 font-black">SynapseLab Tech</p>
                <p className="text-[10px] text-slate-400">Diretor de P&D</p>
              </div>
            </div>

            {/* Menu Suspenso Opções */}
            <div className="relative">
              <button 
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="w-full flex items-center justify-between bg-slate-700 hover:bg-slate-600 p-2.5 rounded-lg text-[10px] font-black uppercase border border-slate-600"
              >
                Opções <ChevronDown size={14} className={`${isOptionsOpen ? 'rotate-180' : ''} transition-transform`}/>
              </button>
              
              {isOptionsOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl text-slate-800 overflow-hidden z-50">
                  <button className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold border-b border-slate-100">
                    <UserCircle size={16} className="text-slate-400"/> Editar perfil
                  </button>
                  <button className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold border-b border-slate-100">
                    <Settings size={16} className="text-slate-400"/> Configurações do sistema
                  </button>
                  <button onClick={onLogout} className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 text-xs font-bold">
                    <LogOut size={16}/> Sair do sistema
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button key={item.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition-all">
              <span className="text-slate-500">{item.icon}</span>
              <span className="text-sm font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-10 flex items-center justify-center text-slate-300">
        <p className="text-2xl font-light italic">Selecione uma aba no menu lateral</p>
      </main>
    </div>
  );
};

// --- APP E RENDERIZAÇÃO ---
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? <Dashboard onLogout={() => setIsAuth(false)} /> : <Login onLogin={() => setIsAuth(true)} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
