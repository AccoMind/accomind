import {ArrowDownRight, ArrowUpRight} from "lucide-react";
import {MetricType} from "@/types/metric.ts";

export type MetricCardProps = {
    metric: MetricType;
}

export default function MetricCard(props: MetricCardProps) {
    return (
        <div key={props.metric.name} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
                <div className="text-sm font-medium">{props.metric.name}</div>
                <div className="text-2xl font-bold">{props.metric.value}</div>
            </div>
            <div className={`flex items-center ${props.metric.isPositive ? "text-green-600" : "text-red-600"}`}>
                {props.metric.isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                <span>{Math.abs(props.metric.change).toFixed(1)}</span>
            </div>
        </div>
    )
}