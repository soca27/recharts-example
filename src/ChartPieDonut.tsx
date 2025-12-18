"use client"

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  {
    browser: "chrome",
    visitors: 275,
    fill: "url(#g-chrome)",
  },
  {
    browser: "safari",
    visitors: 200,
    fill: "url(#g-safari)",
  },
  {
    browser: "firefox",
    visitors: 187,
    fill: "url(#g-firefox)",
  },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={250} height={250}>
            {/* Definisi gradient HARUS di dalam SVG */}
            <defs>
              {/* Arah kiri -> kanan, konsisten untuk semua slice */}
              <linearGradient
                id="g-chrome"
                x1="0"
                y1="0"
                x2="250"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#6ee7d8" stopOpacity={1} />
                <stop offset="60%" stopColor="#6ee7d8" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#1f2937" stopOpacity={0.05} />
              </linearGradient>

              <linearGradient
                id="g-safari"
                x1="0"
                y1="0"
                x2="250"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#1f2937" stopOpacity={0.15} />
              </linearGradient>

              <linearGradient
                id="g-firefox"
                x1="0"
                y1="0"
                x2="250"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#111827" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />

            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              outerRadius={100}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.browser} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
