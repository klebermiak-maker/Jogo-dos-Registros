/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MISSIONS_DATA } from '../data/missionsData';
import { DigitalRecord, RecordField, UserProgress } from '../types';
import { VisualObjectRenderer } from './VisualObjectRenderer';
import { sound } from '../utils/audio';
import { 
  Star, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  FileText, 
  Plus, 
  Lightbulb, 
  Wrench,
  Check
} from 'lucide-react';

interface MissionsModeProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
}

export const MissionsMode: React.FC<MissionsModeProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<number>(1);
  const mission = MISSIONS_DATA.find(m => m.id === selectedMissionId) || MISSIONS_DATA[0];

  // Local state for the editable record of the mission
  const [activeRecord, setActiveRecord] = useState<DigitalRecord>(JSON.parse(JSON.stringify(mission.targetRecord)));
  
  // State for multiple choice or selection tasks
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>([]);
  const [taskFeedback, setTaskFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // New field inputs for match_object or fix_record tasks
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  // Reset when mission changes
  useEffect(() => {
    setActiveRecord(JSON.parse(JSON.stringify(mission.targetRecord)));
    setSelectedChoice(null);
    setSelectedRecordIds([]);
    setTaskFeedback({ status: 'idle', message: '' });
    setShowHint(false);
    setIsCompleted(progress.completedMissions.includes(mission.id));
    setNewFieldName('');
    setNewFieldValue('');
  }, [selectedMissionId, mission]);

  // Handle modifying a field value in the record
  const handleUpdateFieldValue = (fieldId: string, newValue: any) => {
    sound.playFieldChange();
    setActiveRecord(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === fieldId ? { ...f, value: newValue } : f)
    }));
  };

  // Add custom field in modeling missions
  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    sound.playClick();
    const newField: RecordField = {
      id: 'custom-' + Date.now(),
      name: newFieldName.trim().toLowerCase().replace(/\s+/g, '_'),
      value: newFieldValue === 'true' ? true : newFieldValue === 'false' ? false : !isNaN(Number(newFieldValue)) && newFieldValue !== '' ? Number(newFieldValue) : newFieldValue,
      type: newFieldValue === 'true' || newFieldValue === 'false' ? 'boolean' : !isNaN(Number(newFieldValue)) && newFieldValue !== '' ? 'number' : 'text'
    };
    setActiveRecord(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
    setNewFieldName('');
    setNewFieldValue('');
  };

  const handleRemoveField = (fieldId: string) => {
    sound.playClick();
    setActiveRecord(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  // Trigger win celebration
  const triggerCelebration = () => {
    sound.playVictoryFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const starsEarned = 3;
    const updatedCompleted = Array.from(new Set([...progress.completedMissions, mission.id]));
    const updatedStars = {
      ...progress.starsByMission,
      [mission.id]: Math.max(progress.starsByMission[mission.id] || 0, starsEarned)
    };

    onUpdateProgress({
      completedMissions: updatedCompleted,
      starsByMission: updatedStars
    });
    setIsCompleted(true);
  };

  // Verify task answer
  const handleVerify = () => {
    sound.playClick();

    if (mission.taskType === 'identify_field') {
      if (!selectedChoice) {
        setTaskFeedback({ status: 'error', message: 'Por favor, selecione uma das opções acima!' });
        sound.playError();
        return;
      }
      if (selectedChoice.isCorrect) {
        setTaskFeedback({ status: 'success', message: mission.successFeedback });
        triggerCelebration();
      } else {
        setTaskFeedback({ status: 'error', message: selectedChoice.feedback });
        sound.playError();
      }
    }

    else if (mission.taskType === 'modify_value') {
      // Check mission 3 conditions: lanterna_ligada == true, tipo_tracao == 'Esteira para Gelo', nivel_energia == 100
      const lanterna = activeRecord.fields.find(f => f.name === 'lanterna_ligada')?.value;
      const tracao = activeRecord.fields.find(f => f.name === 'tipo_tracao')?.value;
      const energia = activeRecord.fields.find(f => f.name === 'nivel_energia')?.value;

      if (lanterna === true && tracao === 'Esteira para Gelo' && Number(energia) >= 80) {
        setTaskFeedback({ status: 'success', message: mission.successFeedback });
        triggerCelebration();
      } else {
        sound.playError();
        let errorMsg = 'Ainda precisamos ajustar alguns campos do registro: ';
        if (lanterna !== true) errorMsg += 'Ligue a lanterna (true)! ';
        if (tracao !== 'Esteira para Gelo') errorMsg += 'Selecione a "Esteira para Gelo"! ';
        if (Number(energia) < 80) errorMsg += 'Recarregue a energia para pelo menos 80%! ';
        setTaskFeedback({ status: 'error', message: errorMsg });
      }
    }

    else if (mission.taskType === 'filter_selection') {
      const correctIds = mission.filterOptions?.correctRecordIds || [];
      const isCorrect = correctIds.length === selectedRecordIds.length &&
        correctIds.every(id => selectedRecordIds.includes(id));

      if (isCorrect) {
        setTaskFeedback({ status: 'success', message: mission.successFeedback });
        triggerCelebration();
      } else {
        sound.playError();
        setTaskFeedback({
          status: 'error',
          message: 'Quase lá! Verifique as fichas selecionadas. Devem ter especialidade == "Piloto" e disponivel == true.'
        });
      }
    }

    else if (mission.taskType === 'match_object') {
      // Must have at least 3 required fields populated with valid names
      const fieldNames = activeRecord.fields.map(f => f.name.toLowerCase());
      const hasCor = fieldNames.some(n => n.includes('cor') || n.includes('quadro'));
      const hasPotencia = fieldNames.some(n => n.includes('potencia') || n.includes('watt') || n.includes('motor'));
      const hasBateria = fieldNames.some(n => n.includes('bateria') || n.includes('carga') || n.includes('energia'));
      const hasDestravada = fieldNames.some(n => n.includes('destravada') || n.includes('livre') || n.includes('tranca'));

      if (activeRecord.fields.length >= 3 && (hasCor || hasPotencia || hasBateria || hasDestravada)) {
        setTaskFeedback({ status: 'success', message: mission.successFeedback });
        triggerCelebration();
      } else {
        sound.playError();
        setTaskFeedback({
          status: 'error',
          message: 'Adicione pelo menos 3 campos que representem as propriedades da bike (ex: cor_quadro, potencia_watts, bateria_porcentagem, destravada).'
        });
      }
    }

    else if (mission.taskType === 'fix_record') {
      // Altitude must be 400, painel true, frequencia 1420, and has escudo_defletor field
      const altitude = Number(activeRecord.fields.find(f => f.name === 'altitude_km')?.value);
      const painel = Boolean(activeRecord.fields.find(f => f.name === 'painel_solar_aberto')?.value);
      const freq = Number(activeRecord.fields.find(f => f.name === 'frequencia_mhz')?.value);
      const hasEscudo = activeRecord.fields.some(f => f.name.toLowerCase().includes('escudo') && f.value === true);

      if (altitude === 400 && painel === true && freq === 1420 && hasEscudo) {
        setTaskFeedback({ status: 'success', message: mission.successFeedback });
        triggerCelebration();
      } else {
        sound.playError();
        let err = 'Faltam alguns ajustes no registro: ';
        if (altitude !== 400) err += 'Mude altitude_km para 400. ';
        if (painel !== true) err += 'Mude painel_solar_aberto para true. ';
        if (freq !== 1420) err += 'Mude frequencia_mhz para 1420. ';
        if (!hasEscudo) err += 'Adicione o campo "escudo_defletor" com valor true! ';
        setTaskFeedback({ status: 'error', message: err });
      }
    }
  };

  const handleNextMission = () => {
    sound.playClick();
    if (selectedMissionId < MISSIONS_DATA.length) {
      setSelectedMissionId(selectedMissionId + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Missions Level Selector Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 text-sm">Trilha de Aprendizado (EF04CO02)</span>
          </div>
          <span className="text-xs text-slate-500">
            Fase {selectedMissionId} de {MISSIONS_DATA.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MISSIONS_DATA.map((m) => {
            const isCurrent = m.id === selectedMissionId;
            const isDone = progress.completedMissions.includes(m.id);
            const stars = progress.starsByMission[m.id] || 0;

            return (
              <button
                key={m.id}
                id={`btn-level-${m.id}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedMissionId(m.id);
                }}
                className={`relative flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-indigo-700' : 'text-slate-700'}`}>
                    Fase {m.id}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3 h-3 ${
                          starIdx <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-600 truncate w-full">
                  {m.title.split(':')[1] || m.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quest Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Context, Visual Object & Instructions */}
        <div className="lg:col-span-5 space-y-4">
          {/* Mission Story Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-indigo-600 tracking-wider">
                  {mission.subtitle}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-fredoka mt-0.5">
                  {mission.title}
                </h2>
              </div>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                  <Check className="w-3.5 h-3.5" /> Concluída
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {mission.story}
            </p>

            {/* Pedagogical Concept Box */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Conceito Computacional (EF04CO02)</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {mission.concept}
              </p>
              <div className="pt-1 text-[11px] text-amber-800 font-medium">
                💡 <span className="underline">Mundo Real:</span> {mission.realWorldAnalogy}
              </div>
            </div>
          </div>

          {/* Visual Canvas / Real Object Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 text-white shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">OBJETO EM TEMPO REAL</span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-mono">
                {mission.targetRecord.category.toUpperCase()}
              </span>
            </div>

            {mission.taskType === 'match_object' && mission.objectToModel ? (
              <div className="p-4 space-y-3">
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">🚲 ⚡</div>
                  <h4 className="font-bold text-white text-base">
                    {mission.objectToModel.realObjectName}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {mission.objectToModel.description}
                  </p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-emerald-400">🔍 Pistas do Objeto Físico:</span>
                  {mission.objectToModel.visualClues.map((clue, i) => (
                    <div key={i} className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      <span>{clue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <VisualObjectRenderer record={activeRecord} isTesting={isCompleted} />
            )}
          </div>
        </div>

        {/* Right Column: Record Data Inspector & Challenge Workspace */}
        <div className="lg:col-span-7 space-y-4">
          {/* Record Data Inspector */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {activeRecord.recordTitle}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Estrutura organizada por pares: [Nome do Campo] ➔ [Valor]
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2.5 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Ocultar Dica' : 'Pedir Dica'}</span>
              </button>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{mission.hint}</span>
              </div>
            )}

            {/* Task Banner */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 flex items-start gap-3">
              <Wrench className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Desafio da Missão:
                </h4>
                <p className="text-sm font-medium text-indigo-950 mt-0.5">
                  {mission.taskInstruction}
                </p>
              </div>
            </div>

            {/* MODE SPECIFIC INTERACTIONS */}

            {/* 1. Identify Field (Multiple Choice) */}
            {mission.taskType === 'identify_field' && mission.choices && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Selecione a resposta correta:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mission.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClick();
                        setSelectedChoice(choice);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        selectedChoice === choice
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-400/20'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] bg-white">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{String(choice.label)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Modify Value (Direct Interactive Fields) */}
            {mission.taskType === 'modify_value' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Manipule os valores diretamente no registro abaixo:
                </span>
              </div>
            )}

            {/* 3. Filter Selection (Choose matching records) */}
            {mission.taskType === 'filter_selection' && mission.filterOptions && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mission.filterOptions.records.map((rec) => {
                    const isSelected = selectedRecordIds.includes(rec.id);
                    return (
                      <div
                        key={rec.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedRecordIds(prev =>
                            prev.includes(rec.id)
                              ? prev.filter(id => id !== rec.id)
                              : [...prev, rec.id]
                          );
                        }}
                        className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-900">{rec.recordTitle}</span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-1 font-mono text-[11px]">
                          {rec.fields.map(f => (
                            <div key={f.id} className="flex justify-between border-b border-slate-100 pb-0.5">
                              <span className="text-slate-500">{f.name}:</span>
                              <span className="font-semibold text-slate-800">{String(f.value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Match Object & Fix Record (Add Custom Fields) */}
            {(mission.taskType === 'match_object' || mission.taskType === 'fix_record') && (
              <div className="space-y-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-indigo-600" />
                    Adicionar Novo Campo ao Registro:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        placeholder="Nome do Campo (ex: cor_quadro)"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-indigo-600"
                      />
                    </div>
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        placeholder="Valor (ex: Verde Limão)"
                        value={newFieldValue}
                        onChange={(e) => setNewFieldValue(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-indigo-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        onClick={handleAddField}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar
                      </button>
                    </div>
                  </div>

                  {mission.taskType === 'match_object' && mission.objectToModel && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Sugestões rápidas:</span>
                      {mission.objectToModel.suggestedFields.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setNewFieldName(sug.name);
                            setNewFieldValue(String(sug.value));
                          }}
                          className="text-[10px] bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-mono transition-colors"
                        >
                          +{sug.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* THE RECORD TABLE (Visual inspection of Fields and Values) */}
            {mission.taskType !== 'filter_selection' && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 grid grid-cols-12 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <div className="col-span-5 flex items-center gap-1">
                    <span>NOME DO CAMPO</span>
                    <span className="text-[10px] text-indigo-600 lowercase font-normal">(identificador)</span>
                  </div>
                  <div className="col-span-6 flex items-center gap-1">
                    <span>VALOR ARMAZENADO</span>
                    <span className="text-[10px] text-emerald-600 lowercase font-normal">(dado)</span>
                  </div>
                  <div className="col-span-1 text-right">AÇÃO</div>
                </div>

                <div className="divide-y divide-slate-100 bg-white">
                  {activeRecord.fields.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Nenhum campo cadastrado ainda. Adicione campos acima para modelar o objeto!
                    </div>
                  ) : (
                    activeRecord.fields.map((field) => {
                      const isHighlighted = mission.targetFieldName === field.name;

                      return (
                        <div
                          key={field.id}
                          className={`px-4 py-2.5 grid grid-cols-12 items-center gap-2 text-xs transition-colors ${
                            isHighlighted ? 'bg-amber-50/80 ring-1 ring-amber-300' : 'hover:bg-slate-50/60'
                          }`}
                        >
                          {/* Nome do Campo */}
                          <div className="col-span-5 font-mono font-semibold text-indigo-900 flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                            <span className="truncate">{field.name}</span>
                          </div>

                          {/* Valor do Campo (com manipulador interativo se for modify_value) */}
                          <div className="col-span-6">
                            {mission.taskType === 'modify_value' || mission.taskType === 'fix_record' ? (
                              field.type === 'boolean' ? (
                                <button
                                  onClick={() => handleUpdateFieldValue(field.id, !field.value)}
                                  className={`px-3 py-1 rounded-md text-xs font-bold font-mono transition-all ${
                                    field.value
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                                  }`}
                                >
                                  {field.value ? 'true (LIGADO)' : 'false (DESLIGADO)'}
                                </button>
                              ) : field.type === 'select' && field.options ? (
                                <select
                                  value={String(field.value)}
                                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-indigo-500"
                                >
                                  {field.options.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : field.type === 'number' ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={Number(field.value)}
                                    onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
                                    className="w-24 text-xs px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                                  />
                                  {field.description && (
                                    <span className="text-[10px] text-slate-400 truncate hidden sm:inline">
                                      {field.description}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={String(field.value)}
                                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                                  className="w-full text-xs px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium"
                                />
                              )
                            ) : (
                              <span className="font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800 font-semibold">
                                {String(field.value)}
                              </span>
                            )}
                          </div>

                          {/* Ação / Exclusão */}
                          <div className="col-span-1 text-right">
                            {!field.locked && (
                              <button
                                onClick={() => handleRemoveField(field.id)}
                                title="Remover Campo"
                                className="text-slate-400 hover:text-rose-500 font-bold text-xs p-1"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Feedback Message */}
            {taskFeedback.status !== 'idle' && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 animate-fadeIn ${
                  taskFeedback.status === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {taskFeedback.status === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 font-medium leading-relaxed">
                  {taskFeedback.message}
                </div>
              </div>
            )}

            {/* Action Buttons: Verify / Reset / Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveRecord(JSON.parse(JSON.stringify(mission.targetRecord)));
                  setSelectedChoice(null);
                  setSelectedRecordIds([]);
                  setTaskFeedback({ status: 'idle', message: '' });
                }}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Registro</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  id="btn-verify-mission"
                  onClick={handleVerify}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-300 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Verificar Registro</span>
                </button>

                {isCompleted && selectedMissionId < MISSIONS_DATA.length && (
                  <button
                    onClick={handleNextMission}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Próxima Fase</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
