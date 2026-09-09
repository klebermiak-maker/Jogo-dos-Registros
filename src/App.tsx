/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameMode, UserProgress } from './types';
import { Navbar } from './components/Navbar';
import { MissionsMode } from './components/MissionsMode';
import { SandboxMode } from './components/SandboxMode';
import { ArcadeMode } from './components/ArcadeMode';
import { PedagogicalGuide } from './components/PedagogicalGuide';
import { sound } from './utils/audio';

const STORAGE_KEY = 'mundo_registros_progress_v1';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('missions');
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            starsByMission: parsed.starsByMission || {},
            completedMissions: parsed.completedMissions || [],
            arcadeHighScore: parsed.arcadeHighScore || 0,
            createdCustomRecords: parsed.createdCustomRecords || 0,
            soundEnabled: parsed.soundEnabled ?? true
          };
        }
      } catch {
        // Fallback to default
      }
    }
    return {
      starsByMission: {},
      completedMissions: [],
      arcadeHighScore: 0,
      createdCustomRecords: 0,
      soundEnabled: true
    };
  });

  // Sync sound utility with state
  useEffect(() => {
    sound.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  // Persist progress to local storage
  const handleUpdateProgress = (newProgress: Partial<UserProgress>) => {
    setProgress(prev => {
      const updated = { ...prev, ...newProgress };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
      return updated;
    });
  };

  const handleToggleSound = () => {
    const nextState = !progress.soundEnabled;
    sound.enabled = nextState;
    if (nextState) sound.playClick();
    handleUpdateProgress({ soundEnabled: nextState });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 selection:bg-indigo-200">
      {/* Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        progress={progress}
        onToggleSound={handleToggleSound}
      />

      {/* Main Mode View */}
      <main className="flex-1">
        {currentMode === 'missions' && (
          <MissionsMode
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentMode === 'sandbox' && (
          <SandboxMode />
        )}

        {currentMode === 'arcade' && (
          <ArcadeMode
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentMode === 'guide' && (
          <PedagogicalGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Pensamento Computacional • Habilidade BNCC <strong>(EF04CO02)</strong>
          </span>
          <span className="text-slate-400">
            Reconhecimento, Organização e Manipulação de Registros Digitais
          </span>
        </div>
      </footer>
    </div>
  );
}
