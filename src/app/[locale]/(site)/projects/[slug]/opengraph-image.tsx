import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/content/projects/projects";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  const domain = SITE.url.replace("https://", "");

  const title = project?.title ?? "Project";
  const description = project?.description ?? "";
  const tags = project?.tags.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0c10",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
          }}
        />

        {/* Project info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px" }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 18,
                    color: "#a0aab9",
                    border: "1px solid #232730",
                    borderRadius: "8px",
                    padding: "4px 14px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              color: "#ebeff5",
              letterSpacing: "-3px",
              lineHeight: "1.05",
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                fontSize: 28,
                color: "#a0aab9",
                lineHeight: "1.5",
                maxWidth: "820px",
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 600, color: "#ebeff5" }}>
            Ethan So
          </div>
          <div style={{ fontSize: 22, color: "#a0aab9" }}>{domain}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
