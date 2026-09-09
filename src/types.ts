/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameMode = 'missions' | 'sandbox' | 'arcade' | 'guide';

export type FieldType = 'text' | 'number' | 'boolean' | 'color' | 'select';

export interface RecordField {
  id: string;
  name: string; // O nome do campo (chave/atributo)
  value: string | number | boolean; // O valor do campo
  type: FieldType;
  options?: string[]; // Para campos select
  description?: string; // Dica explicativa para a criança
  locked?: boolean; // Não pode ser apagado se for campo fundamental
}

export interface DigitalRecord {
  id: string;
  recordTitle: string;
  category: 'personagem' | 'veiculo' | 'pet' | 'objeto_real' | 'robo';
  fields: RecordField[];
}

export interface MissionStep {
  id: number;
  title: string;
  subtitle: string;
  story: string;
  concept: string; // Explicação pedagógica de computação
  realWorldAnalogy: string; // Exemplo do dia a dia
  targetRecord: DigitalRecord;
  taskType: 
    | 'identify_field'      // Descobrir qual o valor de um campo
    | 'modify_value'        // Alterar o valor de um campo para resolver uma situação
    | 'create_field'        // Adicionar um novo campo essencial
    | 'match_object'        // Modelar um objeto do mundo real em campos e valores
    | 'filter_selection'    // Encontrar registros que atendam a condições de campos
    | 'fix_record';         // Corrigir múltiplos campos corrompidos
  taskInstruction: string;
  // Configurações específicas da tarefa
  targetFieldName?: string;
  expectedValue?: string | number | boolean;
  choices?: { label: string; value: string | number | boolean; isCorrect: boolean; feedback: string }[];
  filterOptions?: {
    records: DigitalRecord[];
    targetFilterKey: string;
    targetFilterValue: string | number | boolean;
    conditionDesc: string;
    correctRecordIds: string[];
  };
  objectToModel?: {
    imageName: string;
    realObjectName: string;
    description: string;
    visualClues: string[];
    suggestedFields: { name: string; value: string; type: FieldType }[];
  };
  successFeedback: string;
  hint: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  contextRecord?: {
    nomeObjeto: string;
    campos: { campo: string; valor: string | number | boolean }[];
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'conceito' | 'leitura' | 'manipulação' | 'mundo_real';
}

export interface UserProgress {
  starsByMission: { [missionId: number]: number };
  completedMissions: number[];
  arcadeHighScore: number;
  createdCustomRecords: number;
  soundEnabled: boolean;
}
