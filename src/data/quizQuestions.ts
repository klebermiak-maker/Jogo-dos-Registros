/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Em um registro digital de um carro, o que representa a palavra "velocidade_maxima"?',
    contextRecord: {
      nomeObjeto: 'Carro Elétrico',
      campos: [
        { campo: 'marca', valor: 'EcoCar' },
        { campo: 'velocidade_maxima', valor: 180 },
        { campo: 'eletrico', valor: true }
      ]
    },
    options: [
      'É o Valor armazenado',
      'É o Nome do Campo (Identificador do componente)',
      'É o nome de quem inventou o carro',
      'É um erro de digitação'
    ],
    correctIndex: 1,
    explanation: '"velocidade_maxima" é o NOME DO CAMPO. Ele identifica qual característica está sendo guardada. O número 180 é o VALOR desse campo.',
    category: 'conceito'
  },
  {
    id: 2,
    question: 'Ao observar o registro abaixo de um Personagem de Game, qual é o valor armazenado no campo "pontos_vida"?',
    contextRecord: {
      nomeObjeto: 'Mago das Estrelas',
      campos: [
        { campo: 'nome', valor: 'Astron' },
        { campo: 'classe', valor: 'Mago' },
        { campo: 'pontos_vida', valor: 85 },
        { campo: 'possui_varinha', valor: true }
      ]
    },
    options: ['Astron', 'Mago', '85', 'true'],
    correctIndex: 2,
    explanation: 'Ao consultar o registro na linha correspondente a "pontos_vida", vemos que seu valor é 85.',
    category: 'leitura'
  },
  {
    id: 3,
    question: 'Se o Mago das Estrelas bebeu uma poção e seus pontos_vida subiram de 85 para 100, que operação computacional acabou de acontecer?',
    options: [
      'O computador desligou',
      'Foi feita uma Manipulação (atualização) do valor do campo "pontos_vida"',
      'O nome do personagem foi apagado',
      'O jogo trocou de tela'
    ],
    correctIndex: 1,
    explanation: 'Manipular um registro significa modificar, atualizar ou processar os valores guardados em seus campos!',
    category: 'manipulação'
  },
  {
    id: 4,
    question: 'Qual dos seguintes itens do mundo real NÃO seria bem representado por um registro com campos e valores?',
    options: [
      'Uma ficha médica de um paciente no hospital (nome, tipo sanguíneo, idade)',
      'Um produto no supermercado (código de barras, preço, validade)',
      'Um único grão de areia solto sem nenhuma informação conhecida ou identificada',
      'Um perfil de aluno na escola (matrícula, série, turma, notas)'
    ],
    correctIndex: 2,
    explanation: 'Um registro precisa de informações organizadas com campos identificáveis por nome. Algo sem dados ou propriedades conhecidas não forma um registro!',
    category: 'mundo_real'
  },
  {
    id: 5,
    question: 'No registro abaixo de uma Fruta da Feira, qual campo indica se ela possui sementes?',
    contextRecord: {
      nomeObjeto: 'Melancia Baby',
      campos: [
        { campo: 'nome', valor: 'Melancia Baby' },
        { campo: 'peso_kg', valor: 2.5 },
        { campo: 'tem_sementes', valor: false },
        { campo: 'doce', valor: true }
      ]
    },
    options: [
      'O campo "peso_kg"',
      'O campo "nome"',
      'O campo "tem_sementes"',
      'O campo "doce"'
    ],
    correctIndex: 2,
    explanation: 'O campo "tem_sementes" guarda o valor lógico "false", indicando que esta fruta não tem sementes!',
    category: 'leitura'
  },
  {
    id: 6,
    question: 'Se você estiver criando um aplicativo para cadastrar cachorrinhos de um abrigo, quais seriam ótimos nomes de campos para esse registro?',
    options: [
      'abacaxi, sapato, nuvem',
      'nome, raca, idade_anos, vacinado',
      '1, 2, 3, 4',
      'sim, nao, talvez'
    ],
    correctIndex: 1,
    explanation: 'Nomes de campos devem ser descritivos e identificar com clareza cada componente do objeto do mundo real!',
    category: 'mundo_real'
  },
  {
    id: 7,
    question: 'Em programação, quando queremos adicionar uma informação que não existia antes no registro (por exemplo, "telefone_responsavel"), nós estamos:',
    options: [
      'Quebrando o computador',
      'Adicionando um novo campo ao registro com seu respectivo valor',
      'Reiniciando o sistema',
      'Apagando o registro anterior'
    ],
    correctIndex: 1,
    explanation: 'Registros podem ser expandidos com novos campos nomeados para guardar novas propriedades do objeto!',
    category: 'manipulação'
  },
  {
    id: 8,
    question: 'O que o padrão BNCC EF04CO02 nos ensina sobre Pensamento Computacional?',
    options: [
      'Que computadores só servem para jogar videogame',
      'Que objetos reais e digitais podem ser representados por registros com componentes nomeados e manipulados',
      'Que devemos memorizar teclas do teclado',
      'Que robôs não precisam de dados'
    ],
    correctIndex: 1,
    explanation: 'Exatamente! A habilidade EF04CO02 ensina a modelar o mundo real e digital em registros estruturados e manipular esses dados para resolver problemas.',
    category: 'conceito'
  }
];
