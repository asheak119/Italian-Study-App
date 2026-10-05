export type Tense = 'presente' | 'passato prossimo' | 'imperfetto' | 'trapassato prossimo' | 'futuro semplice' | 'futuro anteriore' | 'condizionale presente' | 'condizionale passato' | 'congiuntivo presente' | 'congiuntivo passato' | 'congiuntivo imperfetto' | 'imperativo';

export type Pronoun = 'io' | 'tu' | 'lui/lei' | 'noi' | 'voi' | 'loro';

// Helper function to normalize Italian input for lenient comparison
export const normalizeItalian = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/e'/g, 'è')
    .replace(/a'/g, 'à')
    .replace(/i'/g, 'ì')
    .replace(/o'/g, 'ò')
    .replace(/u'/g, 'ù')
    .replace(/é/g, 'è'); // Often confused, treat them the same for basic checks
};

export interface GrammarRule {
  tense: Tense;
  description: string;
  usage: string[];
  examples: { it: string; en: string }[];
  regularEndings?: {
    are: string[];
    ere: string[];
    ire: string[];
  };
  importantIrregulars?: { verb: string; conjugation: string[] }[];
}

export const grammarRules: GrammarRule[] = [
  {
    tense: 'presente',
    description: 'Used for actions happening now, regular occurrences, or sometimes future events.',
    usage: ['Current actions', 'Habits', 'General truths', 'Near future (sometimes)'],
    examples: [
      { it: 'Io mangio una mela.', en: 'I am eating an apple.' },
      { it: 'Vado a scuola ogni giorno.', en: 'I go to school every day.' }
    ],
    regularEndings: {
      are: ['-o', '-i', '-a', '-iamo', '-ate', '-ano'],
      ere: ['-o', '-i', '-e', '-iamo', '-ete', '-ono'],
      ire: ['-o / -isco', '-i / -isci', '-e / -isce', '-iamo', '-ite', '-ono / -iscono']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'] },
      { verb: 'avere', conjugation: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'] },
      { verb: 'andare', conjugation: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'] },
      { verb: 'fare', conjugation: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'] }
    ]
  },
  {
    tense: 'passato prossimo',
    description: 'Used for completed actions in the past that have a connection to the present or occurred at a specific time.',
    usage: ['Completed past actions', 'Recent past', 'Actions with a specific duration in the past'],
    examples: [
      { it: 'Ho mangiato una mela.', en: 'I ate an apple.' },
      { it: 'Sono andato a Roma l\'anno scorso.', en: 'I went to Rome last year.' }
    ],
    regularEndings: {
      are: ['avere/essere + -ato'],
      ere: ['avere/essere + -uto'],
      ire: ['avere/essere + -ito']
    },
    importantIrregulars: [
      { verb: 'essere / stare', conjugation: ['stato'] },
      { verb: 'fare', conjugation: ['fatto'] },
      { verb: 'leggere', conjugation: ['letto'] },
      { verb: 'prendere', conjugation: ['preso'] },
      { verb: 'vedere', conjugation: ['visto'] }
    ]
  },
  {
    tense: 'imperfetto',
    description: 'Used for ongoing, repeated, or habitual actions in the past, and for descriptions.',
    usage: ['Habits in the past', 'Descriptions (weather, age, time)', 'Ongoing actions interrupted by another'],
    examples: [
      { it: 'Da bambino, mangiavo molte mele.', en: 'As a child, I used to eat a lot of apples.' },
      { it: 'Faceva caldo.', en: 'It was hot.' }
    ],
    regularEndings: {
      are: ['-avo', '-avi', '-ava', '-avamo', '-avate', '-avano'],
      ere: ['-evo', '-evi', '-eva', '-evamo', '-evate', '-evano'],
      ire: ['-ivo', '-ivi', '-iva', '-ivamo', '-ivate', '-ivano']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'] },
      { verb: 'bere', conjugation: ['bevevo', 'bevevi', 'beveva', 'bevevamo', 'bevevate', 'bevevano'] },
      { verb: 'dire', conjugation: ['dicevo', 'dicevi', 'diceva', 'dicevamo', 'dicevate', 'dicevano'] },
      { verb: 'fare', conjugation: ['facevo', 'facevi', 'faceva', 'facevamo', 'facevate', 'facevano'] }
    ]
  },
  {
    tense: 'trapassato prossimo',
    description: 'Used for an action in the past that happened before another action in the past (past perfect).',
    usage: ['Action prior to another past action'],
    examples: [
      { it: 'Avevo già mangiato quando sei arrivato.', en: 'I had already eaten when you arrived.' }
    ],
    regularEndings: {
      are: ['Imperfetto (avere/essere) + -ato'],
      ere: ['Imperfetto (avere/essere) + -uto'],
      ire: ['Imperfetto (avere/essere) + -ito']
    }
  },
  {
    tense: 'futuro semplice',
    description: 'Used for actions that will happen in the future.',
    usage: ['Future plans', 'Predictions', 'Promises'],
    examples: [
      { it: 'Domani mangerò una mela.', en: 'Tomorrow I will eat an apple.' },
      { it: 'Andremo in Italia l\'anno prossimo.', en: 'We will go to Italy next year.' }
    ],
    regularEndings: {
      are: ['-erò', '-erai', '-erà', '-eremo', '-erete', '-eranno'],
      ere: ['-erò', '-erai', '-erà', '-eremo', '-erete', '-eranno'],
      ire: ['-irò', '-irai', '-irà', '-iremo', '-irete', '-iranno']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['sarò', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno'] },
      { verb: 'avere', conjugation: ['avrò', 'avrai', 'avrà', 'avremo', 'avrete', 'avranno'] },
      { verb: 'andare', conjugation: ['andrò', 'andrai', 'andrà', 'andremo', 'andrete', 'andranno'] }
    ]
  },
  {
    tense: 'futuro anteriore',
    description: 'Used for an action that will be completed before another action in the future (future perfect).',
    usage: ['Action completed before another future action', 'Suppositions about the past'],
    examples: [
      { it: 'Quando avrò finito di studiare, uscirò.', en: 'When I will have finished studying, I will go out.' },
      { it: 'Sarà andato via.', en: 'He must have gone away.' }
    ]
  },
  {
    tense: 'condizionale presente',
    description: 'Used to express possibility, wishes, requests, or actions dependent on a condition.',
    usage: ['Polite requests', 'Wishes', 'Hypothetical situations (present/future)'],
    examples: [
      { it: 'Vorrei un caffè, per favore.', en: 'I would like a coffee, please.' },
      { it: 'Mangerei una mela, se avessi fame.', en: 'I would eat an apple, if I were hungry.' }
    ],
    regularEndings: {
      are: ['-erei', '-eresti', '-erebbe', '-eremmo', '-ereste', '-erebbero'],
      ere: ['-erei', '-eresti', '-erebbe', '-eremmo', '-ereste', '-erebbero'],
      ire: ['-irei', '-iresti', '-irebbe', '-iremmo', '-ireste', '-irebbero']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['sarei', 'saresti', 'sarebbe', 'saremmo', 'sareste', 'sarebbero'] },
      { verb: 'avere', conjugation: ['avrei', 'avresti', 'avrebbe', 'avremmo', 'avreste', 'avrebbero'] }
    ]
  },
  {
    tense: 'condizionale passato',
    description: 'Used for actions that would have happened under certain conditions, or to express unfulfilled wishes.',
    usage: ['Unfulfilled conditions in the past', 'Regrets'],
    examples: [
      { it: 'Avrei mangiato la mela, ma non c\'era.', en: 'I would have eaten the apple, but it wasn\'t there.' }
    ]
  },
  {
    tense: 'congiuntivo presente',
    description: 'Used in subordinate clauses to express doubt, opinion, desire, emotion, or uncertainty in the present.',
    usage: ['Opinions (credo che, penso che)', 'Desires (voglio che)', 'Emotions (sono felice che)'],
    examples: [
      { it: 'Penso che lui mangi la mela.', en: 'I think that he is eating the apple.' },
      { it: 'Voglio che tu vada.', en: 'I want you to go.' }
    ],
    regularEndings: {
      are: ['-i', '-i', '-i', '-iamo', '-iate', '-ino'],
      ere: ['-a', '-a', '-a', '-iamo', '-iate', '-ano'],
      ire: ['-a / -isca', '-a / -isca', '-a / -isca', '-iamo', '-iate', '-ano / -iscano']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['sia', 'sia', 'sia', 'siamo', 'siate', 'siano'] },
      { verb: 'avere', conjugation: ['abbia', 'abbia', 'abbia', 'abbiamo', 'abbiate', 'abbiano'] }
    ]
  },
  {
    tense: 'congiuntivo passato',
    description: 'Used in subordinate clauses to express doubt, opinion, etc., about an action completed in the past.',
    usage: ['Past actions following present expressions of doubt/opinion'],
    examples: [
      { it: 'Penso che lui abbia mangiato la mela.', en: 'I think that he has eaten the apple.' }
    ]
  },
  {
    tense: 'congiuntivo imperfetto',
    description: 'Used in subordinate clauses when the main clause is in a past tense or conditional, or in hypothetical "if" clauses (Type 2).',
    usage: ['Past expressions of doubt/opinion', 'Hypothetical clauses (se + congiuntivo imperfetto, condizionale presente)'],
    examples: [
      { it: 'Pensavo che lui mangiasse la mela.', en: 'I thought that he was eating the apple.' },
      { it: 'Se avessi soldi, comprerei una macchina.', en: 'If I had money, I would buy a car.' }
    ],
    regularEndings: {
      are: ['-assi', '-assi', '-asse', '-assimo', '-aste', '-assero'],
      ere: ['-essi', '-essi', '-esse', '-essimo', '-este', '-essero'],
      ire: ['-issi', '-issi', '-isse', '-issimo', '-iste', '-issero']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['fossi', 'fossi', 'fosse', 'fossimo', 'foste', 'fossero'] },
      { verb: 'dare', conjugation: ['dessi', 'dessi', 'desse', 'dessimo', 'deste', 'dessero'] },
      { verb: 'stare', conjugation: ['stessi', 'stessi', 'stesse', 'stessimo', 'steste', 'stessero'] }
    ]
  },
  {
    tense: 'imperativo',
    description: 'Used to give orders, instructions, or advice.',
    usage: ['Commands', 'Instructions', 'Strong advice'],
    examples: [
      { it: 'Mangia la mela!', en: 'Eat the apple!' },
      { it: 'Andiamo!', en: 'Let\'s go!' }
    ],
    regularEndings: {
      are: ['-', '-a', '-i', '-iamo', '-ate', '-ino'],
      ere: ['-', '-i', '-a', '-iamo', '-ete', '-ano'],
      ire: ['-', '-i / -isci', '-a / -isca', '-iamo', '-ite', '-ano / -iscano']
    },
    importantIrregulars: [
      { verb: 'essere', conjugation: ['-', 'sii', 'sia', 'siamo', 'siate', 'siano'] },
      { verb: 'avere', conjugation: ['-', 'abbi', 'abbia', 'abbiamo', 'abbiate', 'abbiano'] }
    ]
  }
];

export interface VerbConjugation {
  verb: string;
  translation: string;
  regular: boolean;
  auxiliary: 'avere' | 'essere';
  conjugations: {
    [key in Tense]?: {
      [key in Pronoun]: string;
    };
  };
}

export const verbData: VerbConjugation[] = [
  {
    verb: 'mangiare',
    translation: 'to eat',
    regular: true,
    auxiliary: 'avere',
    conjugations: {
      'presente': {
        'io': 'mangio', 'tu': 'mangi', 'lui/lei': 'mangia', 'noi': 'mangiamo', 'voi': 'mangiate', 'loro': 'mangiano'
      },
      'passato prossimo': {
         'io': 'ho mangiato', 'tu': 'hai mangiato', 'lui/lei': 'ha mangiato', 'noi': 'abbiamo mangiato', 'voi': 'avete mangiato', 'loro': 'hanno mangiato'
      },
      'imperfetto': {
        'io': 'mangiavo', 'tu': 'mangiavi', 'lui/lei': 'mangiava', 'noi': 'mangiavamo', 'voi': 'mangiavate', 'loro': 'mangiavano'
      }
    }
  },
  {
    verb: 'essere',
    translation: 'to be',
    regular: false,
    auxiliary: 'essere',
    conjugations: {
      'presente': {
        'io': 'sono', 'tu': 'sei', 'lui/lei': 'è', 'noi': 'siamo', 'voi': 'siete', 'loro': 'sono'
      },
      'passato prossimo': {
         'io': 'sono stato', 'tu': 'sei stato', 'lui/lei': 'è stato', 'noi': 'siamo stati', 'voi': 'siete stati', 'loro': 'sono stati'
      },
      'imperfetto': {
        'io': 'ero', 'tu': 'eri', 'lui/lei': 'era', 'noi': 'eravamo', 'voi': 'eravate', 'loro': 'erano'
      }
    }
  },
  {
    verb: 'avere',
    translation: 'to have',
    regular: false,
    auxiliary: 'avere',
    conjugations: {
       'presente': {
        'io': 'ho', 'tu': 'hai', 'lui/lei': 'ha', 'noi': 'abbiamo', 'voi': 'avete', 'loro': 'hanno'
      },
      'passato prossimo': {
         'io': 'ho avuto', 'tu': 'hai avuto', 'lui/lei': 'ha avuto', 'noi': 'abbiamo avuto', 'voi': 'avete avuto', 'loro': 'hanno avuto'
      },
      'imperfetto': {
        'io': 'avevo', 'tu': 'avevi', 'lui/lei': 'aveva', 'noi': 'avevamo', 'voi': 'avevate', 'loro': 'avevano'
      }
    }
  },
  {
    verb: 'andare',
    translation: 'to go',
    regular: false,
    auxiliary: 'essere',
    conjugations: {
      'presente': {
        'io': 'vado', 'tu': 'vai', 'lui/lei': 'va', 'noi': 'andiamo', 'voi': 'andate', 'loro': 'vanno'
      },
      'passato prossimo': {
        'io': 'sono andato', 'tu': 'sei andato', 'lui/lei': 'è andato', 'noi': 'siamo andati', 'voi': 'siete andati', 'loro': 'sono andati'
      }
    }
  },
  {
    verb: 'fare',
    translation: 'to do / to make',
    regular: false,
    auxiliary: 'avere',
    conjugations: {
      'presente': {
        'io': 'faccio', 'tu': 'fai', 'lui/lei': 'fa', 'noi': 'facciamo', 'voi': 'fate', 'loro': 'fanno'
      }
    }
  }
];

export interface VocabItem {
  it: string;
  en: string;
  type: 'noun' | 'verb' | 'adjective' | 'preposition' | 'pronoun' | 'adverb';
  hint?: string;
}

export const vocabList: VocabItem[] = [
  { it: 'casa', en: 'house', type: 'noun' },
  { it: 'libro', en: 'book', type: 'noun' },
  { it: 'gatto', en: 'cat', type: 'noun' },
  { it: 'bello', en: 'beautiful', type: 'adjective' },
  { it: 'veloce', en: 'fast', type: 'adjective' },
  { it: 'sempre', en: 'always', type: 'adverb' },
  { it: 'mai', en: 'never', type: 'adverb' },
  { it: 'di', en: 'of / from', type: 'preposition', hint: 'Used for possession, origin' },
  { it: 'a', en: 'to / at', type: 'preposition', hint: 'Used for direction, time' },
  { it: 'da', en: 'from / by', type: 'preposition', hint: 'Used for origin, agent' },
  { it: 'in', en: 'in / into', type: 'preposition', hint: 'Used for location, transportation' },
  { it: 'con', en: 'with', type: 'preposition', hint: 'Used for company, instrument' },
  { it: 'su', en: 'on / about', type: 'preposition', hint: 'Used for location, topic' },
  { it: 'per', en: 'for / in order to', type: 'preposition', hint: 'Used for purpose, destination' },
  { it: 'tra/fra', en: 'between / among', type: 'preposition', hint: 'Used for intermediate location or time' },
  { it: 'che', en: 'who / whom / that / which', type: 'pronoun', hint: 'Invariable relative pronoun (subject or direct object)' },
  { it: 'cui', en: 'whom / which', type: 'pronoun', hint: 'Invariable relative pronoun used with prepositions' },
  { it: 'il quale', en: 'who / which', type: 'pronoun', hint: 'Variable relative pronoun (il quale, la quale, i quali, le quali)' }
];

export interface StoryBlank {
  id: string;
  verb: string;
  tense: Tense;
  pronoun: Pronoun;
  correctAnswer: string;
}

export interface Story {
  id: string;
  title: string;
  textChunks: string[];
  blanks: StoryBlank[];
}

export const stories: Story[] = [
  {
    id: '1',
    title: 'Una giornata a Roma',
    textChunks: [
      'Ieri io ',
      ' (andare) a Roma. Il sole ',
      ' (splendere) e io ',
      ' (essere) molto felice. Quando ',
      ' (arrivare) in stazione, io e il mio amico Marco ',
      ' (prendere) un caffè.'
    ],
    blanks: [
      { id: 'b1', verb: 'andare', tense: 'passato prossimo', pronoun: 'io', correctAnswer: 'sono andato' },
      { id: 'b2', verb: 'splendere', tense: 'imperfetto', pronoun: 'lui/lei', correctAnswer: 'splendeva' },
      { id: 'b3', verb: 'essere', tense: 'imperfetto', pronoun: 'io', correctAnswer: 'ero' },
      { id: 'b4', verb: 'arrivare', tense: 'passato prossimo', pronoun: 'noi', correctAnswer: 'siamo arrivati' },
      { id: 'b5', verb: 'prendere', tense: 'passato prossimo', pronoun: 'noi', correctAnswer: 'abbiamo preso' }
    ]
  }
];
