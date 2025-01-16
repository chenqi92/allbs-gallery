import { Winner } from './winner';

export interface Event {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'competition' | 'exhibition' | 'workshop';
  status: 'ongoing' | 'upcoming' | 'ended';
  date: string;
  startDate?: string;
  deadline?: string;
  participantCount?: number;
  rules: Array<{
    title: string;
    description: string;
  }>;
  prizes: Array<{
    title: string;
    description: string;
  }>;
  resources?: Array<{
    title: string;
    url: string;
    type: 'download' | 'link';
  }>;
  winners?: Winner[];
}