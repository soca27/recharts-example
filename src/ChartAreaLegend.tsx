"use client"

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
            <span className="relative inline-block h-3 w-8 cursor-pointer" onClick={() => console.log("Test")}>
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
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
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
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <ChartLegend content={<CustomLegendChartArea />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
