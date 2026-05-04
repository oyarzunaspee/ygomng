import { setLoading } from "../hooks/loadingState";

export async function onPageTransitionEnd() {
  setLoading(false)
  console.log("Page transition end");
}
