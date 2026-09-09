/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, CheckCircle, Database, Layers, Sparkles, Award } from 'lucide-react';

export const PedagogicalGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-indigo-200 border border-white/20">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          BNCC Computação - 4º Ano Ensino Fundamental
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-fredoka">
          Guia Pedagógico da Habilidade (EF04CO02)
        </h2>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl leading-relaxed">
          &quot;Reconhecer objetos do mundo real e/ou digital que podem ser representados através de registros que estabelecem uma organização na qual cada componente é identificado por um nome, fazendo manipulações sobre estas.&quot;
        </p>
      </div>

      {/* Grid of 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">1. O Conceito de Registro</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Um <strong>Registro</strong> (em inglês <em>Record</em>, <em>Object</em> ou <em>Dictionary</em>) é uma estrutura que agrupa informações relacionadas sobre uma mesma entidade, seja um objeto do mundo real (um livro, um pet, um carro) ou do mundo digital (um avatar, um arquivo).
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">2. Campo e Valor</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cada componente do registro é identificado por um <strong>Nome de Campo</strong> (ex: <code className="bg-slate-100 px-1 rounded text-purple-800">cor</code>, <code className="bg-slate-100 px-1 rounded text-purple-800">energia</code>) que armazena um <strong>Valor</strong> específico (ex: <code className="bg-slate-100 px-1 rounded text-emerald-800">&quot;Azul&quot;</code>, <code className="bg-slate-100 px-1 rounded text-emerald-800">80</code>).
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">3. Manipulações</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manipular registros significa <strong>ler</strong> o valor de um campo, <strong>atualizar</strong> valores existentes, <strong>adicionar novos campos</strong>, <strong>remover</strong> campos desnecessários e <strong>filtrar</strong> registros que atendem a regras.
          </p>
        </div>
      </div>

      {/* Classroom Activity Suggestion */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Sugestão de Atividade Prática em Sala de Aula (Computação Desplugada)
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Passo 1 - A Ficha em Papel:</strong> Peça para cada aluno criar no caderno uma &quot;Ficha de Personagem&quot; ou &quot;Ficha de Mochila Escolar&quot;, dividida em duas colunas: <em>Nome do Campo</em> à esquerda e <em>Valor</em> à direita.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Passo 2 - Manipulação em Tempo Real:</strong> O professor simula eventos narrativos: &quot;O personagem tomou chuva! Manipule o campo <em>status</em> para &apos;Molhado&apos; e reduza a <em>energia</em> em 10 pontos.&quot; Os alunos apagam e atualizam o valor correspondente.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Passo 3 - Transição para o Jogo Digital:</strong> No laboratório de informática ou no celular/tablet, os estudantes utilizam este aplicativo para vivenciar na tela a representação gráfica e o código (JSON) reagindo dinamicamente às manipulações.
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Connections */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Onde este conceito é usado no Mundo Real?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong>🏥 Hospitais e Prontuários:</strong> O prontuário do paciente guarda campos como <code className="text-indigo-600">tipo_sanguineo</code>, <code className="text-indigo-600">alergias</code> e <code className="text-indigo-600">peso</code>.
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong>🎮 Jogos Eletrônicos:</strong> No Minecraft ou Pokémon, cada monstro ou item é um registro com <code className="text-indigo-600">hp</code>, <code className="text-indigo-600">ataque</code>, <code className="text-indigo-600">tipo</code> e <code className="text-indigo-600">nivel</code>.
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong>🛒 Comércio Eletrônico:</strong> Em lojas virtuais, cada produto tem <code className="text-indigo-600">preco</code>, <code className="text-indigo-600">estoque</code>, <code className="text-indigo-600">tamanho</code> e <code className="text-indigo-600">marca</code>.
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong>🚀 Exploração Espacial:</strong> Sondas e satélites reportam seus estados com campos de telemetria como <code className="text-indigo-600">temperatura</code>, <code className="text-indigo-600">altitude</code> e <code className="text-indigo-600">bateria</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
