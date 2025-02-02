"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Navbar from "@/components/Navbar";

// Chart data interface
interface ChartData {
  month: string;
  desktop: number;
}

// Chart configuration interface
interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Chart data
const chartData: ChartData[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

// Chart configuration for customizing the appearance and labeling
const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

// Line Chart Component
export function LineChartComponent(): JSX.Element {
  return (
    <>
      <Navbar />
      <Card>
        {/* Header Section */}
        <CardHeader>
          <CardTitle>Line Chart - Linear</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>

        {/* Chart Content Section */}
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(0, 3)} // Show short month names
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />} // Tooltip customization
              />
              <Line
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {/* Trending info */}
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          {/* Additional info */}
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default LineChartComponent;
