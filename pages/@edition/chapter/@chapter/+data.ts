export { data };
export type Data = Awaited<ReturnType<typeof data>>


import type { PageContext } from "vike/types";
import type { customPageContext } from "../../../+onCreatePageContext";
import { render } from "vike/abort";

import { ChapterResponse, PageData } from "../../../../store/types";

async function data(pageContext: customPageContext) {

  const dataUrl = `${import.meta.env.BACKEND_URL}/v1/manga/${pageContext.routeParams.chapter}/pages?bunkoban=${pageContext.bunkoban}`

  let chapterRes: ChapterResponse

  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    chapterRes = (await response.json()) as ChapterResponse

    if (response.status == 200) {
      return { pages: chapterRes.pages as PageData[], maxNext: chapterRes.next_limit}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
  } catch (err: any) {
    throw render(err._pageContextAbort.abortStatusCode)
  }
}