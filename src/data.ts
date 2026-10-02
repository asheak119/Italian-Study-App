export type Tense = 'presente' | 'passato prossimo' | 'imperfetto' | 'trapassato prossimo' | 'futuro semplice' | 'futuro anteriore' | 'condizionale presente' | 'condizionale passato' | 'congiuntivo presente' | 'congiuntivo passato' | 'congiuntivo imperfetto' | 'imperativo';

export interface GrammarRule {
  tense: Tense;
  description: string;
  usage: string[];
  examples: { it: string; en: string }[];
}

export const grammarRules: GrammarRule[] = [
  {
    tense: 'presente',
    description: 'Used for actions happening now, regular occurrences, or sometimes future events.',
    usage: ['Current actions', 'Habits', 'General truths', 'Near future (sometimes)'],
    examples: [
      { it: 'Io mangio una mela.', en: 'I am eating an apple.' },
      { it: 'Vado a scuola ogni giorno.', en: 'I go to school every day.' }
    ]
  },
  {
    tense: 'passato prossimo',
    description: 'Used for completed actions in the past that have a connection to the present or occurred at a specific time.',
    usage: ['Completed past actions', 'Recent past', 'Actions with a specific duration in the past'],
    examples: [
      { it: 'Ho mangiato una mela.', en: 'I ate an apple.' },
      { it: 'Sono andato a Roma l\'anno scorso.', en: 'I went to Rome last year.' }
    ]
  },
  {
    tense: 'imperfetto',
    description: 'Used for ongoing, repeated, or habitual actions in the past, and for descriptions.',
    usage: ['Habits in the past', 'Descriptions (weather, age, time)', 'Ongoing actions interrupted by another'],
    examples: [
      { it: 'Da bambino, mangiavo molte mele.', en: 'As a child, I used to eat a lot of apples.' },
      { it: 'Faceva caldo.', en: 'It was hot.' }
    ]
  },
  {
    tense: 'trapassato prossimo',
    description: 'Used for an action in the past that happened before another action in the past (past perfect).',
    usage: ['Action prior to another past action'],
    examples: [
      { it: 'Avevo già mangiato quando sei arrivato.', en: 'I had already eaten when you arrived.' }
    ]
  },
  {
    tense: 'futuro semplice',
    description: 'Used for actions that will happen in the future.',
    usage: ['Future plans', 'Predictions', 'Promises'],
    examples: [
      { it: 'Domani mangerò una mela.', en: 'Tomorrow I will eat an apple.' },
      { it: 'Andremo in Italia l\'anno prossimo.', en: 'We will go to Italy next year.' }
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
    ]
  },
  {
    tense: 'imperativo',
    description: 'Used to give orders, instructions, or advice.',
    usage: ['Commands', 'Instructions', 'Strong advice'],
    examples: [
      { it: 'Mangia la mela!', en: 'Eat the apple!' },
      { it: 'Andiamo!', en: 'Let\'s go!' }
    ]
  }
];

export type Pronoun = 'io' | 'tu' | 'lui/lei' | 'noi' | 'voi' | 'loro';

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
         'io': 'sono stato/a', 'tu': 'sei stato/a', 'lui/lei': 'è stato/a', 'noi': 'siamo stati/e', 'voi': 'siete stati/e', 'loro': 'sono stati/e'
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
        'io': 'sono andato/a', 'tu': 'sei andato/a', 'lui/lei': 'è andato/a', 'noi': 'siamo andati/e', 'voi': 'siete andati/e', 'loro': 'sono andati/e'
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
