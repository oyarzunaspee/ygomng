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
  pageContext.fullView = pageContext.routeParams.edition || pageContext.routeParams.book ? true : false
  pageContext.bunkoban = pageContext.routeParams.edition == "bunkoban"
  pageContext.currentChapter = Number(pageContext.routeParams.chapter)
  pageContext.cookieHeader = {
    headers: {
      cookie: pageContext.headers?.cookie ?? ""
    }
  }
}