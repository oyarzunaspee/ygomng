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
}

export async function onCreatePageContext(pageContext: customPageContext) {
  pageContext.bunkoban = pageContext.routeParams.edition == "bunkoban"
  pageContext.currentChapter = Number(pageContext.routeParams.chapter)
  pageContext.cookieHeader = {
    headers: {
      cookie: pageContext.headers?.cookie ?? ""
    }
  }
}