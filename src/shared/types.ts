export interface Character {
  name: string;
  gender: string;
  url: string;
  birth_year: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

export interface CharacterSearchResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
