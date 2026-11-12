export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { customPageContext } from "../+onCreatePageContext";
import { render } from "vike/abort";
import type { VolumeData, VolumeResponse } from "./types";


const URL = import.meta.env.PUBLIC_ENV__BACKEND_URL

async function data(pageContext: customPageContext) {
  const dataUrl = `${URL}/v1/manga?bunkoban=${pageContext.bunkoban}`;

  const response = await fetch(dataUrl);

  if (response.status === 401) throw render(401);
  if (!response.ok) throw render(500);

  let volumeRes: VolumeResponse;

  try {
    volumeRes = await response.json() as VolumeResponse;
  } catch (err) {
    // vercel authentication
    if (err instanceof SyntaxError) {
      throw render(401);
    }

    throw err;
  }

  return { volumes: volumeRes.volumes as VolumeData[] };
}