import type { PageContext } from "vike/types";

type CookieType = {
  cookie: string;
}

type HeadersType = {
  headers: CookieType
}

export type customPageContext = PageContext & {
  bunkoban: boolean;
  currentChapter: number;
  cookieHeader: HeadersType;
  fullView: boolean;
}

export async function onCreatePageContext(pageContext: customPageContext) {
  pageContext.fullView = !Object.keys(pageContext.routeParams).includes("chapter")
  pageContext.bunkoban = pageContext.routeParams.edition == "bunkoban"
  pageContext.currentChapter = Number(pageContext.routeParams.chapter)
  pageContext.cookieHeader = {
    headers: {
      cookie: pageContext.headers?.cookie ?? ""
    }
  }
}