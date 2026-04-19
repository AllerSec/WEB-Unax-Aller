import type { DayTemplate, DayType } from '../types';

const IMG = (name: string) => `exercises/${name}.svg`;

export const ROUTINES: Record<DayType, DayTemplate> = {
  push: {
    type: 'push',
    label: 'Push',
    color: '#8b3a3a',
    emoji: '',
    exercises: [
      { id: 'press-banca', name: 'Press banca', muscle: 'Pecho centro', category: 'compound', image: IMG('chest'), sets: 4, repRange: [6, 8], restSec: 150 },
      { id: 'press-inclinado', name: 'Press inclinado', muscle: 'Pecho alto', category: 'compound', image: IMG('chest'), sets: 4, repRange: [6, 10], restSec: 150 },
      { id: 'fondos', name: 'Fondos', muscle: 'Pecho bajo', category: 'compound', image: IMG('chest'), sets: 4, repRange: [8, 12], restSec: 120 },
      { id: 'aperturas', name: 'Aperturas / Pec deck', muscle: 'Pecho general', category: 'isolation-shoulder', image: IMG('chest'), sets: 4, repRange: [10, 15], restSec: 90 },
      { id: 'ext-triceps-trasnuca', name: 'Extensión tríceps trasnuca', muscle: 'Tríceps larga', category: 'isolation-arm', image: IMG('triceps'), sets: 4, repRange: [10, 12], restSec: 90 },
      { id: 'ext-triceps-polea', name: 'Extensión tríceps polea', muscle: 'Tríceps lateral/medial', category: 'isolation-arm', image: IMG('triceps'), sets: 4, repRange: [10, 15], restSec: 75 },
    ],
  },
  pull: {
    type: 'pull',
    label: 'Pull',
    color: '#3a5a8b',
    emoji: '',
    exercises: [
      { id: 'dominadas', name: 'Dominadas', muscle: 'Espalda', category: 'compound', image: IMG('back'), sets: 4, repRange: [6, 10], restSec: 150 },
      { id: 'remo', name: 'Remo', muscle: 'Espalda', category: 'compound', image: IMG('back'), sets: 4, repRange: [8, 10], restSec: 120 },
      { id: 'jalon-al-pecho', name: 'Jalón al pecho', muscle: 'Espalda', category: 'compound', image: IMG('back'), sets: 4, repRange: [8, 12], restSec: 120 },
      { id: 'peso-muerto', name: 'Peso muerto / Hiperextensiones', muscle: 'Lumbar', category: 'compound', image: IMG('lumbar'), sets: 4, repRange: [6, 10], restSec: 180 },
      { id: 'curl-barra', name: 'Curl barra', muscle: 'Bíceps', category: 'isolation-arm', image: IMG('biceps'), sets: 4, repRange: [8, 12], restSec: 90 },
      { id: 'curl-mancuerna-alt', name: 'Curl mancuerna alterno', muscle: 'Bíceps', category: 'isolation-arm', image: IMG('biceps'), sets: 4, repRange: [10, 12], restSec: 75 },
      { id: 'curl-martillo', name: 'Curl martillo', muscle: 'Bíceps / braquial', category: 'isolation-arm', image: IMG('biceps'), sets: 4, repRange: [10, 15], restSec: 75 },
    ],
  },
  leg: {
    type: 'leg',
    label: 'Pierna',
    color: '#4d6453',
    emoji: '',
    exercises: [
      { id: 'sentadillas', name: 'Sentadillas', muscle: 'Cuádriceps', category: 'compound', image: IMG('quads'), sets: 3, repRange: [6, 10], restSec: 180 },
      { id: 'hip-thrust', name: 'Hip thrust / Peso muerto rumano', muscle: 'Glúteo', category: 'compound', image: IMG('glutes'), sets: 3, repRange: [8, 12], restSec: 150 },
      { id: 'ext-pierna', name: 'Extensión pierna', muscle: 'Cuádriceps', category: 'isolation-leg', image: IMG('quads'), sets: 3, repRange: [10, 15], restSec: 90 },
      { id: 'curl-tumbado', name: 'Curl tumbado', muscle: 'Femoral', category: 'isolation-leg', image: IMG('hamstring'), sets: 3, repRange: [10, 15], restSec: 90 },
      { id: 'gemelos', name: 'Elevaciones de talones', muscle: 'Gemelos', category: 'isolation-leg', image: IMG('calves'), sets: 3, repRange: [12, 20], restSec: 75 },
      { id: 'abdominales-pierna', name: 'Abdominales', muscle: 'Core', category: 'core', image: IMG('core'), sets: 3, repRange: [12, 20], restSec: 60 },
      { id: 'bici-lento', name: 'Bici lento', muscle: 'Cardio', category: 'cardio', image: IMG('cardio'), sets: 1, repRange: [30, 30], restSec: 0, notes: '30 minutos' },
    ],
  },
  shoulder: {
    type: 'shoulder',
    label: 'Hombro',
    color: '#a06a2c',
    emoji: '',
    exercises: [
      { id: 'press-hombros', name: 'Press de hombros', muscle: 'Hombro compuesto', category: 'compound', image: IMG('shoulder'), sets: 4, repRange: [6, 10], restSec: 150 },
      { id: 'elev-laterales', name: 'Elevaciones laterales mancuerna', muscle: 'Hombro medio', category: 'isolation-shoulder', image: IMG('shoulder'), sets: 4, repRange: [12, 15], restSec: 75 },
      { id: 'face-pull', name: 'Polea alta / Face pull', muscle: 'Hombro posterior', category: 'isolation-shoulder', image: IMG('shoulder'), sets: 4, repRange: [12, 20], restSec: 75 },
      { id: 'encogimientos', name: 'Encogimientos', muscle: 'Trapecio superior', category: 'isolation-shoulder', image: IMG('traps'), sets: 4, repRange: [10, 15], restSec: 75 },
      { id: 'abdominales-hombro', name: 'Abdominales / oblicuos', muscle: 'Core', category: 'core', image: IMG('core'), sets: 4, repRange: [12, 20], restSec: 60 },
    ],
  },
};

export const DAY_TYPES: DayType[] = ['push', 'pull', 'leg', 'shoulder'];
