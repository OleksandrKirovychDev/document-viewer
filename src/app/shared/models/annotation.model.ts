export interface IAnnotation {
  id: number;
  docId: number;
  page: number;
  type: 'text' | 'image';
  content: string;
  rotateDeg: number;
  coords: ICoords;
}

export type IAnnotationCreate = Omit<IAnnotation, 'id'>;

export interface ICoords {
  x: number;
  y: number;
}
