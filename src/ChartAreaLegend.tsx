import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { LegendProps } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
  { month: "September", desktop: 214, mobile: 140 },
  { month: "October", desktop: 214, mobile: 140 },
  { month: "November", desktop: 214, mobile: 140 },
  { month: "December", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

type LegendEntry = {
  value?: string
  dataKey?: string
  color?: string
}

function CustomLegendChartArea({ payload }: Pick<LegendProps, "payload">) {
  const items = (payload ?? []) as LegendEntry[]
  if (!items.length) return null

  return (
    <div className="flex justify-center items-center gap-6">
      {items.map((item) => {
        const key = String(item.dataKey ?? item.value ?? "")
        const config =
          (chartConfig as Record<string, { label?: string }>)[key] ?? undefined
        const label = config?.label ?? item.value ?? key
        const color = item.color ?? "currentColor"

        return (
          <div key={key} className="flex justify-center items-center gap-2">
            <span
              className="relative inline-block h-3 w-8 cursor-pointer"
              onClick={() => console.log("Test")}
            >
              <span
                className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-transparent"
                style={{ borderColor: color }}
              />
            </span>
            <span className="text-[13px] leading-none text-muted-foreground">
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function ChartAreaLegend() {
  const [hoveredKey, setHoveredKey] = React.useState<string | null>(null)

  const isHovering = hoveredKey !== null
  const isActive = (key: string) => hoveredKey === key

  return (
    <Card className="w-[418px]">
      <CardContent>
        <div className="[&_.recharts-layer]:cursor-pointer">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
              onMouseMove={(state) => {
                const key = state?.activePayload?.[0]?.dataKey
                setHoveredKey(typeof key === "string" ? key : null)
              }}
              onMouseLeave={() => setHoveredKey(null)}
              onClick={() => console.log("Test")}
            >
              <defs>
                <filter id="chart-brighten">
                  {/* 1.15-1.3 custom lighter */}
                  <feColorMatrix
                    type="matrix"
                    values="
                      1.15 0    0    0    0
                      0    1.15 0    0    0
                      0    0    1.15 0    0
                      0    0    0    1    0
                    "
                  />
                </filter>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Area
                dataKey="mobile"
                type="monotone"
                fill="var(--color-mobile)"
                stroke="var(--color-mobile)"
                stackId="a"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                // Highlight logic:
                fillOpacity={
                  !isHovering ? 0.4 : isActive("mobile") ? 0.65 : 0.18
                }
                strokeWidth={!isHovering ? 2 : isActive("mobile") ? 3 : 1.5}
                style={{
                  filter: !isHovering
                    ? "none"
                    : isActive("mobile")
                      ? "url(#chart-brighten)"
                      : "none",
                  transition: "filter 120ms ease, opacity 120ms ease",
                }}
              />

              <Area
                dataKey="desktop"
                type="monotone"
                fill="var(--color-desktop)"
                stroke="var(--color-desktop)"
                stackId="a"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                // Highlight logic:
                fillOpacity={
                  !isHovering ? 0.4 : isActive("desktop") ? 0.65 : 0.18
                }
                strokeWidth={!isHovering ? 2 : isActive("desktop") ? 3 : 1.5}
                style={{
                  filter: !isHovering
                    ? "none"
                    : isActive("desktop")
                      ? "url(#chart-brighten)"
                      : "none",
                  transition: "filter 120ms ease, opacity 120ms ease",
                }}
              />

              <ChartLegend content={<CustomLegendChartArea />} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
