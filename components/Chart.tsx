import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Job",
    color: "#fff",
  },
  mobile: {
    label: "Applicant",
    color: "#fff",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", Job: 13, Applicant: 50 },
  { month: "February", Job: 5, Applicant: 75 },
  { month: "March", Job: 15, Applicant: 80 },
  { month: "April", Job: 7, Applicant: 30 },
  { month: "May", Job: 2, Applicant: 50 },
  { month: "June", Job: 10, Applicant: 60 },
];

export default function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Job" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="Applicant" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
