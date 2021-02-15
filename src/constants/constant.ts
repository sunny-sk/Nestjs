export const SECRET = 'THISISMYSECRET';
export enum ROLE {
  User = 'user',
  Admin = 'admin',
  TALENTAQ = 'talentAquasition',
  INTERVIEWER = 'interviewer',
}

export const SCHEMA = {
  user: 'User',
  category: 'Category',
  task: 'Tasks',
};

export const LEVEL = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  MASTER: 'master',
};
export const TYPE = {
  CODESNIPPETS: 'codeSnippets',
  THEORY: 'theory',
  OPTIONAL: 'optional',
  OUTPUTBASED: 'outputBased',
};

export const PASSING_PERCENTAGE = 65;
export const NO_OF_ROUNDS = 3;

export enum PASSING_STATUS {
  Pass = 'pass',
  Fail = 'fail',
  NotEvaluated = 'notEvaluated',
}
export enum OPTIONS {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
export enum INTERVIEW_STATUS {
  Finished = 'finished',
  Goingon = 'goingon',
}

export enum INTERVIEWER_STATUS_FOR_CANDIDATE {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Pending = 'pending',
}

export const OPTIONAL_QUESTION_SAMPLE_SHEET_DUMMY = [
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'A1:A1',
    formulas: ['question'],
  },
  {
    type: 'list',
    sqref: 'B1:B1000',
    allowBlank: false,
    error: 'Invalid field entry',
    formulas: null,
  },
  {
    type: 'list',
    sqref: 'C1:C1000',
    allowBlank: false,
    error: 'Invalid field entry',
    formulas: null,
  },

  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'D1:D1',
    formulas: ['option_A'],
  },
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'E1:E1',
    formulas: ['option_B'],
  },
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'F1:F1',
    formulas: ['option_C'],
  },
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'G1:G1',
    formulas: ['option_D'],
  },
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'H1:H1',
    formulas: ['answer'],
  },
];

export const QUESTION_SAMPLE_SHEET_DUMMY = [
  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'A1:A1',
    formulas: ['question'],
  },
  {
    type: 'list',
    sqref: 'B1:B1000',
    allowBlank: false,
    error: 'Invalid field entry',
    formulas: null,
  },
  {
    type: 'list',
    sqref: 'C1:C1',
    allowBlank: false,
    error: 'Invalid field entry',
    formulas: null,
  },
  {
    type: 'list',
    sqref: 'D1:D1',
    allowBlank: false,
    error: 'Invalid field entry',
    formulas: null,
  },

  {
    type: 'custom',
    allowBlank: false,
    error: 'Invalid field entry',
    sqref: 'E1:E1',
    formulas: ['answer'],
  },
];
