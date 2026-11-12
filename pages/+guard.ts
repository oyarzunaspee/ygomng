export { guard }
 
import { render } from "vike/abort";
import type { PageContext } from "vike/types";
 
 
async function guard(pageContext: PageContext) {

    const filter = pageContext.urlParsed.pathnameOriginal.startsWith("/filter")
    const books = pageContext.urlParsed.pathnameOriginal.startsWith("/books")
    const bunkoban = ["original", "bunkoban"].includes(pageContext.routeParams.edition)

    if (!bunkoban) {
        throw render(404)
  }
}