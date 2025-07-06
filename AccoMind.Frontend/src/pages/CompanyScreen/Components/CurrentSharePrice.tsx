import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ArrowUp} from "lucide-react";

export default function CurrentSharePrice() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Market Updates</CardTitle>
                <CardDescription>Last Updated yesterday 12.32 pm</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex">
                    <div className="flex-1">
                        <p>Stock Price</p>
                        <p className="font-bold text-2xl">LKR 321.45</p>
                        <p className="text-md font-bold text-green-700 flex">0.23% <ArrowUp /></p>
                    </div>
                    <div className="flex-1">
                        <p>Market Cap</p>
                        <p className="font-bold text-2xl">LKR 1.2B</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}