import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function CurrentSharePrice() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Price</CardTitle>
                <CardDescription>Last Updated yesterday 12.32 pm</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-bold text-2xl">LKR 321.45</p>
                <p className="text-sm text-gray-500">+0.03% 📈</p>
            </CardContent>
        </Card>
    )
}