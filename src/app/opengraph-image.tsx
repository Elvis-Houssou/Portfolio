import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "Elvis Houssou — Développeur Full-Stack & Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/images/elvis-houssou.png"))
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0b1440 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, color: "#6b84ff", letterSpacing: 4, textTransform: "uppercase" }}>
            Portfolio
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>
            Elvis Houssou
          </div>
          <div style={{ fontSize: 36, color: "#d4d4d4", marginTop: 20 }}>
            Développeur Full-Stack & Software Engineer
          </div>
          <div style={{ fontSize: 26, color: "#a3a3a3", marginTop: 36 }}>
            Next.js · React · FastAPI · Laravel · PostgreSQL
          </div>
          <div style={{ fontSize: 24, color: "#a3a3a3", marginTop: 12 }}>
            Abidjan, Côte d&apos;Ivoire · Disponible en remote
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={340}
          height={340}
          alt=""
          style={{ borderRadius: 9999, objectFit: "cover", objectPosition: "center top", border: "6px solid #002efd" }}
        />
      </div>
    ),
    size,
  )
}
