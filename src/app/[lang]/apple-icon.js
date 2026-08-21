import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Without this, iOS renders a screenshot of the page when someone saves the
// site to their home screen.
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
          backgroundColor: "#111827",
          color: "#fbbf24",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        LI
      </div>
    ),
    { ...size }
  );
}
