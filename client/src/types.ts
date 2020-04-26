export type Todo = {
  id: string;
  text: string;
  complete: boolean;
};

export type Filter = '' | 'all' | 'active' | 'completed';
