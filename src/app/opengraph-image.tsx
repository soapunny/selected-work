import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const domain = SITE.url.replace("https://", "");

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

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: "#ebeff5",
              letterSpacing: "-4px",
              lineHeight: "1",
            }}
          >
            Ethan So
          </div>
          <div style={{ fontSize: 36, color: "#a0aab9" }}>
            Full-Stack Engineer
          </div>
        </div>

        {/* Domain */}
        <div style={{ fontSize: 22, color: "#a0aab9" }}>{domain}</div>
      </div>
    ),
    { ...size },
  );
}
