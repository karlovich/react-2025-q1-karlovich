export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
  };
  capital: string[];
  independent: boolean;
  cca3: string;
  maps: string[];
}

export interface TBD {
  TBD: string;
}
