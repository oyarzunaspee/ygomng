export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { PageContext } from "vike/types"; 
import type { customPageContext } from "../+onCreatePageContext";
import { render } from "vike/abort";
import type { VolumeData, VolumeResponse } from "./types";

 
async function data(pageContext: customPageContext) {
  
  const dataUrl = `${import.meta.env.BACKEND_URL}/v1/manga?bunkoban=${pageContext.bunkoban}`

  let volumeRes: VolumeResponse
  try {
    const response = await fetch(dataUrl, pageContext.cookieHeader)
    volumeRes = (await response.json()) as VolumeResponse

    if (response.status == 200) {
      return {volumes: volumeRes.volumes as VolumeData[]}
    } else if (response.status == 401) {
      throw render(401)
    } else {
      throw render(500)
    }
     
  } catch (err: any) {
      throw render(err._pageContextAbort.abortStatusCode)
  }
}