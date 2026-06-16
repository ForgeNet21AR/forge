import type { APIContext } from "astro";
import { dispatchBuild } from "../../lib/github";

export const prerender = false;

export async function POST(context: APIContext) {
  try {
    const body = (await context.request.json()) as Record<string, string | boolean>;
    const inputs = {
      repo_url: String(body.repo_url ?? ""),
      git_ref: String(body.git_ref ?? ""),
      project_path: String(body.project_path ?? ""),
      configuration: String(body.configuration ?? ""),
      target_framework: String(body.target_framework ?? ""),
      version_override: String(body.version_override ?? ""),
      build_type: String(body.build_type ?? "both"),
      asset_include: String(body.asset_include ?? ""),
      asset_exclude: String(body.asset_exclude ?? ""),
      force_rebuild: String(Boolean(body.force_rebuild)),
    };

    const dispatch = await dispatchBuild(context, inputs);
    return Response.json({
      ...dispatch,
      submitted_inputs: inputs,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Build dispatch failed" },
      { status: 400 },
    );
  }
}
