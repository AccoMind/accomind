import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, ResponsiveContainer, XAxis} from "recharts";

export default function NetIncome() {
    // fake data for the last five years.
    const data = [
        {year: 2020, revenue: 310.32},
        {year: 2021, revenue: 301.22},
        {year: 2022, revenue: 321.33},
        {year: 2023, revenue: 345.66},
        {year: 2024, revenue: 321.45},
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Net Income</CardTitle>
                <CardDescription>Last 5 Years</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={data}>
                        <Bar type="monotone" dataKey="revenue" stroke="black"/>
                        <XAxis scale="auto" dataKey="year"/>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}