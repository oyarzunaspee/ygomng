export type Arc = {
  name: string;
  number: number;
}

export type PageFilters = {
  query: string;
  name: string;
}

export type CharacterType = {
  short: string;
  name: string;
  eng: string | null;
  alt: string | null;
}

export type GroupType = {
  group: (string | number)[];
  characters: CharacterType[];
}

export type FilterType = {
  saga: string[];
  arc: Arc[];
  duel: string[];
  groups: GroupType[];
  page: PageFilters[];
}

export type FilterResponse = {
  status: number;
  filters: FilterType;
}

export type FormType = {
  bunkoban: "bunkoban" | "original";
  saga: string | null;
  arc: number[] | null;
  duel: string[] | null;
  characters: string[] | null;
  page_filter: string | null;
}