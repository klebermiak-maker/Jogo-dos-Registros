/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion, UserProgress } from '../types';
import { sound } from '../utils/audio';
import { 
  Zap, 
  Trophy, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Database
} from 'lucide-react';

interface ArcadeModeProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
}

export const ArcadeMode: React.FC<ArcadeModeProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctIndex;

    if (isCorrect) {
      sound.playSuccess();
      const pointsEarned = 100 + streak * 25;
      const newScore = score + pointsEarned;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      if (newScore > progress.arcadeHighScore) {
        onUpdateProgress({ arcadeHighScore: newScore });
      }

      if (newStreak % 3 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      sound.playError();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      sound.playVictoryFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Game Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-sm">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-fredoka">
              Duelo Rápido de Registros
            </h2>
            <span className="text-[11px] text-slate-500">
              Questão {currentIndex + 1} de {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Score & Streak Stats */}
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Combo x{streak}!</span>
            </div>
          )}

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Pontos</span>
            <span className="text-base font-bold text-indigo-700 font-mono leading-none">
              {score}
            </span>
          </div>

          <div className="text-right pl-3 border-l border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Recorde</span>
            <span className="text-base font-bold text-emerald-600 font-mono leading-none flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {progress.arcadeHighScore}
            </span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          {/* Category Tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              Tópico: {question.category.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              +100 pts por acerto
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {question.question}
          </h3>

          {/* Context Record Card (if present) */}
          {question.contextRecord && (
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-1.5 font-mono">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  REGISTRO: {question.contextRecord.nomeObjeto}
                </span>
                <span className="text-[10px] text-slate-500">[Campo] : [Valor]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                {question.contextRecord.campos.map((c, i) => (
                  <div key={i} className="bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-indigo-400 font-bold">{c.campo}:</span>
                    <span className="text-emerald-300">{String(c.valor)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400/20 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400/20';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold bg-white text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-indigo-950 space-y-2 animate-fadeIn">
              <div className="font-bold flex items-center gap-1.5">
                {selectedOption === question.correctIndex ? (
                  <span className="text-emerald-700">✓ Resposta Correta!</span>
                ) : (
                  <span className="text-rose-700">✕ Quase lá!</span>
                )}
              </div>
              <p className="text-xs text-indigo-900/90 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Footer Action */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Over Screen */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
              Duelo Concluído com Sucesso!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Você testou seus conhecimentos sobre registros, campos, valores e manipulações!
            </p>
          </div>

          <div className="max-w-xs mx-auto bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono">Pontuação Final</span>
            <div className="text-3xl font-extrabold text-indigo-600 font-mono">
              {score} pts
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-200 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jogar Novamente</span>
          </button>
        </div>
      )}
    </div>
  );
};
