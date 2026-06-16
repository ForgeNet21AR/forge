import type { APIContext } from "astro";
import { githubRequest } from "../../../lib/github";
import { getRequiredEnv } from "../../../lib/runtime";

export const prerender = false;

export async function GET(context: APIContext) {
  const tag = context.url.searchParams.get("tag") ?? "";
  const assetName = context.url.searchParams.get("name") ?? "";

  if (!tag || !assetName) {
    return new Response("Missing tag or name parameter", { status: 400 });
  }

  try {
    const repo = getRequiredEnv(context, "FORGE_GITHUB_REPO");
    
    const releaseData = await githubRequest<{ assets: Array<{ name: string; browser_download_url: string }> }>(
      context,
      `/repos/${repo}/releases/tags/${encodeURIComponent(tag)}`
    );
    
    const assetData = releaseData.assets.find((a: { name: string; browser_download_url: string }) => a.name === assetName);
    if (!assetData?.browser_download_url) {
      return new Response("Asset not found", { status: 404 });
    }

    return Response.redirect(assetData.browser_download_url, 302);
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Download failed", { status: 500 });
  }
}
