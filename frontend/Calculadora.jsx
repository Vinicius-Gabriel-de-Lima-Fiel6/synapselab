import React, { useState } from 'react';
import { Beaker, Rocket, BrainCircuit, Calculator } from 'lucide-react';

const API_URL = "https://synapselab-ej2u.vercel.app";

const Calculadora = () => {
  const [subAba, setSubAba] = useState('bancada');
  const [tipo, setTipo] = useState("Molaridade (m/MM*V)");
  const [params, setParams] = useState({ f: "NaCl", m: 0, v: 1000 });
  const [resQ, setResQ] = useState(0.0);

  // Estados IA
  const [reagentes, setReagentes] = useState("");
  const [produtos, setProdutos] = useState("");
  const [resultadoIA, setResultadoIA] = useState(null);

  const calcBancada = async () => {
    const r = await fetch(`${API_URL}/api/calculadora`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ operacao: tipo, dados: params })
    });
    const d = await r.json();
    setResQ(d.resultado);
  };

  const calcIA = async () => {
    const r = await fetch(`${API_URL}/api/ia_estequiometria`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ reagentes, produtos })
    });
    const d = await r.json();
    setResultadoIA(d);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
      <div className="flex bg-slate-50 border-b">
        <button onClick={()=>setSubAba('bancada')} className={`flex-1 p-6 font-bold ${subAba==='bancada'?'text-green-600 border-b-4 border-green-600':'text-slate-400'}`}>📊 BANCADA</button>
        <button onClick={()=>setSubAba('ia')} className={`flex-1 p-6 font-bold ${subAba==='ia'?'text-blue-600 border-b-4 border-blue-600':'text-slate-400'}`}>🚀 IA AVANÇADA</button>
      </div>

      <div className="p-10">
        {subAba === 'bancada' ? (
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <select onChange={(e)=>setTipo(e.target.value)} className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold text-slate-700">
                <option>Molaridade (m/MM*V)</option>
                <option>Diluição (C1V1=C2V2)</option>
                <option>pH de Ácido Forte</option>
              </select>
              <input placeholder="Fórmula" onChange={e=>setParams({...params, f:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl" />
              <input type="number" placeholder="Massa/Valor" onChange={e=>setParams({...params, m:e.target.value})} className="w-full p-4 bg-slate-100 rounded-2xl" />
              <button onClick={calcBancada} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black">EXECUTAR</button>
            </div>
            <div className="bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white">
              <span className="text-green-400 font-bold text-xs uppercase">Resultado</span>
              <div className="text-6xl font-mono font-black">{resQ.toFixed(4)}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex gap-4">
              <input placeholder="Reagentes" onChange={e=>setReagentes(e.target.value)} className="flex-1 p-4 bg-slate-100 rounded-2xl" />
              <input placeholder="Produtos" onChange={e=>setProdutos(e.target.value)} className="flex-1 p-4 bg-slate-100 rounded-2xl" />
            </div>
            <button onClick={calcIA} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black">PROCESSAR COM LLAMA 3.3</button>
            {resultadoIA && (
              <div className="mt-6 p-6 bg-blue-50 border border-blue-100 rounded-3xl text-left">
                <p className="font-bold text-blue-900 mb-2">Equação: {resultadoIA.equacao}</p>
                <p className="text-sm text-blue-700 italic leading-relaxed">{resultadoIA.laudo}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Calculadora;
