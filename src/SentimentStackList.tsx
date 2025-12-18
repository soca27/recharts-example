"use client"

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
    <div
      className={cn(
        "w-full max-w-5xl rounded-2xl bg-[#151a2b] p-8",
        className
      )}
    >
      <div className="space-y-7">
        {data.map((row) => (
          <div key={row.name} className="flex items-center gap-8">
            {/* label kiri */}
            <div className="w-56 text-4xl font-medium tracking-tight text-white/55">
              {row.name}
            </div>

            {/* pill bar */}
            <div className="h-16 w-full overflow-hidden rounded-full border border-white/10 bg-[#101426] cursor-pointer">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[row]}
                  layout="vertical"
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  barCategoryGap={0}
                  barGap={20}
                  onClick={() => console.log("Test")}
                >
                  <defs>
                    {/* Positive gradient */}
                    <linearGradient id="posGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0f2734" />
                      <stop offset="100%" stopColor="#5fb6a7" />
                    </linearGradient>

                    {/* Neutral gradient */}
                    <linearGradient id="neuGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#141a33" />
                      <stop offset="100%" stopColor="#4d78ff" />
                    </linearGradient>

                    {/* Negative gradient */}
                    <linearGradient id="negGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#241a2c" />
                      <stop offset="100%" stopColor="#d14f45" />
                    </linearGradient>
                  </defs>

                  <XAxis type="number" hide domain={[0, "dataMax"]} />
                  <YAxis type="category" dataKey="name" hide />

                  {/* Positive left edge rounded */}
                  <Bar
                    dataKey="positive"
                    stackId="s"
                    fill="url(#posGrad)"
                    stroke={"#7fe0d1"}
                    strokeWidth={3}
                    radius={[999, 0, 0, 999]}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey="positive"
                      position="center"
                      fill="#7fe0d1"
                      style={{ fontSize: 34, fontWeight: 600 }}
                    />
                  </Bar>

                  {/* Neutral middle */}
                  <Bar
                    dataKey="neutral"
                    stackId="s"
                    fill="url(#neuGrad)"
                    stroke={"#0511ED"}
                    strokeWidth={3}
                    radius={[0, 0, 0, 0]}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey="neutral"
                      position="center"
                      fill="#78a6ff"
                      style={{ fontSize: 34, fontWeight: 600 }}
                    />
                  </Bar>

                  {/* Negative rounded right edge side */}
                  <Bar
                    dataKey="negative"
                    stackId="s"
                    fill="url(#negGrad)"
                    stroke={"#ED2B05"}
                    strokeWidth={3}
                    radius={[0, 999, 999, 0]}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey="negative"
                      position="center"
                      fill="#ff7a6f"
                      style={{ fontSize: 34, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="mt-10 flex items-center justify-center gap-14 text-3xl text-white/60">
        <LegendItem label="Positive" color="#5fb6a7" />
        <LegendItem label="Netral" color="#4d78ff" />
        <LegendItem label="Negative" color="#d14f45" />
      </div>
    </div>
  )
}

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="h-9 w-9 rounded-xl"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span className="font-medium">{label}</span>
    </div>
  )
}
