import React, { useState } from 'react';
import { 
  Beaker, LayoutDashboard, Package, BarChart3, 
  FileText, Settings, Users, ChevronDown, LogOut, 
  UserCircle, Table, ShieldCheck
} from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Painel de Controle', icon: <LayoutDashboard size={20}/> },
    { name: 'Sala de Estoque', icon: <Package size={20}/> },
    { name: 'Calculadora Química', icon: <Beaker size={20}/> },
    { name: 'Gráficos', icon: <BarChart3 size={20}/> },
    { name: 'Relatórios', icon: <FileText size={20}/> },
    { name: 'Tabelas', icon: <Table size={20}/> },
    { name: 'Gestão de Equipe', icon: <Users size={20}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight">Synapse<span className="text-cyan-500">Lab</span></h1>
        </div>

        {/* User Profile Card */}
        <div className="p-4">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 shadow-inner">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="User Profile" 
                className="w-12 h-12 rounded-xl bg-slate-700 border border-slate-600"
              />
              <div>
                <h3 className="font-bold text-white text-sm leading-tight">Henrique Souza</h3>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Diretor de P&D</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <ShieldCheck size={12} className="text-emerald-500"/>
              <span>SynapseLab Tech</span>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-slate-700/50 hover:bg-slate-700 p-2.5 rounded-lg transition-all border border-slate-600"
              >
                <span className="text-xs font-bold uppercase">Opções</span>
                <ChevronDown size={14} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform`}/>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                  <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm font-medium transition-colors border-b border-slate-100">
                    <UserCircle size={18} className="text-slate-400"/> Editar Perfil
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm font-medium transition-colors border-b border-slate-100">
                    <Settings size={18} className="text-slate-400"/> Configurações
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-bold transition-colors"
                  >
                    <LogOut size={18}/> Sair do Sistema
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition-all group border border-transparent hover:border-cyan-500/20"
            >
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
              <span className="text-sm font-semibold tracking-wide">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Dashboard</h2>
        </header>
        
        <div className="p-8">
          <div className="bg-white border border-slate-200 rounded-3xl h-[70vh] flex flex-col items-center justify-center text-slate-400 shadow-sm">
            <div className="p-6 bg-slate-50 rounded-full mb-4">
              <Beaker size={48} className="text-slate-200" />
            </div>
            <p className="text-lg font-medium">Selecione uma categoria para visualizar os dados</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
