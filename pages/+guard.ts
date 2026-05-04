export { guard }
 
import { render } from "vike/abort";
import type { PageContext } from "vike/types";
 
 
async function guard(pageContext: PageContext) {

    if (!pageContext.urlOriginal.startsWith("/filter") && !pageContext.urlOriginal.startsWith("/books") && !["original", "bunkoban"].includes(pageContext.routeParams.edition)) {
        throw render(404)
  }
}