/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DigitalRecord } from '../types';

export const SANDBOX_TEMPLATES: DigitalRecord[] = [
  {
    id: 'tpl-robo',
    recordTitle: 'Robô Modular de Exploração',
    category: 'robo',
    fields: [
      { id: 'f1', name: 'nome', value: 'Robo-Titã 3000', type: 'text', description: 'Identificação do robô' },
      { id: 'f2', name: 'cor_chassi', value: '#3B82F6', type: 'color', description: 'Cor da carcaça do robô' },
      { id: 'f3', name: 'nivel_bateria', value: 85, type: 'number', description: 'Energia disponível de 0 a 100%' },
      { id: 'f4', name: 'tipo_olhos', value: 'Laser Digital', type: 'select', options: ['Laser Digital', 'Visor Amigável', 'Lentes Noturnas'], description: 'Estilo dos sensores visuais' },
      { id: 'f5', name: 'ferramenta_braco', value: 'Canhão de Plasma', type: 'select', options: ['Canhão de Plasma', 'Pinça Mecânica', 'Broca de Perfuração', 'Escudo de Energia'], description: 'Acessório montado no braço' },
      { id: 'f6', name: 'antena_comunicacao', value: true, type: 'boolean', description: 'Permite receber comandos via satélite' },
      { id: 'f7', name: 'modo_turbo', value: false, type: 'boolean', description: 'Aumenta velocidade ao custo de bateria' }
    ]
  },
  {
    id: 'tpl-pet',
    recordTitle: 'Mascote Digital Alienígena',
    category: 'pet',
    fields: [
      { id: 'f1', name: 'nome', value: 'Zulú', type: 'text', description: 'Nome do bichinho' },
      { id: 'f2', name: 'cor_pele', value: '#10B981', type: 'color', description: 'Cor do mascote' },
      { id: 'f3', name: 'especie', value: 'Blobby Saltador', type: 'select', options: ['Blobby Saltador', 'Dragãozinho Cósmico', 'Gatinho Estelar'], description: 'Família do monstrinho' },
      { id: 'f4', name: 'felicidade', value: 90, type: 'number', description: 'Nível de carinho e alegria' },
      { id: 'f5', name: 'tem_asas', value: true, type: 'boolean', description: 'Capacidade de planar pelo ar' },
      { id: 'f6', name: 'acessorio', value: 'Gravatinha Borboleta', type: 'select', options: ['Gravatinha Borboleta', 'Óculos Escuros', 'Coroa Dourada', 'Sem Acessório'], description: 'Item vestido' }
    ]
  },
  {
    id: 'tpl-veiculo',
    recordTitle: 'Supercarro Hiper-Sônico',
    category: 'veiculo',
    fields: [
      { id: 'f1', name: 'modelo', value: 'Relâmpago GX', type: 'text', description: 'Nome do modelo do veículo' },
      { id: 'f2', name: 'cor_carroceria', value: '#EF4444', type: 'color', description: 'Pintura externa' },
      { id: 'f3', name: 'velocidade_maxima', value: 320, type: 'number', description: 'Velocidade máxima em km/h' },
      { id: 'f4', name: 'tipo_propulsao', value: 'Fusão Elétrica', type: 'select', options: ['Fusão Elétrica', 'Foguete de Íons', 'Motor Híbrido Solar'], description: 'Fonte de energia' },
      { id: 'f5', name: 'turbo_ativado', value: true, type: 'boolean', description: 'Impulso extra nas retas' },
      { id: 'f6', name: 'aerofolio_esportivo', value: true, type: 'boolean', description: 'Garante estabilidade aerodinâmica' }
    ]
  },
  {
    id: 'tpl-cracha',
    recordTitle: 'Crachá de Agente Espacial',
    category: 'objeto_real',
    fields: [
      { id: 'f1', name: 'nome_agente', value: 'Comandante Clara', type: 'text', description: 'Nome completo registrado' },
      { id: 'f2', name: 'codigo_matricula', value: 'AGT-9042', type: 'text', description: 'Identificador único' },
      { id: 'f3', name: 'nivel_acesso', value: 4, type: 'number', description: 'Nível de segurança de 1 a 5' },
      { id: 'f4', name: 'departamento', value: 'Exploração Cósmica', type: 'select', options: ['Exploração Cósmica', 'Engenharia Robótica', 'Defesa Planetária'], description: 'Setor de trabalho' },
      { id: 'f5', name: 'acesso_autorizado', value: true, type: 'boolean', description: 'Se o crachá abre as portas secretas' }
    ]
  }
];
