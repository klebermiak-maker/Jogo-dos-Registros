/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MissionStep } from '../types';

export const MISSIONS_DATA: MissionStep[] = [
  {
    id: 1,
    title: 'Missão 1: A Ficha do Mascote Espacial',
    subtitle: 'Descobrindo o que é um Registro, Campo e Valor',
    story: 'Um simpático mascote alienígena foi resgatado pela nossa nave! Para cadastrá-lo no banco de dados da missão interestelar, precisamos entender a sua "Ficha Cadastral" (em computação, chamamos isso de REGISTRO).',
    concept: 'Um REGISTRO é como uma ficha organizada onde guardamos informações sobre algo. Cada linha tem um NOME DO CAMPO (que diz o que é aquela informação) e um VALOR (o dado em si).',
    realWorldAnalogy: 'Pense na sua carteirinha escolar: tem o campo "Nome", o campo "Turma" e o campo "Foto". Cada um tem um nome bem definido!',
    targetRecord: {
      id: 'mascote-01',
      recordTitle: 'Registro do Mascote: Pipoca',
      category: 'pet',
      fields: [
        { id: 'f1', name: 'nome', value: 'Pipoca', type: 'text', locked: true, description: 'Nome do bichinho' },
        { id: 'f2', name: 'especie', value: 'Nebulino Fofuxo', type: 'text', locked: true, description: 'Espécie biológica' },
        { id: 'f3', name: 'cor_principal', value: 'Azul Cósmico', type: 'text', locked: true, description: 'Cor predominante' },
        { id: 'f4', name: 'antenas', value: 2, type: 'number', locked: true, description: 'Quantidade de antenas' },
        { id: 'f5', name: 'gosta_de_carinho', value: true, type: 'boolean', locked: true, description: 'Se gosta de afeto' }
      ]
    },
    taskType: 'identify_field',
    taskInstruction: 'O computador da nave precisa saber: Qual é o VALOR armazenado no campo "antenas" deste registro?',
    targetFieldName: 'antenas',
    expectedValue: 2,
    choices: [
      { label: 'Azul Cósmico', value: 'Azul Cósmico', isCorrect: false, feedback: 'Ops! "Azul Cósmico" é o valor do campo "cor_principal", não de "antenas".' },
      { label: '2', value: 2, isCorrect: true, feedback: 'Excelente! O campo "antenas" guarda exatamente o valor 2.' },
      { label: 'Pipoca', value: 'Pipoca', isCorrect: false, feedback: 'Não, "Pipoca" é o valor do campo "nome"!' },
      { label: 'Nebulino Fofuxo', value: 'Nebulino Fofuxo', isCorrect: false, feedback: '"Nebulino Fofuxo" é o valor do campo "especie".' }
    ],
    successFeedback: 'Perfeito! Você reconheceu que no registro, cada componente tem um NOME IDENTIFICADOR e guarda um VALOR específico!',
    hint: 'Olhe a tabela do registro: encontre a linha onde o nome do campo é "antenas" e veja o que está na coluna do valor.'
  },
  {
    id: 2,
    title: 'Missão 2: Inspetor de Biblioteca Digital',
    subtitle: 'Consultando múltiplos campos para desvendar mistérios',
    story: 'O arquivo central de livros galácticos encontrou um registro antigo de um artefato da Terra. O sistema quer confirmar o valor do campo correto para autorizar o empréstimo.',
    concept: 'Ao programar, consultamos os dados chamando o nome do campo. Por exemplo: livro["autor"] ou livro.ano_publicacao.',
    realWorldAnalogy: 'Quando você procura um livro na biblioteca da escola, você busca pelo nome do campo: "Autor", "Título" ou "Código do Livro".',
    targetRecord: {
      id: 'livro-digital-42',
      recordTitle: 'Registro do Livro: Guia das Galáxias',
      category: 'objeto_real',
      fields: [
        { id: 'f1', name: 'titulo', value: 'Segredos de Marte e da Terra', type: 'text', locked: true },
        { id: 'f2', name: 'autor', value: 'Dra. Clara Estrela', type: 'text', locked: true },
        { id: 'f3', name: 'ano_publicacao', value: 2026, type: 'number', locked: true },
        { id: 'f4', name: 'numero_paginas', value: 140, type: 'number', locked: true },
        { id: 'f5', name: 'disponivel_para_emprestimo', value: true, type: 'boolean', locked: true },
        { id: 'f6', name: 'idioma', value: 'Português', type: 'text', locked: true }
      ]
    },
    taskType: 'identify_field',
    taskInstruction: 'O robô bibliotecário pergunta: Quem é o valor armazenado no campo "autor"?',
    targetFieldName: 'autor',
    expectedValue: 'Dra. Clara Estrela',
    choices: [
      { label: 'Segredos de Marte e da Terra', value: 'Segredos de Marte e da Terra', isCorrect: false, feedback: 'Esse é o valor do campo "titulo".' },
      { label: 'Dra. Clara Estrela', value: 'Dra. Clara Estrela', isCorrect: true, feedback: 'Correto! Dra. Clara Estrela é o valor atribuído ao campo "autor"!' },
      { label: '2026', value: 2026, isCorrect: false, feedback: '2026 é o valor do campo "ano_publicacao".' },
      { label: 'Português', value: 'Português', isCorrect: false, feedback: 'Português é o valor do campo "idioma".' }
    ],
    successFeedback: 'Sensacional! Você já sabe como consultar e acessar dados de qualquer registro através do nome do campo!',
    hint: 'Procure na ficha o campo chamado "autor" e veja quem o escreveu.'
  },
  {
    id: 3,
    title: 'Missão 3: Manipulação do Robô Explorador',
    subtitle: 'Alterando valores em registros para resolver desafios',
    story: 'Alerta de tempestade! Nosso Robô Explorador está prestes a entrar em uma caverna escura com solo de gelo escorregadio. O registro do robô precisa ser MANIPULADO para que ele sobreviva!',
    concept: 'MANIPULAR um registro significa alterar, atualizar ou ajustar os valores de seus campos. Exemplo: robo.bateria = 100 ou robo.farol_ligado = true.',
    realWorldAnalogy: 'Em um jogo de videogame, quando seu personagem pega uma poção de cura, o jogo MANIPULA o campo "pontos_de_vida", aumentando seu valor!',
    targetRecord: {
      id: 'robo-rover-x',
      recordTitle: 'Registro do Robô: Explorador Beta',
      category: 'robo',
      fields: [
        { id: 'f1', name: 'nome_modelo', value: 'Rover-X4', type: 'text', locked: true },
        { id: 'f2', name: 'nivel_energia', value: 30, type: 'number', description: 'Precisa de no mínimo 80% para a travessia' },
        { id: 'f3', name: 'tipo_tracao', value: 'Rodas Comuns', type: 'select', options: ['Rodas Comuns', 'Esteira para Gelo', 'Pés Magnéticos'] },
        { id: 'f4', name: 'lanterna_ligada', value: false, type: 'boolean', description: 'A caverna está 100% escura!' },
        { id: 'f5', name: 'ferramenta_braco', value: 'Vassoura', type: 'select', options: ['Vassoura', 'Laser Quebra-Rocha', 'Câmera Térmica'] }
      ]
    },
    taskType: 'modify_value',
    taskInstruction: 'MANIPULE os campos do robô: Ligue a lanterna (true), mude a tração para "Esteira para Gelo" e recarregue o nível de energia para 100!',
    successFeedback: 'Incrível manipulação! Você alterou os valores dos campos e o robô superou o terreno hostil com sucesso!',
    hint: 'Clique nos controles interativos dentro do registro para atualizar cada valor conforme o objetivo.'
  },
  {
    id: 4,
    title: 'Missão 4: Filtragem de Tripulantes da Frota',
    subtitle: 'Manipulando listas de registros com condições de busca',
    story: 'Precisamos convocar apenas os membros da frota que possuem a especialidade de "Piloto" E estão no status "Disponível". Encontre os registros corretos!',
    concept: 'Nos computadores e aplicativos, pesquisar e filtrar significa olhar vários registros e checar se o valor de determinado campo bate com o que queremos.',
    realWorldAnalogy: 'Quando você pesquisa em uma loja online por "sapatos" com tamanho "36" e cor "preto", o sistema faz exatamente isso!',
    targetRecord: {
      id: 'frota-central',
      recordTitle: 'Quartel da Frota',
      category: 'personagem',
      fields: []
    },
    taskType: 'filter_selection',
    taskInstruction: 'Selecione apenas os tripulantes cujo campo "especialidade" seja "Piloto" E cujo campo "disponivel" seja true!',
    filterOptions: {
      records: [
        {
          id: 'rec-1',
          recordTitle: 'Ficha: Capitão Alex',
          category: 'personagem',
          fields: [
            { id: 'f1', name: 'nome', value: 'Alex Rios', type: 'text' },
            { id: 'f2', name: 'especialidade', value: 'Piloto', type: 'text' },
            { id: 'f3', name: 'disponivel', value: true, type: 'boolean' },
            { id: 'f4', name: 'nivel_experiencia', value: 5, type: 'number' }
          ]
        },
        {
          id: 'rec-2',
          recordTitle: 'Ficha: Dra. Luna',
          category: 'personagem',
          fields: [
            { id: 'f1', name: 'nome', value: 'Luna Chen', type: 'text' },
            { id: 'f2', name: 'especialidade', value: 'Cientista', type: 'text' },
            { id: 'f3', name: 'disponivel', value: true, type: 'boolean' },
            { id: 'f4', name: 'nivel_experiencia', value: 4, type: 'number' }
          ]
        },
        {
          id: 'rec-3',
          recordTitle: 'Ficha: Tarsila Astro',
          category: 'personagem',
          fields: [
            { id: 'f1', name: 'nome', value: 'Tarsila Astro', type: 'text' },
            { id: 'f2', name: 'especialidade', value: 'Piloto', type: 'text' },
            { id: 'f3', name: 'disponivel', value: false, type: 'boolean' },
            { id: 'f4', name: 'nivel_experiencia', value: 6, type: 'number' }
          ]
        },
        {
          id: 'rec-4',
          recordTitle: 'Ficha: Zeca Veloz',
          category: 'personagem',
          fields: [
            { id: 'f1', name: 'nome', value: 'Zeca Veloz', type: 'text' },
            { id: 'f2', name: 'especialidade', value: 'Piloto', type: 'text' },
            { id: 'f3', name: 'disponivel', value: true, type: 'boolean' },
            { id: 'f4', name: 'nivel_experiencia', value: 3, type: 'number' }
          ]
        }
      ],
      targetFilterKey: 'especialidade',
      targetFilterValue: 'Piloto',
      conditionDesc: 'especialidade == "Piloto" E disponivel == true',
      correctRecordIds: ['rec-1', 'rec-4']
    },
    successFeedback: 'Excelente visão computacional! Você filtrou os registros exatamente pelos valores dos campos solicitados.',
    hint: 'Verifique cada ficha: precisa ter especialidade "Piloto" e disponivel "true" (verdadeiro).'
  },
  {
    id: 5,
    title: 'Missão 5: Modelando um Objeto do Mundo Real',
    subtitle: 'Criando um registro digital a partir de um objeto físico',
    story: 'Um engenheiro trouxe uma "Bicicleta Elétrica Ecológica" para a nossa cidade inteligente. Como representamos este objeto do mundo real dentro do sistema em formato de REGISTRO?',
    concept: 'Na computação, pegamos objetos reais e criamos uma abstração: escolhemos os nomes dos campos mais importantes e definimos seus valores.',
    realWorldAnalogy: 'Um aplicativo de aluguel de bicicletas tem para cada bike: código, nível da bateria, se está trancada e localização.',
    targetRecord: {
      id: 'bike-real',
      recordTitle: 'Registro: Bicicleta Elétrica Eco-Ride',
      category: 'veiculo',
      fields: []
    },
    taskType: 'match_object',
    taskInstruction: 'Adicione os 4 campos essenciais para representar a Bicicleta Elétrica e defina seus valores de acordo com o objeto mostrado!',
    objectToModel: {
      imageName: 'bicicleta_eletrica',
      realObjectName: 'Bicicleta Elétrica Eco-Ride 3000',
      description: 'Uma bike de cor Verde Limão, com motor elétrico de 250 Watts, 2 rodas com refletores e bateria atual em 85%.',
      visualClues: [
        'Cor predominante: Verde Limão',
        'Potência do motor: 250 Watts',
        'Carga da Bateria: 85%',
        'Está Destravada: Sim (true)'
      ],
      suggestedFields: [
        { name: 'cor_quadro', value: 'Verde Limão', type: 'text' },
        { name: 'potencia_watts', value: '250', type: 'number' },
        { name: 'bateria_porcentagem', value: '85', type: 'number' },
        { name: 'destravada', value: 'true', type: 'boolean' }
      ]
    },
    successFeedback: 'Fantástico! Você transformou um objeto físico do mundo real em um registro digital perfeito, pronto para qualquer programa utilizar!',
    hint: 'Preencha cada campo com o nome da propriedade e o valor observado no objeto físico.'
  },
  {
    id: 6,
    title: 'Missão 6: Operação Resgate do Satélite Corrompido',
    subtitle: 'Manipulação avançada: reparar campos e adicionar novos dados',
    story: 'O Satélite de Comunicação sofreu uma pane solar e seus dados foram embaralhados! Precisamos manipular os campos errados e adicionar um campo de emergência para salvar a transmissão.',
    concept: 'Sistemas reais precisam constantemente validar se os campos têm nomes corretos e se os valores fazem sentido.',
    realWorldAnalogy: 'Se alguém digitar o ano de nascimento como "banana", o registro estará corrompido! O programador precisa consertar.',
    targetRecord: {
      id: 'satelite-comms',
      recordTitle: 'Registro: Satélite Orbiter-7',
      category: 'objeto_real',
      fields: [
        { id: 'f1', name: 'nome_satelite', value: 'Orbiter-7', type: 'text', locked: true },
        { id: 'f2', name: 'altitude_km', value: -50, type: 'number', description: 'Altitude não pode ser negativa! O valor correto é 400 km.' },
        { id: 'f3', name: 'painel_solar_aberto', value: false, type: 'boolean', description: 'Precisa estar aberto (true) para receber luz solar!' },
        { id: 'f4', name: 'frequencia_mhz', value: 0, type: 'number', description: 'Frequência de emergência deve ser 1420 MHz.' }
      ]
    },
    taskType: 'fix_record',
    taskInstruction: 'Conserte os campos com erros (altitude para 400, painel para true, frequência para 1420) e adicione o campo "escudo_defletor" com valor true!',
    successFeedback: 'Missão Cumprida com Honras! Você dominou completamente a criação, consulta e manipulação de registros segundo a habilidade EF04CO02!',
    hint: 'Corrija os valores dos 3 campos indicados e use o botão "Adicionar Campo" para incluir o escudo_defletor.'
  }
];
