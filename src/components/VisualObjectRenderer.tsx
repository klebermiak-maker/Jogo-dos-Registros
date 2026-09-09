/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DigitalRecord } from '../types';

interface VisualObjectRendererProps {
  record: DigitalRecord;
  isTesting?: boolean;
}

export const VisualObjectRenderer: React.FC<VisualObjectRendererProps> = ({ record, isTesting = false }) => {
  // Helper to safely get field value
  const getVal = (name: string, fallback: any = '') => {
    const f = record.fields.find(field => field.name.toLowerCase() === name.toLowerCase());
    return f !== undefined ? f.value : fallback;
  };

  const category = record.category;

  if (category === 'robo') {
    const rawColor = String(getVal('cor_chassi', '#3B82F6'));
    const color = rawColor.startsWith('#') ? rawColor : '#3B82F6';
    const energia = Number(getVal('nivel_energia', getVal('nivel_bateria', 75)));
    const hasAntena = Boolean(getVal('antena_comunicacao', getVal('antena', true)));
    const lanterna = Boolean(getVal('lanterna_ligada', false));
    const turbo = Boolean(getVal('modo_turbo', isTesting));
    const ferramenta = String(getVal('ferramenta_braco', 'Canhão de Plasma'));
    const tipoOlhos = String(getVal('tipo_olhos', 'Laser Digital'));
    const nome = String(getVal('nome', getVal('nome_modelo', 'Robo-X')));
    const tracao = String(getVal('tipo_tracao', 'Rodas Comuns'));

    return (
      <div className="relative flex flex-col items-center justify-center p-4 min-h-[260px]">
        {/* Glow backdrop */}
        <div 
          className="absolute inset-4 rounded-3xl opacity-20 blur-xl transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Status Badge */}
        <div className="z-10 mb-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-200">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
          <span className="font-medium">{nome}</span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-emerald-400">{energia}% Bateria</span>
        </div>

        {/* SVG Robot Graphic */}
        <motion.div 
          animate={turbo ? { y: [-3, 3, -3], x: [-1, 1, -1] } : { y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: turbo ? 0.25 : 2, ease: "easeInOut" }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Lanterna beam if turned on */}
            {lanterna && (
              <polygon 
                points="100,75 195,30 195,120" 
                fill="url(#lightBeam)" 
                opacity="0.65"
                className="animate-pulse"
              />
            )}

            <defs>
              <linearGradient id="lightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Antena */}
            {hasAntena && (
              <g>
                <line x1="100" y1="45" x2="100" y2="20" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="18" r="7" fill={color} stroke="#1E293B" strokeWidth="2" />
                {/* Radio pulses */}
                <circle cx="100" cy="18" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" className="animate-ping" />
              </g>
            )}

            {/* Braço Esquerdo */}
            <rect x="35" y="80" width="16" height="40" rx="6" fill="#475569" />
            
            {/* Braço Direito com Ferramenta */}
            <rect x="149" y="80" width="16" height="40" rx="6" fill="#475569" />
            {ferramenta.includes('Laser') || ferramenta.includes('Canhão') ? (
              <g>
                <rect x="156" y="105" width="28" height="14" rx="4" fill="#E11D48" />
                <circle cx="182" cy="112" r="5" fill="#FDA4AF" className="animate-pulse" />
              </g>
            ) : ferramenta.includes('Pinça') ? (
              <path d="M156,110 L175,100 M156,114 L175,124" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <circle cx="165" cy="112" r="8" fill="#F59E0B" />
            )}

            {/* Corpo Principal (Chassi) */}
            <rect x="56" y="70" width="88" height="74" rx="14" fill={color} stroke="#0F172A" strokeWidth="4" />

            {/* Painel do Peito com nível de energia */}
            <rect x="74" y="88" width="52" height="38" rx="8" fill="#0F172A" />
            {/* Barras de Energia */}
            <rect 
              x="78" 
              y="94" 
              width={Math.max(4, Math.min(44, (energia / 100) * 44))} 
              height="10" 
              rx="3" 
              fill={energia > 50 ? '#10B981' : energia > 20 ? '#F59E0B' : '#EF4444'} 
            />
            {/* Luzes do peito */}
            <circle cx="82" cy="115" r="4" fill={turbo ? '#EF4444' : '#38BDF8'} className="animate-pulse" />
            <circle cx="95" cy="115" r="4" fill="#A855F7" />
            <circle cx="108" cy="115" r="4" fill="#FACC15" />

            {/* Cabeça */}
            <rect x="70" y="38" width="60" height="34" rx="10" fill={color} stroke="#0F172A" strokeWidth="4" />

            {/* Olhos/Visor */}
            {tipoOlhos.includes('Laser') ? (
              <rect x="78" y="48" width="44" height="12" rx="6" fill="#0F172A">
                <animate attributeName="opacity" values="1;0.8;1" dur="1s" repeatCount="indefinite" />
              </rect>
            ) : (
              <g>
                <circle cx="87" cy="54" r="6" fill="#0284C7" />
                <circle cx="113" cy="54" r="6" fill="#0284C7" />
                <circle cx="89" cy="52" r="2" fill="#FFFFFF" />
                <circle cx="115" cy="52" r="2" fill="#FFFFFF" />
              </g>
            )}

            {/* Tracao / Rodas / Pés */}
            {tracao.includes('Esteira') ? (
              <g>
                <rect x="48" y="146" width="104" height="24" rx="12" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                <circle cx="62" cy="158" r="7" fill="#64748B" />
                <circle cx="84" cy="158" r="7" fill="#64748B" />
                <circle cx="106" cy="158" r="7" fill="#64748B" />
                <circle cx="128" cy="158" r="7" fill="#64748B" />
              </g>
            ) : (
              <g>
                <rect x="68" y="144" width="18" height="24" rx="6" fill="#334155" />
                <rect x="114" y="144" width="18" height="24" rx="6" fill="#334155" />
                <ellipse cx="77" cy="170" rx="16" ry="8" fill="#0F172A" />
                <ellipse cx="123" cy="170" rx="16" ry="8" fill="#0F172A" />
              </g>
            )}

            {/* Turbo Fogo */}
            {turbo && (
              <g className="animate-pulse">
                <polygon points="100,146 88,180 112,180" fill="#F97316" />
                <polygon points="100,150 93,172 107,172" fill="#FBBF24" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>
    );
  }

  if (category === 'pet') {
    const rawColor = String(getVal('cor_pele', getVal('cor_principal', '#10B981')));
    const color = rawColor.startsWith('#') ? rawColor : '#10B981';
    const felicidade = Number(getVal('felicidade', 85));
    const temAsas = Boolean(getVal('tem_asas', true));
    const antenasCount = Number(getVal('antenas', 2));
    const acessorio = String(getVal('acessorio', 'Gravatinha Borboleta'));
    const nome = String(getVal('nome', 'Pipoca'));

    return (
      <div className="relative flex flex-col items-center justify-center p-4 min-h-[260px]">
        <div 
          className="absolute inset-4 rounded-3xl opacity-20 blur-xl transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <div className="z-10 mb-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-200">
          <span className="font-semibold text-amber-300">★ {nome}</span>
          <span>|</span>
          <span className="text-pink-400">Alegria: {felicidade}%</span>
        </div>

        <motion.div
          animate={{ y: [-4, 4, -4], scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Asas */}
            {temAsas && (
              <g className="animate-pulse">
                <ellipse cx="45" cy="95" rx="30" ry="14" fill="#A7F3D0" opacity="0.8" transform="rotate(-25 45 95)" />
                <ellipse cx="155" cy="95" rx="30" ry="14" fill="#A7F3D0" opacity="0.8" transform="rotate(25 155 95)" />
              </g>
            )}

            {/* Antenas */}
            {antenasCount >= 1 && (
              <g>
                <line x1="85" y1="50" x2="68" y2="25" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <circle cx="66" cy="23" r="8" fill="#F43F5E" />
              </g>
            )}
            {antenasCount >= 2 && (
              <g>
                <line x1="115" y1="50" x2="132" y2="25" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <circle cx="134" cy="23" r="8" fill="#F43F5E" />
              </g>
            )}

            {/* Corpo Fofinho (Blob) */}
            <ellipse cx="100" cy="115" rx="65" ry="58" fill={color} stroke="#0F172A" strokeWidth="4" />

            {/* Olhos Grandes Expressivos */}
            <ellipse cx="80" cy="102" rx="10" ry="14" fill="#0F172A" />
            <circle cx="77" cy="98" r="4" fill="#FFFFFF" />
            <ellipse cx="120" cy="102" rx="10" ry="14" fill="#0F172A" />
            <circle cx="117" cy="98" r="4" fill="#FFFFFF" />

            {/* Bochechas Rosadas */}
            <circle cx="68" cy="118" r="7" fill="#FDA4AF" opacity="0.8" />
            <circle cx="132" cy="118" r="7" fill="#FDA4AF" opacity="0.8" />

            {/* Boca Sorridente ou Neutra */}
            {felicidade > 50 ? (
              <path d="M90,122 Q100,136 110,122" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />
            ) : (
              <line x1="92" y1="124" x2="108" y2="124" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            )}

            {/* Acessório */}
            {acessorio.includes('Gravatinha') && (
              <polygon points="90,146 110,146 100,154" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
            )}
            {acessorio.includes('Coroa') && (
              <polygon points="85,50 92,38 100,48 108,38 115,50" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
            )}
            {acessorio.includes('Óculos') && (
              <g>
                <rect x="70" y="94" width="22" height="16" rx="4" fill="#1E293B" />
                <rect x="108" y="94" width="22" height="16" rx="4" fill="#1E293B" />
                <line x1="92" y1="102" x2="108" y2="102" stroke="#1E293B" strokeWidth="4" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>
    );
  }

  if (category === 'veiculo') {
    const rawColor = String(getVal('cor_carroceria', getVal('cor_quadro', '#EF4444')));
    const color = rawColor.startsWith('#') ? rawColor : '#EF4444';
    const turbo = Boolean(getVal('turbo_ativado', isTesting));
    const velMax = Number(getVal('velocidade_maxima', 280));
    const aerofolio = Boolean(getVal('aerofolio_esportivo', true));
    const modelo = String(getVal('modelo', 'Veículo Digital'));

    return (
      <div className="relative flex flex-col items-center justify-center p-4 min-h-[260px]">
        <div 
          className="absolute inset-4 rounded-3xl opacity-20 blur-xl transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <div className="z-10 mb-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-200">
          <span className="font-semibold text-red-400">⚡ {modelo}</span>
          <span>|</span>
          <span className="text-amber-300">{velMax} km/h</span>
          {turbo && <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase">TURBO ON</span>}
        </div>

        <motion.div
          animate={turbo ? { x: [-3, 3, -3], y: [-1, 1, -1] } : { y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: turbo ? 0.15 : 1.5 }}
          className="relative w-56 h-36 flex items-center justify-center"
        >
          <svg viewBox="0 0 220 120" className="w-full h-full drop-shadow-md">
            {/* Turbo Flames */}
            {turbo && (
              <g className="animate-pulse">
                <polygon points="22,70 2,65 22,60" fill="#EF4444" />
                <polygon points="22,68 8,65 22,62" fill="#FBBF24" />
              </g>
            )}

            {/* Aerofólio Traseiro */}
            {aerofolio && (
              <g>
                <line x1="30" y1="46" x2="36" y2="60" stroke="#0F172A" strokeWidth="4" />
                <rect x="20" y="42" width="26" height="6" rx="3" fill="#0F172A" />
              </g>
            )}

            {/* Carroceria Aerodinâmica */}
            <path 
              d="M30,68 L55,42 L145,42 L185,68 L200,75 L200,85 L30,85 Z" 
              fill={color} 
              stroke="#0F172A" 
              strokeWidth="4" 
            />

            {/* Janela / Cabine */}
            <path d="M68,46 L135,46 L158,68 L62,68 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" opacity="0.9" />

            {/* Farol Dianteiro */}
            <polygon points="190,70 198,73 194,79 186,76" fill="#FEF08A" />

            {/* Rodas Esportivas com calotas */}
            <circle cx="68" cy="85" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
            <circle cx="68" cy="85" r="8" fill="#94A3B8" />

            <circle cx="165" cy="85" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
            <circle cx="165" cy="85" r="8" fill="#94A3B8" />

            {/* Faixa Esportiva lateral */}
            <line x1="72" y1="74" x2="160" y2="74" stroke="#FFFFFF" strokeWidth="3" opacity="0.75" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // Default: Crachá ou Objeto do Mundo Real
  const nomeAgente = String(getVal('nome_agente', getVal('nome', getVal('titulo', 'Registro Digital'))));
  const codigo = String(getVal('codigo_matricula', getVal('codigo_id', 'ID-2026')));
  const nivelAcesso = Number(getVal('nivel_acesso', 3));
  const dept = String(getVal('departamento', getVal('autor', 'Setor Central')));
  const autorizado = Boolean(getVal('acesso_autorizado', getVal('disponivel', true)));

  return (
    <div className="relative flex flex-col items-center justify-center p-4 min-h-[260px]">
      <div className="w-56 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border-2 border-indigo-500/50 flex flex-col gap-3 relative overflow-hidden">
        {/* Holographic header bar */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-2">
          <span className="text-[10px] tracking-widest uppercase font-mono text-indigo-400">REGISTRO DIGITAL</span>
          <span className="text-[10px] font-mono bg-indigo-950 px-2 py-0.5 rounded text-indigo-300">{codigo}</span>
        </div>

        {/* Foto / Ícone */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-xl font-bold border border-indigo-300">
            {nomeAgente.charAt(0) || 'R'}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-semibold text-sm truncate text-white">{nomeAgente}</h4>
            <p className="text-xs text-slate-400 truncate">{dept}</p>
          </div>
        </div>

        {/* Informações dos Campos */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg text-xs space-y-1 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Nível:</span>
            <span className="text-amber-400">{'★'.repeat(Math.max(1, Math.min(5, nivelAcesso)))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className={autorizado ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {autorizado ? '● AUTORIZADO' : '✕ BLOQUEADO'}
            </span>
          </div>
        </div>

        {/* Barcode visual */}
        <div className="flex items-center justify-center gap-1 opacity-60 h-4">
          <span className="w-1 h-full bg-slate-400"></span>
          <span className="w-2 h-full bg-slate-400"></span>
          <span className="w-0.5 h-full bg-slate-400"></span>
          <span className="w-1.5 h-full bg-slate-400"></span>
          <span className="w-1 h-full bg-slate-400"></span>
          <span className="w-3 h-full bg-slate-400"></span>
          <span className="w-0.5 h-full bg-slate-400"></span>
        </div>
      </div>
    </div>
  );
};
