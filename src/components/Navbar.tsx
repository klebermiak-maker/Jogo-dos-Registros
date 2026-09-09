/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameMode, UserProgress } from '../types';
import { sound } from '../utils/audio';
import { Rocket, Sparkles, Zap, BookOpen, Volume2, VolumeX, Star, Database } from 'lucide-react';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  progress: UserProgress;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  progress,
  onToggleSound
}) => {
  const totalStars = (Object.values(progress.starsByMission) as number[]).reduce((acc, curr) => acc + (Number(curr) || 0), 0);

  const handleModeChange = (mode: GameMode) => {
    sound.playClick();
    onSelectMode(mode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & BNCC Tag */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-fredoka tracking-tight leading-none">
                Jogo dos Registros
              </h1>
              <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                BNCC (EF04CO02)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Pensamento Computacional: Campos, Valores & Manipulações
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
          <button
            id="nav-btn-missions"
            onClick={() => handleModeChange('missions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentMode === 'missions'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Missões</span>
          </button>

          <button
            id="nav-btn-sandbox"
            onClick={() => handleModeChange('sandbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentMode === 'sandbox'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden xs:inline">Oficina</span>
            <span className="xs:hidden">Oficina</span>
          </button>

          <button
            id="nav-btn-arcade"
            onClick={() => handleModeChange('arcade')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentMode === 'arcade'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Duelo</span>
          </button>

          <button
            id="nav-btn-guide"
            onClick={() => handleModeChange('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentMode === 'guide'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Guia BNCC</span>
            <span className="sm:hidden">Guia</span>
          </button>
        </nav>

        {/* Right actions: Stars & Audio toggle */}
        <div className="flex items-center gap-2">
          {/* Stars Pill */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-amber-800 text-xs font-bold shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{totalStars} / 18</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            title={progress.soundEnabled ? 'Silenciar som' : 'Ativar som'}
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
