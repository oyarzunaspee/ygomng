export { data };
export type Data = Awaited<ReturnType<typeof data>>


import type { PageContext } from "vike/types";
import type { customPageContext } from "../../../+onCreatePageContext";
import { render } from "vike/abort";

import type { PageData, ChapterResponse } from "../../types";

async function data(pageContext: customPageContext) {

  const dataUrl = `${import.meta.env.PUBLIC_ENV__MANGA}/v1/manga/${pageContext.routeParams.chapter}/pages?bunkoban=${pageContext.bunkoban}`

  const response = await fetch(dataUrl, pageContext.cookieHeader)

  let chapterRes: ChapterResponse

  if (response.status === 401) throw render(401);
    if (!response.ok) throw render(500);
  
    try {
      chapterRes = await response.json() as ChapterResponse;
    } catch (err) {
      // vercel authentication
      if (err instanceof SyntaxError) {
        throw render(401);
      }
  
      throw err;
    }

    return { pages: chapterRes.pages as PageData[], maxNext: chapterRes.next_limit}

}