import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ArrowDownRight, ArrowUpRight, BarChart4, DollarSign, Percent, TrendingUp} from "lucide-react";

export default function FinancialInfo() {

    const profitabilityMetrics = [
        { name: "Gross Margin", value: "38.2%", change: 1.2, isPositive: true },
        { name: "Operating Margin", value: "24.5%", change: 0.8, isPositive: true },
        { name: "Net Profit Margin", value: "18.7%", change: -0.3, isPositive: false },
        { name: "Return on Equity (ROE)", value: "21.4%", change: 2.1, isPositive: true },
        { name: "Return on Assets (ROA)", value: "9.8%", change: 0.5, isPositive: true },
        { name: "Return on Invested Capital", value: "15.2%", change: -0.7, isPositive: false },
    ]

    const liquidityMetrics = [
        { name: "Current Ratio", value: "2.4", change: 0.2, isPositive: true },
        { name: "Quick Ratio", value: "1.8", change: 0.1, isPositive: true },
        { name: "Cash Ratio", value: "0.9", change: -0.1, isPositive: false },
        { name: "Operating Cash Flow Ratio", value: "1.2", change: 0.3, isPositive: true },
        { name: "Cash Conversion Cycle", value: "45 days", change: -5, isPositive: true },
    ]

    const solvencyMetrics = [
        { name: "Debt-to-Equity Ratio", value: "0.68", change: -0.05, isPositive: true },
        { name: "Debt-to-Assets Ratio", value: "0.32", change: -0.02, isPositive: true },
        { name: "Interest Coverage Ratio", value: "8.5", change: 1.2, isPositive: true },
        { name: "Debt Service Coverage Ratio", value: "3.2", change: 0.4, isPositive: true },
        { name: "Equity Multiplier", value: "2.1", change: -0.1, isPositive: true },
        { name: "Long-term Debt to Equity", value: "0.45", change: -0.03, isPositive: true },
    ]

    const valuationMetrics = [
        { name: "P/E Ratio", value: "12.8", change: -1.2, isPositive: true },
        { name: "Price-to-Sales (P/S)", value: "2.4", change: 0.3, isPositive: false },
        { name: "Price-to-Book (P/B)", value: "2.7", change: 0.1, isPositive: false },
        { name: "Enterprise Value/EBITDA", value: "8.5", change: -0.7, isPositive: true },
        { name: "PEG Ratio", value: "1.2", change: -0.1, isPositive: true },
        { name: "Dividend Yield", value: "2.1%", change: 0.2, isPositive: true },
    ]
    const renderMetricCard = (metric: any) => (
        <div key={metric.name} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
                <div className="text-sm font-medium">{metric.name}</div>
                <div className="text-2xl font-bold">{metric.value}</div>
            </div>
            <div className={`flex items-center ${metric.isPositive ? "text-green-600" : "text-red-600"}`}>
                {metric.isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                <span>{Math.abs(metric.change).toFixed(1)}</span>
            </div>
        </div>
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Key Financial Metrics</CardTitle>
                <CardDescription>Comprehensive metrics to evaluate company performance</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="profitability">
                    <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="profitability" className="flex items-center">
                            <Percent className="h-4 w-4 mr-2" />
                            Profitability
                        </TabsTrigger>
                        <TabsTrigger value="liquidity" className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Liquidity
                        </TabsTrigger>
                        <TabsTrigger value="solvency" className="flex items-center">
                            <BarChart4 className="h-4 w-4 mr-2" />
                            Solvency
                        </TabsTrigger>
                        <TabsTrigger value="valuation" className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Valuation
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="profitability">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {profitabilityMetrics.map(renderMetricCard)}
                        </div>
                    </TabsContent>
                    <TabsContent value="liquidity">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {liquidityMetrics.map(renderMetricCard)}
                        </div>
                    </TabsContent>
                    <TabsContent value="solvency">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {solvencyMetrics.map(renderMetricCard)}
                        </div>
                    </TabsContent>
                    <TabsContent value="valuation">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {valuationMetrics.map(renderMetricCard)}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}