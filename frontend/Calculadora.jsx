import React, { useState } from 'react';
import { Beaker, Rocket, Download, Calculator, BrainCircuit } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const Calculadora = () => {
  const [subAba, setSubAba] = useState('bancada');
  
  // Estados para Power Bancada
  const [tipoAnalitica, setTipoAnalitica] = useState("Molaridade (m/MM*V)");
  const [params, setParams] = useState({ f: "NaCl", m: 0, v: 1000, v1: 0, c1: 0, v2: 0, c2: 0, h: 1, oh: 1 });
  const [resQ, setResQ] = useState(0.0);

  // Estados para Estequiometria IA
  const [reagentes, setReagentes] = useState("");
  const [produtos, setProdutos] = useState("");
  const [resultadoIA, setResultadoIA] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalcularAnalitica = async () => {
    try {
      const res = await fetch(`${API_URL}/api/calculadora`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operacao: tipoAnalitica, dados: params })
      });
      const data = await res.json();
      setResQ(data.resultado);
    } catch (error) {
      console.error("Erro no cálculo:", error);
    }
  };

  const handleAnalisarIA = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/estequiometria`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reagentes, produtos })
      });
      const data = await res.json();
      setResultadoIA(data);
    } catch (error) {
      console.error("Erro na IA:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Seletor de Sub-Abas */}
        <div className="flex bg-slate-50 border-b border-slate-200">
          <button 
            onClick={() => setSubAba('bancada')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-all ${subAba === 'bancada' ? 'bg-white text-green-600 border-b-4 border-green-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Beaker size={20} /> 📊 POWER BANCADA
          </button>
          <button 
            onClick={() => setSubAba('avancada')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-all ${subAba === 'avancada' ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <BrainCircuit size={20} /> 🚀 ESTEQUIOMETRIA IA
          </button>
        </div>

        <div className="p-8">
          {subAba === 'bancada' ? (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-800 uppercase italic">🧪 Química Analítica e Soluções</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Selecione a Operação</label>
                  <select 
                    className="w-full bg-slate-100 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                    value={tipoAnalitica}
                    onChange={(e) => setTipoAnalitica(e.target.value)}
                  >
                    <option>Molaridade (m/MM*V)</option>
                    <option>Diluição (C1V1=C2V2)</option>
                    <option>pH de Ácido Forte</option>
                    <option>pH de Base Forte</option>
                    <option>PPM para Molaridade</option>
                  </select>

                  {/* Inputs Dinâmicos conforme a função */}
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Fórmula (NaCl)" 
                      className="bg-slate-100 p-4 rounded-2xl outline-none"
                      onChange={(e) => setParams({...params, f: e.target.value})}
                    />
                    {tipoAnalitica.includes("Molaridade") ? (
                      <input 
                        type="number" placeholder="Massa (g)" 
                        className="bg-slate-100 p-4 rounded-2xl outline-none"
                        onChange={(e) => setParams({...params, m: e.target.value})}
                      />
                    ) : (
                      <input 
                        type="number" placeholder="Concentração" 
                        className="bg-slate-100 p-4 rounded-2xl outline-none"
                        onChange={(e) => setParams({...params, c1: e.target.value})}
                      />
                    )}
                  </div>
                  
                  <button 
                    onClick={handleCalcularAnalitica}
                    className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition-all shadow-lg uppercase tracking-tighter"
                  >
                    Calcular Agora
                  </button>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                  <span className="text-green-500 text-xs font-black uppercase tracking-[0.2em] mb-2">Resultado Final</span>
                  <div className="text-5xl font-mono font-black text-white">{resQ.toFixed(4)}</div>
                  <small className="text-slate-500 mt-2">Unidade calculada via SI</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-800 uppercase italic">🤖 Inteligência Artificial Preditiva</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <input 
                    placeholder="Reagentes (Ex: NaOH + HCl)" 
                    className="w-full bg-slate-100 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500"
                    value={reagentes}
                    onChange={(e) => setReagentes(e.target.value)}
                  />
                  <input 
                    placeholder="Produtos (Ex: NaCl + H2O)" 
                    className="w-full bg-slate-100 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500"
                    value={produtos}
                    onChange={(e) => setProdutos(e.target.value)}
                  />
                  <button 
                    onClick={handleAnalisarIA}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all uppercase"
                  >
                    {loading ? "PROCESSANDO..." : "ANALISAR COM LLAMA 3.3"}
                  </button>
                </div>

                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 min-h-[200px]">
                  {resultadoIA ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-100 text-blue-800 rounded-xl font-bold text-sm">
                        Equação Balanceada: {resultadoIA.equacao}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        "{resultadoIA.laudo}"
                      </p>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                      <Rocket size={40} className="mb-2 opacity-20" />
                      <p className="text-xs uppercase font-bold">Aguardando dados para análise estequiométrica</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
