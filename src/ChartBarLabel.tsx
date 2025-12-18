"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20 }}
          >
            <defs>
              <linearGradient id="barGradientDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D7A7AF" stopOpacity={0.95} />
                <stop offset="55%" stopColor="#E8CED4" stopOpacity={0.75} />
                <stop offset="100%" stopColor="#F4F5F7" stopOpacity={0.95} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Bar
              dataKey="desktop"
              fill="url(#barGradientDesktop)"
              stroke="#C98792"
              strokeWidth={1}
              radius={14}
            >
              <LabelList 
                position="inside"
                offset={12}
                className="fill-destructive"
                fontSize={12}
              />
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
