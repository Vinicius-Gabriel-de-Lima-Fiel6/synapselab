import math
import pandas as pd
from chempy.chemistry import Substance
from motores_quimicos import MotorCalculoAvancado
from fpdf import FPDF

def export_pdf(conteudo, titulo):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Relatorio Tecnico de Estequiometria", ln=True, align='C')
    pdf.ln(10)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, txt=f"Reacao: {titulo}", ln=True)
    pdf.ln(5)
    pdf.set_font("Arial", size=11)
    txt_limpo = conteudo.replace('➞', '->').encode('latin-1', 'replace').decode('latin-1')
    pdf.multi_cell(0, 7, txt=txt_limpo)
    return pdf.output(dest='S').encode('latin-1')

def processar_calculo_analitico(calc_q, p):
    """
    p: dicionário contendo as variáveis (f, m, v, h, oh, etc)
    Mantendo a lógica exata de cada linha sua.
    """
    res_q = 0.0
    if calc_q == "Molaridade (m/MM*V)":
        mm = Substance.from_formula(p['f']).mass
        res_q = p['m'] / (mm * (p['v']/1000))
    elif calc_q == "Diluição (C1V1=C2V2)":
        if p['v2'] == 0 and all([p['v1'], p['c1_v'], p['c2_v']]): res_q = (p['c1_v'] * p['v1']) / p['c2_v']
        elif p['c2_v'] == 0 and all([p['v1'], p['c1_v'], p['v2']]): res_q = (p['c1_v'] * p['v1']) / p['v2']
    elif calc_q == "pH de Ácido Forte":
        if p['h'] > 0: res_q = -math.log10(p['h'])
    elif calc_q == "pH de Base Forte":
        if p['oh'] > 0: res_q = 14 + math.log10(p['oh'])
    elif calc_q == "pOH":
        if p['oh'] > 0: res_q = -math.log10(p['oh'])
    elif calc_q == "Normalidade":
        res_q = p['mol'] * p['eq']
    elif calc_q == "Fração Molar":
        if (p['ns']+p['nt'])>0: res_q = p['ns']/(p['ns']+p['nt'])
    elif calc_q == "PPM para Molaridade":
        res_q = (p['ppm']/1000)/Substance.from_formula(p['f']).mass
    elif calc_q == "Porcentagem em Massa (%m/m)":
        if p['mt']>0: res_q = (p['ms']/p['mt'])*100
    elif calc_q == "Conversão g/L para mol/L":
        res_q = p['gl']/Substance.from_formula(p['f']).mass
    elif calc_q == "Molalidade":
        if p['kg']>0: res_q = p['ns']/p['kg']
    elif calc_q == "Rendimento Percentual":
        if p['teo']>0: res_q = (p['exp'] / p['teo']) * 100
    elif calc_q == "Fator de Diluição":
        if p['vi']>0: res_q = p['vf']/p['vi']
    elif calc_q == "Volume Molar (CNTP)":
        res_q = p['n'] * 22.414
    elif calc_q == "Densidade da Solução":
        if p['v']>0: res_q = p['m']/p['v']
    return res_q

def processar_termodinamica(calc_t, t):
    res_t = 0.0
    if calc_t == "Gases Ideais (PV=nRT)":
        if t['v_l']>0: res_t = (t['n']*0.08206*t['t_k'])/t['v_l']
    elif calc_t == "Gases Reais (Van der Waals)":
        if (t['v']-t['n']*t['b'])!=0: res_t = ((t['n']*0.08206*t['te'])/(t['v']-t['n']*t['b']))-(t['a']*(t['n']/t['v'])**2)
    elif calc_t == "Energia Livre de Gibbs (ΔG)":
        res_t = t['h'] - (t['te']*t['s'])
    # ... MANTER TODAS AS OUTRAS EXATAMENTE IGUAIS ...
    return res_t
