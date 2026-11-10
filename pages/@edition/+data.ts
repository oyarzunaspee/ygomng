export { data };
export type Data = Awaited<ReturnType<typeof data>>

import type { PageContext } from "vike/types"; 
import type { customPageContext } from "../+onCreatePageContext";
import { render } from "vike/abort";
import type { VolumeData, VolumeResponse } from "./types";


const URL = import.meta.env.PUBLIC_ENV__BACKEND_URL

 
async function data(pageContext: customPageContext) {
  const dataUrl = `${URL}/v1/manga?bunkoban=${pageContext.bunkoban}`;

  let response: Response;

  try {
    response = await fetch(dataUrl, {
      signal: pageContext.abortSignal
    });
  } catch (err) {
    console.error("Manga API request failed:", err);
    throw render(503);
  }

  if (response.status === 401) {
    throw render(401);
  }

  if (!response.ok) {
    console.error("Manga API returned:", response.status);
    throw render(500);
  }

  let volumeRes: VolumeResponse;

  try {
    volumeRes = await response.json() as VolumeResponse;
  } catch (err) {
    console.error("Invalid manga API response:", err);
    throw render(500);
  }

  return {
    volumes: volumeRes.volumes as VolumeData[]
  };
}