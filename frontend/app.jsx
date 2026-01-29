import React, { useState } from 'react';
import { Rocket, FlaskConical, Binary, Download } from 'lucide-react';

const Calculadora = () => {
  const [subAba, setSubAba] = useState("📊 Power Bancada");

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic">🧪 Central de Inteligência Química</h2>
      
      {/* Navegação de Sub-Abas FIÉIS ao st.tabs */}
      <div className="flex gap-4 mb-8 bg-slate-200 p-1 rounded-2xl w-fit">
        {["📊 Power Bancada", "🚀 Estequiometria IA"].map(tab => (
          <button 
            key={tab}
            onClick={() => setSubAba(tab)}
            className={`px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subAba === tab ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {subAba === "📊 Power Bancada" ? (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><FlaskConical size={24}/></div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">1. Química Analítica e Soluções</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 font-medium">
                  <option>Molaridade (m/MM*V)</option>
                  <option>Diluição (C1V1=C2V2)</option>
                  <option>pH de Ácido Forte</option>
                  <option>pH de Base Forte</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Fórmula" className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none" />
                  <input type="number" placeholder="Massa (g)" className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 p-6">
                <p className="text-4xl font-black text-green-600 font-mono">0.0000</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
             <h3 className="text-lg font-black text-slate-800 mb-6 uppercase">1. Definição da Reação</h3>
             <input placeholder="Reagentes: NaOH + HCl" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-4 outline-none" />
             <input placeholder="Produtos: NaCl + H2O" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-6 outline-none" />
             <button className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black hover:bg-blue-500 shadow-lg transition-all uppercase tracking-widest flex items-center justify-center gap-3">
               <Rocket size={20}/> Analisar com IA
             </button>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col justify-center items-center">
             <p className="text-slate-500 italic text-sm">Aguardando dados para gerar laudo...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
