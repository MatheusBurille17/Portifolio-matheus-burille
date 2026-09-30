import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          color: "#f2f1ed",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9a9a94",
          }}
        >
          <span>Matheus Burille</span>
          <span style={{ color: "#cdff4a" }}>Brasil</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1,
              letterSpacing: -3,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Sites que fazem sua empresa parecer tão boa quanto ela realmente é.
          </div>
          <div style={{ fontSize: 28, color: "#9a9a94", display: "flex" }}>
            Websites, landing pages e experiências digitais.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#cdff4a",
              display: "flex",
            }}
          />
          <span style={{ color: "#cdff4a" }}>Disponível para novos projetos</span>
        </div>
      </div>
    ),
    size,
  );
}
