import { Patient } from './patient.types';

export type Review = {
  author: Patient;
  text: string;
  rating: number;
};
