export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { customPageContext } from "../../+onCreatePageContext";
import { render } from "vike/abort";

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

type FilterType = {
  saga: string[];
  arc: Arc[];
  duel: string[];
  groups: GroupType[];
  page: PageFilters[];
}

type FilterResponse = {
  status: number;
  filters: FilterType;
}

 
async function data(pageContext: customPageContext) {
  
  const dataUrl = `${import.meta.env.BACKEND_URL}/v1/filter`

  let filterRes: FilterResponse
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    filterRes = (await response.json()) as FilterResponse

    if (response.status == 200) {
      return {filters: filterRes.filters as FilterType}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
     
  } catch (err: any) {
      throw render(err._pageContextAbort.abortStatusCode)
  }
}