export interface Participant {
  id: string;
  number: number;
  name: string;
  team: string;
  category: string;
  status: 'registered' | 'ready' | 'completed';
}

export interface Result {
  participantId: string;
  participantName: string;
  participantNumber: number;
  team: string;
  score: number;
  place: number;
  category: string;
}

export interface TeamStanding {
  team: string;
  score: number;
  place: number;
}
