export { data };
export type Data = Awaited<ReturnType<typeof data>>
import { render } from "vike/abort";

import type { customPageContext } from "../../+onCreatePageContext";
import type { FilterResponse, FilterType } from "../types";
import filterData from "../filterData";

async function data(pageContext: customPageContext) {

  const dataUrl = `${import.meta.env.PUBLIC_ENV__BACKEND_URL}/v1/filter`

  let filterRes: FilterResponse
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    filterRes = (await response.json()) as FilterResponse

    if (response.status == 200) {
      const fetchedData = filterRes.filters as FilterType

      const FilterData = filterData(fetchedData)

      return { filterData: FilterData }
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }

  } catch (err: any) {
    throw render(err._pageContextAbort.abortStatusCode)
  }
}