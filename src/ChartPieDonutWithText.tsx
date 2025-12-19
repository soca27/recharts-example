import { Pie, PieChart, Cell, Label, Sector } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useMemo, useState, useCallback } from "react"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "url(#g-chrome)" },
  { browser: "safari", visitors: 200, fill: "url(#g-safari)" },
  { browser: "firefox", visitors: 187, fill: "url(#g-firefox)" },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
} satisfies ChartConfig

const TRANSITION = "all 260ms cubic-bezier(0.22, 1, 0.36, 1)"

export function ChartPieDonutWithText() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleEnter = useCallback((_data: unknown, index: number) => {
    setActiveIndex(index)
  }, [])

  const handleLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={250} height={250}>
            <defs>
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

              {/* darken halus (nggak terlalu gelap) */}
              <filter id="slice-darken">
                <feColorMatrix
                  type="matrix"
                  values="
                    0.78 0    0    0    0
                    0    0.78 0    0    0
                    0    0    0.78 0    0
                    0    0    0    1    0
                  "
                />
              </filter>
            </defs>

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />

            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              outerRadius={100}
              stroke="none"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              activeIndex={activeIndex ?? undefined}
              // ✅ hovered: keluar sedikit
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector
                  {...props}
                  outerRadius={outerRadius + 8}
                  style={{
                    transition: TRANSITION,
                    willChange: "transform, filter, opacity",
                  }}
                />
              )}
              // ✅ non-hover: sedikit masuk + agak gelap (nggak kecil banget)
              inactiveShape={
                activeIndex === null
                  ? undefined
                  : ({
                      innerRadius = 0,
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <Sector
                        {...props}
                        innerRadius={innerRadius + 3}
                        outerRadius={Math.max(innerRadius + 12, outerRadius - 4)}
                        style={{
                          filter: "url(#slice-darken)",
                          opacity: 0.92,
                          transition: TRANSITION,
                          willChange: "transform, filter, opacity",
                        }}
                      />
                    )
              }
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.browser}
                  fill={entry.fill}
                  className="cursor-pointer"
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
