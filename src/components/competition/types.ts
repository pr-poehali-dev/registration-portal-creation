export interface Participant {
  id: string;
  number: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthYear: number;
  gender: 'М' | 'Ж';
  team: string;
  category: string;
  disciplines: string[];
  status: 'registered' | 'briefed' | 'competing' | 'completed';
  instructed: boolean;
}

export interface Judge {
  id: string;
  name: string;
  role: string;
  category: string;
  certification: string;
}

export interface Result {
  participantId: string;
  participantNumber: number;
  participantName: string;
  team: string;
  category: string;
  discipline: string;
  result: number;
  units: string;
  place: number;
  points: number;
}

export interface TeamStanding {
  team: string;
  points: number;
  place: number;
}

export interface PersonalStanding {
  id: string;
  name: string;
  team: string;
  category: string;
  totalPoints: number;
  number: number;
  place: number;
}
