import React, { useState } from 'react';
import { Beaker, Rocket, BrainCircuit, Calculator, RefreshCw } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const Calculadora = () => {
  const [subAba, setSubAba] = useState('bancada');
  const [tipo, setTipo] = useState("Molaridade (m/MM*V)");
  const [params, setParams] = useState({}); 
  const [resQ, setResQ] = useState(0.0);
  const [loading, setLoading] = useState(false);

  // Estados IA
  const [reagentes, setReagentes] = useState("");
  const [produtos, setProdutos] = useState("");
  const [resultadoIA, setResultadoIA] = useState(null);

  const calcBancada = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/calculadora`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ operacao: tipo, dados: params })
      });
      const d = await r.json();
      setResQ(d.resultado || 0);
    } catch (e) {
      console.error("Erro no cálculo:", e);
    } finally {
      setLoading(false);
    }
  };

  const calcIA = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/ia_estequiometria`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ reagentes, produtos })
      });
      const d = await r.json();
      setResultadoIA(d);
    } catch (e) {
      console.error("Erro na IA:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 min-h-[500px]">
      {/* Header de Navegação */}
      <div className="flex bg-slate-50 border-b">
        <button onClick={()=>setSubAba('bancada')} className={`flex-1 p-6 font-black transition-all flex items-center justify-center gap-2 ${subAba==='bancada'?'text-green-600 border-b-4 border-green-600 bg-white':'text-slate-400'}`}>
          <Beaker size={20}/> 📊 BANCADA
        </button>
        <button onClick={()=>setSubAba('ia')} className={`flex-1 p-6 font-black transition-all flex items-center justify-center gap-2 ${subAba==='ia'?'text-blue-600 border-b-4 border-blue-600 bg-white':'text-slate-400'}`}>
          <BrainCircuit size={20}/> 🚀 IA AVANÇADA
        </button>
      </div>

      <div className="p-10">
        {subAba === 'bancada' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o Protocolo</label>
              <select 
                value={tipo}
                onChange={(e)=>{setTipo(e.target.value); setParams({});}} 
                className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold text-slate-700 border-2 border-transparent focus:border-green-500 transition-all"
              >
                <option>Molaridade (m/MM*V)</option>
                <option>Diluição (C1V1=C2V2)</option>
                <option>pH de Ácido Forte</option>
                <option>pH de Base Forte</option>
                <option>PPM para Molaridade</option>
              </select>

              {/* Inputs Dinâmicos com base no seu calculadora.py */}
              <div className="space-y-3">
                {tipo === "Molaridade (m/MM*V)" && (
                  <>
                    <input placeholder="Fórmula (Ex: NaCl)" onChange={e=>setParams({...params, f:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" />
                    <input type="number" placeholder="Massa (g)" onChange={e=>setParams({...params, m:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" />
                    <input type="number" placeholder="Volume (mL)" onChange={e=>setParams({...params, v:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" />
                  </>
                )}

                {tipo === "Diluição (C1V1=C2V2)" && (
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="C1" onChange={e=>setParams({...params, c1:e.target.value})} className="p-4 bg-slate-100 rounded-2xl outline-none" />
                    <input type="number" placeholder="V1" onChange={e=>setParams({...params, v1:e.target.value})} className="p-4 bg-slate-100 rounded-2xl outline-none" />
                    <input type="number" placeholder="C2" onChange={e=>setParams({...params, c2:e.target.value})} className="p-4 bg-slate-100 rounded-2xl outline-none" />
                    <input type="number" placeholder="V2" onChange={e=>setParams({...params, v2:e.target.value})} className="p-4 bg-slate-100 rounded-2xl outline-none" />
                  </div>
                )}

                {(tipo.includes("pH")) && (
                  <input type="number" placeholder={tipo.includes("Ácido") ? "[H+] mol/L" : "[OH-] mol/L"} onChange={e=>setParams({...params, h:e.target.value, oh:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" />
                )}
              </div>

              <button 
                onClick={calcBancada} 
                disabled={loading}
                className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin" /> : "EXECUTAR CÁLCULO"}
              </button>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator size={120}/></div>
              <span className="text-green-400 font-bold text-xs uppercase tracking-[0.3em] mb-4">Resultado Analítico</span>
              <div className="text-7xl font-mono font-black tabular-nums">
                {resQ.toFixed(4)}
              </div>
              <p className="text-slate-500 text-sm mt-4 italic">Valores processados via motor ChemPy</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-800">Estequiometria Preditiva</h3>
              <p className="text-slate-400 text-sm">O Llama 3.3 analisará o balanceamento e os riscos da reação.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 ml-4 uppercase">Reagentes</label>
                <input placeholder="Ex: NaOH + HCl" onChange={e=>setReagentes(e.target.value)} className="w-full p-5 bg-slate-100 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-semibold" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 ml-4 uppercase">Produtos</label>
                <input placeholder="Ex: NaCl + H2O" onChange={e=>setProdutos(e.target.value)} className="w-full p-5 bg-slate-100 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-semibold" />
              </div>
            </div>

            <button 
              onClick={calcIA} 
              disabled={loading}
              className="w-full bg-blue-600 text-white p-6 rounded-3xl font-black hover:bg-blue-700 transition-all shadow-blue-200 shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <><Rocket size={20}/> PROCESSAR COM INTELIGÊNCIA ARTIFICIAL</>}
            </button>

            {resultadoIA && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-50 border-2 border-blue-100 rounded-[2rem] p-8 space-y-4">
                  <div className="flex items-center gap-3 text-blue-900">
                    <BrainCircuit size={24}/>
                    <span className="font-black uppercase tracking-tighter">Laudo Técnico Gerado</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm font-mono text-blue-800 font-bold border border-blue-100">
                    Equação Balanceada: {resultadoIA.equacao}
                  </div>
                  <p className="text-blue-700 leading-relaxed text-sm text-justify whitespace-pre-line">
                    {resultadoIA.laudo}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculadora;
