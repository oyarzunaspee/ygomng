export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { customPageContext } from "../../../+onCreatePageContext";
import { render } from "vike/abort";
import type { VolumeData } from "../../../../store/types";


async function data(pageContext: customPageContext) {
  
  const dataUrl = `${import.meta.env.PUBLIC_ENV__BACKEND_URL}/v1/filter/${pageContext.routeParams.tab}${pageContext.urlParsed.searchOriginal}`

  // switch (pageContext.routeParams.tab.toLowerCase()) {
  //   case "volumes":
  //     let filterRes: ResultType
  // }
  let filterRes: any
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    filterRes = (await response.json()) as any

    if (response.status == 200) {
      return {result: filterRes.result as any}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
     
  } catch (err: any) {
      throw render(err._pageContextAbort.abortStatusCode)
  }
}