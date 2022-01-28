export interface Board {
  id: string;
  title: string;
  description: string;
  status;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
