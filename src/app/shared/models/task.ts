export type Task = {
  id: number;
  description: string,
  category: TASK_CATEGORIES,
  done: boolean | string;
}

export enum TASK_CATEGORIES {
  WORK = 'work',
  HOUSE = 'house',
  BUREAUCRACY = 'bureaucracy',
}
