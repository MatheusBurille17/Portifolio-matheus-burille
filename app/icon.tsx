import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.08em",
        }}
      >
        MB
        <span style={{ color: "#cdff4a", marginLeft: 1, letterSpacing: 0 }}>.</span>
      </div>
    ),
    size,
  );
}
