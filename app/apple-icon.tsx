import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#f2f1ed",
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        MB
        <span style={{ color: "#cdff4a", marginLeft: 2, letterSpacing: 0 }}>.</span>
      </div>
    ),
    size,
  );
}
