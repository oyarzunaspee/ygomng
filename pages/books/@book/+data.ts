export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { customPageContext } from "../../+onCreatePageContext";
import { render } from "vike/abort";
import { IndividualBook, BookResponse } from "../../../store/types";

 
async function data(pageContext: customPageContext) {
  
  const book_id = (pageContext as customPageContext & {_routeMatch: any})._routeMatch.routeParams.book
  const dataUrl = `${import.meta.env.BACKEND_URL}/v1/books/${book_id}`

  let booksRes: BookResponse
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    booksRes = (await response.json()) as BookResponse

    if (response.status == 200) {
      return {book: booksRes.book as IndividualBook}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
     
  } catch (err: any) {
      throw render(err._pageContextAbort.abortStatusCode)
  }
}