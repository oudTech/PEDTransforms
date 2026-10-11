import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const assets = Promise.all([
  readFile(join(process.cwd(), "public/logo-light.png")),
  readFile(join(process.cwd(), "src/assets/fonts/Poppins-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Poppins-SemiBold.ttf")),
]);

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const [logo, regular, semiBold] = await assets;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #ffffff 0%, #ffffff 60%, #fff1f1 100%)",
          fontFamily: "Poppins",
          borderLeft: "16px solid #bd0000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={company.name} width={287} height={84} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#bd0000",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              marginTop: 12,
              fontSize: title.length > 48 ? 56 : 66,
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#1a1a1a",
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ marginTop: 20, fontSize: 28, lineHeight: 1.4, color: "#1f1f1f", maxWidth: 960 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#bd0000" }}>
          {company.tagline}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        { name: "Poppins", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
