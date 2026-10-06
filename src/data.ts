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
  { it: 'tempo', en: 'time', type: 'noun' },
  { it: 'persona', en: 'person', type: 'noun' },
  { it: 'anno', en: 'year', type: 'noun' },
  { it: 'giorno', en: 'day', type: 'noun' },
  { it: 'modo', en: 'way', type: 'noun' },
  { it: 'uomo', en: 'man', type: 'noun' },
  { it: 'donna', en: 'woman', type: 'noun' },
  { it: 'bambino', en: 'child', type: 'noun' },
  { it: 'mondo', en: 'world', type: 'noun' },
  { it: 'vita', en: 'life', type: 'noun' },
  { it: 'mano', en: 'hand', type: 'noun' },
  { it: 'parte', en: 'part', type: 'noun' },
  { it: 'occhio', en: 'eye', type: 'noun' },
  { it: 'posto', en: 'place', type: 'noun' },
  { it: 'lavoro', en: 'work', type: 'noun' },
  { it: 'settimana', en: 'week', type: 'noun' },
  { it: 'caso', en: 'case', type: 'noun' },
  { it: 'punto', en: 'point', type: 'noun' },
  { it: 'governo', en: 'government', type: 'noun' },
  { it: 'azienda', en: 'company', type: 'noun' },
  { it: 'numero', en: 'number', type: 'noun' },
  { it: 'gruppo', en: 'group', type: 'noun' },
  { it: 'problema', en: 'problem', type: 'noun' },
  { it: 'fatto', en: 'fact', type: 'noun' },
  { it: 'casa', en: 'house', type: 'noun' },
  { it: 'madre', en: 'mother', type: 'noun' },
  { it: 'padre', en: 'father', type: 'noun' },
  { it: 'notte', en: 'night', type: 'noun' },
  { it: 'acqua', en: 'water', type: 'noun' },
  { it: 'stanza', en: 'room', type: 'noun' },
  { it: 'amico', en: 'friend', type: 'noun' },
  { it: 'famiglia', en: 'family', type: 'noun' },
  { it: 'macchina', en: 'car', type: 'noun' },
  { it: 'storia', en: 'story', type: 'noun' },
  { it: 'mese', en: 'month', type: 'noun' },
  { it: 'nome', en: 'name', type: 'noun' },
  { it: 'ragazzo', en: 'boy', type: 'noun' },
  { it: 'ragazza', en: 'girl', type: 'noun' },
  { it: 'città', en: 'city', type: 'noun' },
  { it: 'libro', en: 'book', type: 'noun' },
  { it: 'scuola', en: 'school', type: 'noun' },
  { it: 'paese', en: 'country', type: 'noun' },
  { it: 'strada', en: 'street', type: 'noun' },
  { it: 'parola', en: 'word', type: 'noun' },
  { it: 'chiesa', en: 'church', type: 'noun' },
  { it: 'sistema', en: 'system', type: 'noun' },
  { it: 'minuto', en: 'minute', type: 'noun' },
  { it: 'ora', en: 'hour', type: 'noun' },
  { it: 'diritto', en: 'right', type: 'noun' },
  { it: 'madre', en: 'mother', type: 'noun' },
  { it: 'essere', en: 'to be', type: 'verb' },
  { it: 'avere', en: 'to have', type: 'verb' },
  { it: 'fare', en: 'to do/make', type: 'verb' },
  { it: 'dire', en: 'to say', type: 'verb' },
  { it: 'potere', en: 'to be able to', type: 'verb' },
  { it: 'volere', en: 'to want', type: 'verb' },
  { it: 'sapere', en: 'to know', type: 'verb' },
  { it: 'stare', en: 'to stay/be', type: 'verb' },
  { it: 'dovere', en: 'to have to', type: 'verb' },
  { it: 'vedere', en: 'to see', type: 'verb' },
  { it: 'andare', en: 'to go', type: 'verb' },
  { it: 'venire', en: 'to come', type: 'verb' },
  { it: 'dare', en: 'to give', type: 'verb' },
  { it: 'parlare', en: 'to speak', type: 'verb' },
  { it: 'trovare', en: 'to find', type: 'verb' },
  { it: 'sentire', en: 'to hear/feel', type: 'verb' },
  { it: 'lasciare', en: 'to leave', type: 'verb' },
  { it: 'prendere', en: 'to take', type: 'verb' },
  { it: 'guardare', en: 'to look at', type: 'verb' },
  { it: 'mettere', en: 'to put', type: 'verb' },
  { it: 'pensare', en: 'to think', type: 'verb' },
  { it: 'passare', en: 'to pass', type: 'verb' },
  { it: 'credere', en: 'to believe', type: 'verb' },
  { it: 'portare', en: 'to bring', type: 'verb' },
  { it: 'parere', en: 'to seem', type: 'verb' },
  { it: 'tornare', en: 'to return', type: 'verb' },
  { it: 'sembrare', en: 'to seem', type: 'verb' },
  { it: 'tenere', en: 'to hold', type: 'verb' },
  { it: 'capire', en: 'to understand', type: 'verb' },
  { it: 'morire', en: 'to die', type: 'verb' },
  { it: 'chiamare', en: 'to call', type: 'verb' },
  { it: 'conoscere', en: 'to know', type: 'verb' },
  { it: 'rimanere', en: 'to remain', type: 'verb' },
  { it: 'chiedere', en: 'to ask', type: 'verb' },
  { it: 'cercare', en: 'to look for', type: 'verb' },
  { it: 'entrare', en: 'to enter', type: 'verb' },
  { it: 'vivere', en: 'to live', type: 'verb' },
  { it: 'aprire', en: 'to open', type: 'verb' },
  { it: 'uscire', en: 'to go out', type: 'verb' },
  { it: 'ricordare', en: 'to remember', type: 'verb' },
  { it: 'bisognare', en: 'to need to', type: 'verb' },
  { it: 'cominciare', en: 'to begin', type: 'verb' },
  { it: 'rispondere', en: 'to answer', type: 'verb' },
  { it: 'aspettare', en: 'to wait for', type: 'verb' },
  { it: 'riuscire', en: 'to succeed', type: 'verb' },
  { it: 'chiudere', en: 'to close', type: 'verb' },
  { it: 'finire', en: 'to finish', type: 'verb' },
  { it: 'arrivare', en: 'to arrive', type: 'verb' },
  { it: 'scrivere', en: 'to write', type: 'verb' },
  { it: 'diventare', en: 'to become', type: 'verb' },
  { it: 'nuovo', en: 'new', type: 'adjective' },
  { it: 'grande', en: 'big', type: 'adjective' },
  { it: 'piccolo', en: 'small', type: 'adjective' },
  { it: 'buono', en: 'good', type: 'adjective' },
  { it: 'cattivo', en: 'bad', type: 'adjective' },
  { it: 'vero', en: 'true', type: 'adjective' },
  { it: 'falso', en: 'false', type: 'adjective' },
  { it: 'bello', en: 'beautiful', type: 'adjective' },
  { it: 'brutto', en: 'ugly', type: 'adjective' },
  { it: 'vecchio', en: 'old', type: 'adjective' },
  { it: 'giovane', en: 'young', type: 'adjective' },
  { it: 'alto', en: 'tall/high', type: 'adjective' },
  { it: 'basso', en: 'short/low', type: 'adjective' },
  { it: 'lungo', en: 'long', type: 'adjective' },
  { it: 'corto', en: 'short', type: 'adjective' },
  { it: 'facile', en: 'easy', type: 'adjective' },
  { it: 'difficile', en: 'difficult', type: 'adjective' },
  { it: 'caldo', en: 'hot', type: 'adjective' },
  { it: 'freddo', en: 'cold', type: 'adjective' },
  { it: 'chiaro', en: 'clear', type: 'adjective' },
  { it: 'scuro', en: 'dark', type: 'adjective' },
  { it: 'felice', en: 'happy', type: 'adjective' },
  { it: 'triste', en: 'sad', type: 'adjective' },
  { it: 'ricco', en: 'rich', type: 'adjective' },
  { it: 'povero', en: 'poor', type: 'adjective' },
  { it: 'forte', en: 'strong', type: 'adjective' },
  { it: 'debole', en: 'weak', type: 'adjective' },
  { it: 'veloce', en: 'fast', type: 'adjective' },
  { it: 'lento', en: 'slow', type: 'adjective' },
  { it: 'dolce', en: 'sweet', type: 'adjective' },
  { it: 'amaro', en: 'bitter', type: 'adjective' },
  { it: 'salato', en: 'salty', type: 'adjective' },
  { it: 'pulito', en: 'clean', type: 'adjective' },
  { it: 'sporco', en: 'dirty', type: 'adjective' },
  { it: 'pieno', en: 'full', type: 'adjective' },
  { it: 'vuoto', en: 'empty', type: 'adjective' },
  { it: 'sicuro', en: 'safe/sure', type: 'adjective' },
  { it: 'pericoloso', en: 'dangerous', type: 'adjective' },
  { it: 'importante', en: 'important', type: 'adjective' },
  { it: 'pronto', en: 'ready', type: 'adjective' },
  { it: 'libero', en: 'free', type: 'adjective' },
  { it: 'occupato', en: 'busy', type: 'adjective' },
  { it: 'stanco', en: 'tired', type: 'adjective' },
  { it: 'malato', en: 'sick', type: 'adjective' },
  { it: 'sano', en: 'healthy', type: 'adjective' },
  { it: 'strano', en: 'strange', type: 'adjective' },
  { it: 'normale', en: 'normal', type: 'adjective' },
  { it: 'diverso', en: 'different', type: 'adjective' },
  { it: 'uguale', en: 'same/equal', type: 'adjective' },
  { it: 'possibile', en: 'possible', type: 'adjective' },
  { it: 'corpo', en: 'body', type: 'noun' },
  { it: 'mente', en: 'mind', type: 'noun' },
  { it: 'cuore', en: 'heart', type: 'noun' },
  { it: 'anima', en: 'soul', type: 'noun' },
  { it: 'sangue', en: 'blood', type: 'noun' },
  { it: 'pelle', en: 'skin', type: 'noun' },
  { it: 'capello', en: 'hair', type: 'noun' },
  { it: 'testa', en: 'head', type: 'noun' },
  { it: 'viso', en: 'face', type: 'noun' },
  { it: 'bocca', en: 'mouth', type: 'noun' },
  { it: 'dente', en: 'tooth', type: 'noun' },
  { it: 'lingua', en: 'tongue', type: 'noun' },
  { it: 'naso', en: 'nose', type: 'noun' },
  { it: 'orecchio', en: 'ear', type: 'noun' },
  { it: 'braccio', en: 'arm', type: 'noun' },
  { it: 'gamba', en: 'leg', type: 'noun' },
  { it: 'piede', en: 'foot', type: 'noun' },
  { it: 'dito', en: 'finger/toe', type: 'noun' },
  { it: 'schiena', en: 'back', type: 'noun' },
  { it: 'stomaco', en: 'stomach', type: 'noun' },
  { it: 'aria', en: 'air', type: 'noun' },
  { it: 'fuoco', en: 'fire', type: 'noun' },
  { it: 'terra', en: 'earth/ground', type: 'noun' },
  { it: 'cielo', en: 'sky', type: 'noun' },
  { it: 'sole', en: 'sun', type: 'noun' },
  { it: 'luna', en: 'moon', type: 'noun' },
  { it: 'stella', en: 'star', type: 'noun' },
  { it: 'albero', en: 'tree', type: 'noun' },
  { it: 'fiore', en: 'flower', type: 'noun' },
  { it: 'pianta', en: 'plant', type: 'noun' },
  { it: 'erba', en: 'grass', type: 'noun' },
  { it: 'bosco', en: 'woods', type: 'noun' },
  { it: 'foresta', en: 'forest', type: 'noun' },
  { it: 'montagna', en: 'mountain', type: 'noun' },
  { it: 'collina', en: 'hill', type: 'noun' },
  { it: 'valle', en: 'valley', type: 'noun' },
  { it: 'fiume', en: 'river', type: 'noun' },
  { it: 'lago', en: 'lake', type: 'noun' },
  { it: 'mare', en: 'sea', type: 'noun' },
  { it: 'oceano', en: 'ocean', type: 'noun' },
  { it: 'animale', en: 'animal', type: 'noun' },
  { it: 'cane', en: 'dog', type: 'noun' },
  { it: 'uccello', en: 'bird', type: 'noun' },
  { it: 'pesce', en: 'fish', type: 'noun' },
  { it: 'cavallo', en: 'horse', type: 'noun' },
  { it: 'mucca', en: 'cow', type: 'noun' },
  { it: 'maiale', en: 'pig', type: 'noun' },
  { it: 'pecora', en: 'sheep', type: 'noun' },
  { it: 'pollo', en: 'chicken', type: 'noun' },
  { it: 'topo', en: 'mouse', type: 'noun' },
  { it: 'cibo', en: 'food', type: 'noun' },
  { it: 'carne', en: 'meat', type: 'noun' },
  { it: 'pesce', en: 'fish', type: 'noun' },
  { it: 'pane', en: 'bread', type: 'noun' },
  { it: 'pasta', en: 'pasta', type: 'noun' },
  { it: 'riso', en: 'rice', type: 'noun' },
  { it: 'verdura', en: 'vegetable', type: 'noun' },
  { it: 'frutta', en: 'fruit', type: 'noun' },
  { it: 'mela', en: 'apple', type: 'noun' },
  { it: 'arancia', en: 'orange', type: 'noun' },
  { it: 'latte', en: 'milk', type: 'noun' },
  { it: 'formaggio', en: 'cheese', type: 'noun' },
  { it: 'burro', en: 'butter', type: 'noun' },
  { it: 'uovo', en: 'egg', type: 'noun' },
  { it: 'zucchero', en: 'sugar', type: 'noun' },
  { it: 'sale', en: 'salt', type: 'noun' },
  { it: 'pepe', en: 'pepper', type: 'noun' },
  { it: 'olio', en: 'oil', type: 'noun' },
  { it: 'aceto', en: 'vinegar', type: 'noun' },
  { it: 'vino', en: 'wine', type: 'noun' },
  { it: 'birra', en: 'beer', type: 'noun' },
  { it: 'caffè', en: 'coffee', type: 'noun' },
  { it: 'tè', en: 'tea', type: 'noun' },
  { it: 'succo', en: 'juice', type: 'noun' },
  { it: 'colazione', en: 'breakfast', type: 'noun' },
  { it: 'pranzo', en: 'lunch', type: 'noun' },
  { it: 'cena', en: 'dinner', type: 'noun' },
  { it: 'tavolo', en: 'table', type: 'noun' },
  { it: 'sedia', en: 'chair', type: 'noun' },
  { it: 'letto', en: 'bed', type: 'noun' },
  { it: 'porta', en: 'door', type: 'noun' },
  { it: 'finestra', en: 'window', type: 'noun' },
  { it: 'muro', en: 'wall', type: 'noun' },
  { it: 'pavimento', en: 'floor', type: 'noun' },
  { it: 'tetto', en: 'roof', type: 'noun' },
  { it: 'chiave', en: 'key', type: 'noun' },
  { it: 'serratura', en: 'lock', type: 'noun' },
  { it: 'luce', en: 'light', type: 'noun' },
  { it: 'lampada', en: 'lamp', type: 'noun' },
  { it: 'specchio', en: 'mirror', type: 'noun' },
  { it: 'orologio', en: 'clock/watch', type: 'noun' },
  { it: 'telefono', en: 'phone', type: 'noun' },
  { it: 'computer', en: 'computer', type: 'noun' },
  { it: 'televisione', en: 'television', type: 'noun' },
  { it: 'radio', en: 'radio', type: 'noun' },
  { it: 'carta', en: 'paper', type: 'noun' },
  { it: 'penna', en: 'pen', type: 'noun' },
  { it: 'matita', en: 'pencil', type: 'noun' },
  { it: 'lettera', en: 'letter', type: 'noun' },
  { it: 'busta', en: 'envelope', type: 'noun' },
  { it: 'mangiare', en: 'to eat', type: 'verb' },
  { it: 'bere', en: 'to drink', type: 'verb' },
  { it: 'dormire', en: 'to sleep', type: 'verb' },
  { it: 'svegliarsi', en: 'to wake up', type: 'verb' },
  { it: 'alzarsi', en: 'to get up', type: 'verb' },
  { it: 'lavare', en: 'to wash', type: 'verb' },
  { it: 'vestirsi', en: 'to get dressed', type: 'verb' },
  { it: 'spogliarsi', en: 'to undress', type: 'verb' },
  { it: 'pulire', en: 'to clean', type: 'verb' },
  { it: 'sporcare', en: 'to dirty', type: 'verb' },
  { it: 'lavorare', en: 'to work', type: 'verb' },
  { it: 'studiare', en: 'to study', type: 'verb' },
  { it: 'imparare', en: 'to learn', type: 'verb' },
  { it: 'insegnare', en: 'to teach', type: 'verb' },
  { it: 'leggere', en: 'to read', type: 'verb' },
  { it: 'cantare', en: 'to sing', type: 'verb' },
  { it: 'ballare', en: 'to dance', type: 'verb' },
  { it: 'giocare', en: 'to play', type: 'verb' },
  { it: 'correre', en: 'to run', type: 'verb' },
  { it: 'camminare', en: 'to walk', type: 'verb' },
  { it: 'saltare', en: 'to jump', type: 'verb' },
  { it: 'nuotare', en: 'to swim', type: 'verb' },
  { it: 'volare', en: 'to fly', type: 'verb' },
  { it: 'guidare', en: 'to drive', type: 'verb' },
  { it: 'viaggiare', en: 'to travel', type: 'verb' },
  { it: 'partire', en: 'to leave/depart', type: 'verb' },
  { it: 'restare', en: 'to stay', type: 'verb' },
  { it: 'fermare', en: 'to stop', type: 'verb' },
  { it: 'muovere', en: 'to move', type: 'verb' },
  { it: 'cadere', en: 'to fall', type: 'verb' },
  { it: 'amare', en: 'to love', type: 'verb' },
  { it: 'odiare', en: 'to hate', type: 'verb' },
  { it: 'piacere', en: 'to like', type: 'verb' },
  { it: 'sperare', en: 'to hope', type: 'verb' },
  { it: 'temere', en: 'to fear', type: 'verb' },
  { it: 'ridere', en: 'to laugh', type: 'verb' },
  { it: 'sorridere', en: 'to smile', type: 'verb' },
  { it: 'piangere', en: 'to cry', type: 'verb' },
  { it: 'gridare', en: 'to shout', type: 'verb' },
  { it: 'sussurrare', en: 'to whisper', type: 'verb' },
  { it: 'ascoltare', en: 'to listen', type: 'verb' },
  { it: 'osservare', en: 'to observe', type: 'verb' },
  { it: 'toccare', en: 'to touch', type: 'verb' },
  { it: 'gustare', en: 'to taste', type: 'verb' },
  { it: 'annusare', en: 'to smell', type: 'verb' },
  { it: 'pensare', en: 'to think', type: 'verb' },
  { it: 'immaginare', en: 'to imagine', type: 'verb' },
  { it: 'creare', en: 'to create', type: 'verb' },
  { it: 'distruggere', en: 'to destroy', type: 'verb' },
  { it: 'costruire', en: 'to build', type: 'verb' },
  { it: 'oggi', en: 'today', type: 'adverb' },
  { it: 'domani', en: 'tomorrow', type: 'adverb' },
  { it: 'ieri', en: 'yesterday', type: 'adverb' },
  { it: 'adesso', en: 'now', type: 'adverb' },
  { it: 'ora', en: 'now', type: 'adverb' },
  { it: 'poi', en: 'then', type: 'adverb' },
  { it: 'dopo', en: 'after', type: 'adverb' },
  { it: 'prima', en: 'before', type: 'adverb' },
  { it: 'presto', en: 'early/soon', type: 'adverb' },
  { it: 'tardi', en: 'late', type: 'adverb' },
  { it: 'sempre', en: 'always', type: 'adverb' },
  { it: 'mai', en: 'never', type: 'adverb' },
  { it: 'spesso', en: 'often', type: 'adverb' },
  { it: 'qualche volta', en: 'sometimes', type: 'adverb' },
  { it: 'raramente', en: 'rarely', type: 'adverb' },
  { it: 'qui', en: 'here', type: 'adverb' },
  { it: 'qua', en: 'here', type: 'adverb' },
  { it: 'lì', en: 'there', type: 'adverb' },
  { it: 'là', en: 'there', type: 'adverb' },
  { it: 'vicino', en: 'near', type: 'adverb' },
  { it: 'lontano', en: 'far', type: 'adverb' },
  { it: 'su', en: 'up', type: 'adverb' },
  { it: 'giù', en: 'down', type: 'adverb' },
  { it: 'dentro', en: 'inside', type: 'adverb' },
  { it: 'fuori', en: 'outside', type: 'adverb' },
  { it: 'davanti', en: 'in front', type: 'adverb' },
  { it: 'dietro', en: 'behind', type: 'adverb' },
  { it: 'sopra', en: 'above', type: 'adverb' },
  { it: 'sotto', en: 'below', type: 'adverb' },
  { it: 'intorno', en: 'around', type: 'adverb' },
  { it: 'molto', en: 'very/much', type: 'adverb' },
  { it: 'poco', en: 'little', type: 'adverb' },
  { it: 'troppo', en: 'too much', type: 'adverb' },
  { it: 'abbastanza', en: 'enough', type: 'adverb' },
  { it: 'più', en: 'more', type: 'adverb' },
  { it: 'meno', en: 'less', type: 'adverb' },
  { it: 'bene', en: 'well', type: 'adverb' },
  { it: 'male', en: 'badly', type: 'adverb' },
  { it: 'meglio', en: 'better', type: 'adverb' },
  { it: 'peggio', en: 'worse', type: 'adverb' },
  { it: 'forse', en: 'maybe', type: 'adverb' },
  { it: 'sicuramente', en: 'surely', type: 'adverb' },
  { it: 'certamente', en: 'certainly', type: 'adverb' },
  { it: 'probabilmente', en: 'probably', type: 'adverb' },
  { it: 'ovviamente', en: 'obviously', type: 'adverb' },
  { it: 'anche', en: 'also', type: 'adverb' },
  { it: 'inoltre', en: 'furthermore', type: 'adverb' },
  { it: 'invece', en: 'instead', type: 'adverb' },
  { it: 'ancora', en: 'still/yet', type: 'adverb' },
  { it: 'già', en: 'already', type: 'adverb' },
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
