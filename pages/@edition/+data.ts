export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { PageContext } from "vike/types"; 
import type { customPageContext } from "../+onCreatePageContext";
import { render } from "vike/abort";
import type { VolumeData, VolumeResponse } from "./types";


const url = import.meta.env.PUBLIC_ENV__BACKEND_URL

 
async function data(pageContext: customPageContext) {

    const dataUrl = `${url}/v1/manga?bunkoban=${pageContext.bunkoban}`
    console.log(dataUrl)
    let volumeRes: VolumeResponse
      const response = await fetch(dataUrl)
      volumeRes = (await response.json()) as VolumeResponse
  
      if (response.status == 200) {
        return {volumes: volumeRes.volumes as VolumeData[]}
      } else if (response.status == 401) {
        throw render(401)
      } else {
        throw render(500)
      }

     
  // } catch (err: any) {
  //   console.log(err)
  //     throw render(err._pageContextAbort.abortStatusCode)
  // }
}