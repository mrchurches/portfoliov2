import { ImageResponse } from "next/og";

export const alt = "Laureano Iglesias - Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The previous card was the profile photo at 960x562 declared as 1200x630.
// LinkedIn needs at least 1200x627 for the large card, so anything smaller
// silently degrades to the small one.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111827",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Laureano Iglesias
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#fbbf24",
              marginTop: 18,
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a8b3c5",
              marginTop: 28,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            3+ years shipping production software at startups
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["React", "Vue", "Next.js", "NestJS", "Node", "Ruby on Rails", "AWS"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#cbd5e1",
                  backgroundColor: "#2c3852",
                  borderRadius: 999,
                  padding: "8px 22px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#8794aa",
              marginTop: 32,
            }}
          >
            Buenos Aires (GMT-3) · portfolio-laureano.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
