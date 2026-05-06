export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { customPageContext } from "../../+onCreatePageContext";
import { render } from "vike/abort";
import { BooksResponse, BookData } from "../../../store/types";

 
async function data(pageContext: customPageContext) {
  
  const dataUrl = `${import.meta.env.BACKEND_URL}/v1/books`

  let booksRes: BooksResponse
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    booksRes = (await response.json()) as BooksResponse

    if (response.status == 200) {
      return {books: booksRes.books as BookData[]}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
     
  } catch (err: any) {
      throw render(err._pageContextAbort.abortStatusCode)
  }
}