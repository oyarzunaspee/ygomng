// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from "vike/types";
import { setLoading } from "../hooks/loadingState";

export async function onPageTransitionStart(pageContext: Partial<PageContextClient>) {
  setLoading(true)
  console.log("Page transition start");
  console.log("pageContext.isBackwardNavigation", pageContext.isBackwardNavigation);
}
