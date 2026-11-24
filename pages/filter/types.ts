import type { VolumeData, ChapterData, PageData } from "../@edition/types";

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

export type TabType = "volumes" | "chapters" | "pages"

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
  bunkoban: boolean;
  saga: string | null;
  arc: number[] | null;
  duel: string[] | null;
  characters: string[] | null;
  page_filter: string | null;
}

export type FilterParams = {
  tab: string,
  queryString: string
}

export type ResultType = | { results: Partial<VolumeData>[] } | { results: Partial<ChapterData>[] } | { results: Partial<PageData>[] }

// export type ResultType = 
//   | {
//     tab: "volumes";
//     results: Partial<VolumeData>[];
//   }
//   | {
//     tab: "chapters";
//     results: Partial<ChapterData>[];
//   }
//   | {
//     tab: "pages";
//     results: Partial<PageData>[];
//   };