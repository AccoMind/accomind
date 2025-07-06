import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {BarChart3, Info, TrendingUp} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button";
import {Bar, BarChart, LabelList, Line, LineChart, ResponsiveContainer, XAxis} from "recharts";
import {useEffect, useState} from "react";
import {formatNumber} from "@/lib/utils.ts";
import {CompanyService} from "@/services/companyService.ts";
import {useParams} from "react-router-dom";
import {CompanyMarket} from "@/types/company.ts";

export default function FinancialCharts() {
    const [timeframe, setTimeframe] = useState("5Y");
    const [companyMetrics, setCompanyMetrics] = useState<CompanyMarket[]>([])

    const {id} = useParams<{ id: string }>();

    const getYearFiltered = () => {

        const noYears = parseInt(timeframe.replace(/\s/g, ""));

        console.log(noYears)

        let startIdx = companyMetrics.length - noYears

        if (startIdx < 0)
            startIdx = 0;

        console.log(companyMetrics.length, startIdx)

        return companyMetrics.slice(startIdx)
    }

    useEffect(() => {
        if (id) {
            CompanyService.getCompanyMetricsById(id)
                .then(res => {
                    setCompanyMetrics(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [id])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                            <BarChart3 className="h-4 w-4 mr-2"/>
                            Revenue
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                            <Info className="h-3.5 w-3.5"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Total revenue generated over time</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>Last {timeframe}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={getYearFiltered()}
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year"/>
                                    {/*<YAxis />*/}
                                    <Bar dataKey="revenue" fill="url(#colorUv)">
                                        <LabelList dataKey="revenue" position="top"
                                                   formatter={(value: number) => formatNumber(value)}/>
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                        <span className="text-sm font-medium">YoY Growth</span>
                        <span className="text-sm font-medium text-green-600">+12.4%</span>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                            <LineChart className="h-4 w-4 mr-2"/>
                            Net Income
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                            <Info className="h-3.5 w-3.5"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Profit after all expenses and taxes</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>Last {timeframe}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={getYearFiltered()}
                                    margin={{top: 20, right: 30, left: 30, bottom: 5}}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year"/>
                                    {/*<YAxis />*/}
                                    <Line dataKey="net_income" type="monotone" fill="url(#colorUv)">
                                        <LabelList dataKey="net_income" position="top"
                                                   formatter={(value: number) => formatNumber(value)}/>
                                    </Line>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                        <span className="text-sm font-medium">YoY Growth</span>
                        <span className="text-sm font-medium text-green-600">+8.7%</span>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2"/>
                            Earnings Per Share
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                            <Info className="h-3.5 w-3.5"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Net income divided by outstanding shares</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>Last {timeframe}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={getYearFiltered()}
                                    margin={{top: 20, right: 30, left: 30, bottom: 5}}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year"/>
                                    {/*<YAxis />*/}
                                    <Line dataKey="earnings_per_share" type="monotone" fill="url(#colorUv)">
                                        <LabelList dataKey="earnings_per_share" position="top"
                                                   formatter={(value: number) => formatNumber(value)}/>
                                    </Line>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                        <span className="text-sm font-medium">YoY Growth</span>
                        <span className="text-sm font-medium text-green-600">+5.2%</span>
                    </CardFooter>
                </Card>
            </div>

            {/* Timeframe selector */}
            <div className="flex justify-end">
                <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
                    {["1Y", "3Y", "5Y", "10Y"].map((period) => (
                        <Button
                            key={period}
                            variant={timeframe === period ? "default" : "ghost"}
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => setTimeframe(period)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    )
}