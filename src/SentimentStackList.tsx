import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { name: "Tempo", positive: 14, neutral: 10, negative: 82 },
  { name: "Kompas", positive: 47, neutral: 27, negative: 77 },
  { name: "Merdeka", positive: 50, neutral: 91, negative: 71 },
  { name: "CNN Indonesia", positive: 95, neutral: 28, negative: 42 },
]

export function SentimentStackList({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-5xl rounded-2xl bg-[#151a2b] p-8", className)}>
      <div className="space-y-7">
        {data.map((row) => (
          <Row key={row.name} row={row} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-14 text-3xl text-white/60">
        <LegendItem label="Positive" color="#5fb6a7" />
        <LegendItem label="Netral" color="#4d78ff" />
        <LegendItem label="Negative" color="#d14f45" />
      </div>
    </div>
  )
}

function Row({ row }: { row: (typeof data)[number] }) {
  const [isHovered, setIsHovered] = React.useState(false)

  const uid = React.useId()
  const posGrad = `posGrad-${uid}`
  const neuGrad = `neuGrad-${uid}`
  const negGrad = `negGrad-${uid}`
  const brighten = `brighten-${uid}`

  const handleEnter = () => setIsHovered(true)
  const handleLeave = () => setIsHovered(false)

  // ✅ normal redup, hover terang
  const baseOpacity = isHovered ? 1 : 0.55

  // ✅ kalau hover: tambah “light”
  const barStyle: React.CSSProperties = {
    opacity: baseOpacity,
    filter: isHovered ? `url(#${brighten})` : "none",
    transition: "opacity 140ms ease, filter 140ms ease",
  }

  // ✅ label: normal warna aslinya, hover putih
  const posLabel = isHovered ? "#ffffff" : "#7fe0d1"
  const neuLabel = isHovered ? "#ffffff" : "#78a6ff"
  const negLabel = isHovered ? "#ffffff" : "#ff7a6f"

  return (
    <div className="flex items-center gap-8">
      <div className="w-56 text-4xl font-medium tracking-tight text-white/55">
        {row.name}
      </div>

      <div className="h-16 w-full overflow-hidden rounded-full border border-white/10 bg-[#101426] [&_.recharts-rectangle]:cursor-pointer [&_.recharts-layer]:cursor-pointer">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[row]}
            layout="vertical"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={0}
          >
            <defs>
              <filter id={brighten}>
                <feColorMatrix
                  type="matrix"
                  values="
                    1.18 0    0    0    0
                    0    1.18 0    0    0
                    0    0    1.18 0    0
                    0    0    0    1    0
                  "
                />
              </filter>

              <linearGradient id={posGrad} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0f2734" />
                <stop offset="100%" stopColor="#5fb6a7" />
              </linearGradient>

              <linearGradient id={neuGrad} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#141a33" />
                <stop offset="100%" stopColor="#4d78ff" />
              </linearGradient>

              <linearGradient id={negGrad} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#241a2c" />
                <stop offset="100%" stopColor="#d14f45" />
              </linearGradient>
            </defs>

            <XAxis type="number" hide domain={[0, "dataMax"]} />
            <YAxis type="category" dataKey="name" hide />

            <Bar
              dataKey="positive"
              stackId="s"
              fill={`url(#${posGrad})`}
              stroke="#7fe0d1"
              strokeWidth={3}
              radius={[999, 0, 0, 999]}
              isAnimationActive={false}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={barStyle}
            >
              <LabelList
                dataKey="positive"
                position="center"
                fill={posLabel}
                style={{ fontSize: 34, fontWeight: 600, transition: "fill 140ms ease" }}
              />
            </Bar>

            <Bar
              dataKey="neutral"
              stackId="s"
              fill={`url(#${neuGrad})`}
              stroke="#0511ED"
              strokeWidth={3}
              radius={[0, 0, 0, 0]}
              isAnimationActive={false}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={barStyle}
            >
              <LabelList
                dataKey="neutral"
                position="center"
                fill={neuLabel}
                style={{ fontSize: 34, fontWeight: 600, transition: "fill 140ms ease" }}
              />
            </Bar>

            <Bar
              dataKey="negative"
              stackId="s"
              fill={`url(#${negGrad})`}
              stroke="#ED2B05"
              strokeWidth={3}
              radius={[0, 999, 999, 0]}
              isAnimationActive={false}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={barStyle}
            >
              <LabelList
                dataKey="negative"
                position="center"
                fill={negLabel}
                style={{ fontSize: 34, fontWeight: 600, transition: "fill 140ms ease" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}



function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-9 w-9 rounded-xl" style={{ backgroundColor: color }} />
      <span className="font-medium">{label}</span>
    </div>
  )
}
