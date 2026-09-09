/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SANDBOX_TEMPLATES } from '../data/sandboxTemplates';
import { DigitalRecord, RecordField, FieldType } from '../types';
import { VisualObjectRenderer } from './VisualObjectRenderer';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Code, 
  Table, 
  Sliders, 
  Play, 
  RotateCcw, 
  Check, 
  Copy, 
  Layers
} from 'lucide-react';

export const SandboxMode: React.FC = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [record, setRecord] = useState<DigitalRecord>(
    JSON.parse(JSON.stringify(SANDBOX_TEMPLATES[0]))
  );
  const [viewMode, setViewMode] = useState<'interactive' | 'table' | 'json'>('interactive');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // New field modal/form state
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('text');

  // Switch template
  const handleSelectTemplate = (idx: number) => {
    sound.playClick();
    setSelectedTemplateIndex(idx);
    setRecord(JSON.parse(JSON.stringify(SANDBOX_TEMPLATES[idx])));
    setIsTesting(false);
  };

  // Update field value
  const handleUpdateFieldValue = (fieldId: string, value: any) => {
    sound.playFieldChange();
    setRecord(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === fieldId ? { ...f, value } : f)
    }));
  };

  // Add new field
  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    sound.playClick();
    let parsedValue: any = newFieldValue;
    if (newFieldType === 'number') {
      parsedValue = Number(newFieldValue) || 0;
    } else if (newFieldType === 'boolean') {
      parsedValue = newFieldValue === 'true';
    } else if (newFieldType === 'color' && !newFieldValue) {
      parsedValue = '#6366F1';
    }

    const field: RecordField = {
      id: 'custom-' + Date.now(),
      name: newFieldName.trim().toLowerCase().replace(/\s+/g, '_'),
      value: parsedValue,
      type: newFieldType,
      description: 'Campo personalizado criado por você'
    };

    setRecord(prev => ({
      ...prev,
      fields: [...prev.fields, field]
    }));

    setNewFieldName('');
    setNewFieldValue('');
  };

  // Delete field
  const handleDeleteField = (fieldId: string) => {
    sound.playClick();
    setRecord(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  // Test simulation
  const handleRunSimulation = () => {
    sound.playVictoryFanfare();
    setIsTesting(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      setIsTesting(false);
    }, 4000);
  };

  // Copy JSON representation
  const handleCopyJSON = () => {
    sound.playClick();
    const cleanObject: Record<string, any> = {};
    record.fields.forEach(f => {
      cleanObject[f.name] = f.value;
    });
    navigator.clipboard.writeText(JSON.stringify(cleanObject, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset current template
  const handleReset = () => {
    sound.playClick();
    setRecord(JSON.parse(JSON.stringify(SANDBOX_TEMPLATES[selectedTemplateIndex])));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Template Selector Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-fredoka flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Oficina Livre: Crie e Manipule Registros
          </h2>
          <p className="text-xs text-slate-500">
            Escolha um modelo base e veja como cada campo e valor altera as propriedades do objeto em tempo real!
          </p>
        </div>

        {/* Templates Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SANDBOX_TEMPLATES.map((tpl, i) => (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTemplateIndex === i
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tpl.category === 'robo' && '🤖 Robô'}
              {tpl.category === 'pet' && '🐾 Mascote'}
              {tpl.category === 'veiculo' && '🏎️ Supercarro'}
              {tpl.category === 'objeto_real' && '🪪 Crachá'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Visual Object + Simulator Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-md flex flex-col items-center justify-between relative overflow-hidden">
            {/* Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">SIMULADOR VISUAL</span>
              <span className="text-[11px] bg-indigo-950/80 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-800">
                {record.fields.length} campos ativos
              </span>
            </div>

            {/* Object Graphic */}
            <VisualObjectRenderer record={record} isTesting={isTesting} />

            {/* Simulation trigger */}
            <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">
                {isTesting ? '⚡ Simulando ação no mundo digital...' : 'Objeto pronto para testes'}
              </span>

              <button
                id="btn-run-simulation"
                onClick={handleRunSimulation}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Testar Objeto</span>
              </button>
            </div>
          </div>

          {/* Quick Real-World Lesson Card */}
          <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-950 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-indigo-900">
              <Layers className="w-4 h-4 text-indigo-600" />
              Como a Computação enxerga este Objeto?
            </h4>
            <p className="text-indigo-900/80 leading-relaxed">
              Toda vez que você altera um campo (como a <span className="font-mono font-bold">cor</span> ou a <span className="font-mono font-bold">bateria</span>), o computador lê o novo valor e atualiza o objeto na tela. É assim que funcionam jogos como Minecraft e Roblox!
            </p>
          </div>
        </div>

        {/* Right: Record Editor (Visual Tabs, Field Modifier & Add New Field) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            {/* View Mode Switcher Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => { sound.playClick(); setViewMode('interactive'); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'interactive'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Ficha Interativa</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); setViewMode('table'); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabela de Campos</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); setViewMode('json'); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'json'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Código (JSON)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title="Restaurar padrão"
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restaurar</span>
                </button>
              </div>
            </div>

            {/* TAB 1: INTERACTIVE RECORD CONTROLS */}
            {viewMode === 'interactive' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {record.fields.map(field => (
                    <div
                      key={field.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-indigo-900 truncate">
                          {field.name}
                        </span>
                        <button
                          onClick={() => handleDeleteField(field.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Excluir este campo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {field.description && (
                        <p className="text-[11px] text-slate-500">{field.description}</p>
                      )}

                      {/* Control by type */}
                      <div className="pt-1">
                        {field.type === 'color' ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={String(field.value)}
                              onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                            />
                            <span className="font-mono text-xs text-slate-700 font-medium">
                              {String(field.value)}
                            </span>
                          </div>
                        ) : field.type === 'boolean' ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateFieldValue(field.id, !field.value)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                                field.value
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {field.value ? 'true (Ativado)' : 'false (Desativado)'}
                            </button>
                          </div>
                        ) : field.type === 'select' && field.options ? (
                          <select
                            value={String(field.value)}
                            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-indigo-500"
                          >
                            {field.options.map((opt, idx) => (
                              <option key={idx} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === 'number' ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={Number(field.value)}
                              onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
                              className="flex-1 accent-indigo-600"
                            />
                            <span className="font-mono text-xs font-bold text-slate-800 w-10 text-right">
                              {Number(field.value)}
                            </span>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={String(field.value)}
                            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: TABLE VIEW */}
            {viewMode === 'table' && (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2.5">Nome do Campo (Identificador)</th>
                      <th className="px-4 py-2.5">Tipo de Dado</th>
                      <th className="px-4 py-2.5">Valor Atual</th>
                      <th className="px-4 py-2.5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {record.fields.map(field => (
                      <tr key={field.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono font-semibold text-indigo-900">
                          {field.name}
                        </td>
                        <td className="px-4 py-2.5 text-slate-500 font-mono text-[11px]">
                          {field.type}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-800">
                          {String(field.value)}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            onClick={() => handleDeleteField(field.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: CODE JSON VIEW */}
            {viewMode === 'json' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Estrutura de dados em JavaScript / Python:</span>
                  <button
                    onClick={handleCopyJSON}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Registro'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                  {JSON.stringify(
                    record.fields.reduce((acc, curr) => {
                      acc[curr.name] = curr.value;
                      return acc;
                    }, {} as Record<string, any>),
                    null,
                    2
                  )}
                </pre>
              </div>
            )}

            {/* ADD NEW CUSTOM FIELD DRAWER */}
            <form onSubmit={handleAddField} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-indigo-600" />
                Adicionar Novo Campo ao Registro:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    required
                    placeholder="Nome do Campo (ex: velocidade)"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    <option value="text">Texto (string)</option>
                    <option value="number">Número (number)</option>
                    <option value="boolean">Verdadeiro/Falso (boolean)</option>
                    <option value="color">Cor (hex)</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  {newFieldType === 'boolean' ? (
                    <select
                      value={newFieldValue || 'true'}
                      onChange={(e) => setNewFieldValue(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                    >
                      <option value="true">true (Verdadeiro)</option>
                      <option value="false">false (Falso)</option>
                    </select>
                  ) : newFieldType === 'color' ? (
                    <input
                      type="color"
                      value={newFieldValue || '#6366F1'}
                      onChange={(e) => setNewFieldValue(e.target.value)}
                      className="w-full h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                  ) : (
                    <input
                      type={newFieldType === 'number' ? 'number' : 'text'}
                      placeholder="Valor inicial"
                      value={newFieldValue}
                      onChange={(e) => setNewFieldValue(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
