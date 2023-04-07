import { IAnnotation } from './annotation.model';

export interface IDoc {
  id: number;
  annotations: IAnnotation[];
  paths: string[];
}
