export { guard }
 
import { render } from "vike/abort";
import type { PageContext } from "vike/types";
 
 
async function guard(pageContext: PageContext) {

    const filter = pageContext.urlOriginal.startsWith("/filter")
    const books = pageContext.urlOriginal.startsWith("/books")
    const bunkoban = ["original", "bunkoban"].includes(pageContext.routeParams.edition)

    if (!filter && !books && !bunkoban) {
        throw render(404)
  }
}