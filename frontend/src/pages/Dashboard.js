import React, { useState } from 'react';
import { 
  Beaker, LayoutDashboard, Package, BarChart3, 
  FileText, Settings, Users, ChevronDown, LogOut, UserCircle 
} from 'lucide-react';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Painel de Controle', icon: <LayoutDashboard size={20}/> },
    { name: 'Sala de Estoque', icon: <Package size={20}/> },
    { name: 'Calculadora Química', icon: <Beaker size={20}/> },
    { name: 'Gráficos', icon: <BarChart3 size={20}/> },
    { name: 'Relatórios', icon: <FileText size={20}/> },
    { name: 'Gestão de Equipe', icon: <Users size={20}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col">
        {/* Profile Card */}
        <div className="p-6">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-cyan-500 mb-3"
            />
            <h3 className="font-bold text-white">Dr. Ricardo Silva</h3>
            <p className="text-xs text-cyan-400 font-medium">SynapseLab S.A.</p>
            <p className="text-xs text-slate-400">Diretor Técnico</p>
          </div>

          {/* Opções Dropdown */}
          <div className="relative mt-4">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-all"
            >
              <span className="text-sm font-medium">Opções</span>
              <ChevronDown size={16} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform`}/>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 overflow-hidden z-10">
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-sm"><UserCircle size={16}/> Perfil</button>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-sm"><Settings size={16}/> Configurações</button>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm border-t border-slate-100"><LogOut size={16}/> Sair</button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button key={item.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-600/10 hover:text-cyan-400 rounded-lg transition-colors group">
              <span className="text-slate-400 group-hover:text-cyan-400">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Bem-vindo ao SynapseLab</h2>
          <p className="text-slate-500">Selecione uma ferramenta no menu lateral para começar.</p>
        </header>
        
        {/* Placeholder para conteúdo das abas */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl h-[calc(100vh-200px)] flex items-center justify-center text-slate-400">
          Conteúdo da aba selecionada aparecerá aqui.
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
