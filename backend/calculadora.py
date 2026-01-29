import math
import pandas as pd
from chempy.chemistry import Substance
from motores_quimicos import MotorCalculoAvancado
from fpdf import FPDF

# Sua função de PDF original, linha por linha
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
    # Sanitização original
    txt_limpo = conteudo.replace('➞', '->').encode('latin-1', 'replace').decode('latin-1')
    pdf.multi_cell(0, 7, txt=txt_limpo)
    return pdf.output(dest='S').encode('latin-1')

# Lógica de Química Analítica (Respeito total aos seus IFs)
def calcular_analitica_fiel(calc_q, p):
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

# Conversor SI (Seu dicionário original)
def converter_si_fiel(calc_c, v_in):
    conv = {
        "Kg para g": v_in*1000, "g para Kg": v_in/1000, "mg para g": v_in/1000,
        "g para mg": v_in*1000, "L para mL": v_in*1000, "mL para L": v_in/1000,
        "m³ para L": v_in*1000, "Celsius para Kelvin": v_in+273.15,
        "Kelvin para Celsius": v_in-273.15, "Fahrenheit para Celsius": (v_in-32)*5/9,
        "atm para mmHg": v_in*760, "mmHg para atm": v_in/760, "bar para atm": v_in*0.9869,
        "psi para bar": v_in*0.0689, "Joules para Calorias": v_in/4.184
    }
    return conv[calc_c]

# Termodinâmica (Cada linha da sua lógica de t1 a t38)
def calcular_termo_fiel(calc_t, t):
    res_t = 0.0
    if calc_t == "Gases Ideais (PV=nRT)":
        if t['v_l']>0: res_t = (t['n']*0.08206*t['t_k'])/t['v_l']
    elif calc_t == "Gases Reais (Van der Waals)":
        if (t['v']-t['n']*t['b'])!=0: res_t = ((t['n']*0.08206*t['te'])/(t['v']-t['n']*t['b']))-(t['a']*(t['n']/t['v'])**2)
    elif calc_t == "Energia Livre de Gibbs (ΔG)":
        res_t = t['h'] - (t['te']*t['s'])
    elif calc_t == "Equação de Arrhenius (k)":
        res_t = t['a_f'] * math.exp(-t['ea']/(8.314*t['te']))
    elif calc_t == "Tempo de Meia-Vida (1ª Ordem)":
        if t['k']>0: res_t = 0.693/t['k']
    elif calc_t == "Entalpia (Q = m.c.ΔT)":
        res_t = t['m']*t['c']*t['dt']
    elif calc_t == "Equação de Henderson-Hasselbalch":
        if t['ac']>0: res_t = t['pk'] + math.log10(t['ba']/t['ac'])
    elif calc_t == "Pressão Osmótica (π=iMRT)":
        res_t = t['i']*t['m']*0.08206*t['te']
    elif calc_t == "Ebulioscopia (ΔTe)":
        res_t = t['ke'] * t['mo']
    elif calc_t == "Crioscopia (ΔTc)":
        res_t = t['kc'] * t['mo']
    elif calc_t == "Constante de Equilíbrio (Kc)":
        if t['r']>0: res_t = t['p']/t['r']
    elif calc_t == "Velocidade de Graham":
        res_t = math.sqrt(t['m2']/t['m1'])
    elif calc_t == "Trabalho de Expansão (W)":
        res_t = t['p'] * t['dv']
    elif calc_t == "Eficiência de Carnot":
        if t['tq']>0: res_t = 1 - (t['tf']/t['tq'])
    elif calc_t == "Calor Latente (Q=mL)":
        res_t = t['m']*t['l']
    return res_t
