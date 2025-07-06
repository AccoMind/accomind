import React, {useState} from "react";
import CompanyInfoCard from './Components/CompanyInfoCard.tsx';
import ForecastsStats from '../../components/ForecastsStats';
import LineChartComponent from '../../components/LineChartComponent'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {MessageCircle} from "lucide-react";
import StockUpdates from "@/pages/CompanyScreen/Components/CurrentSharePrice.tsx";
import Revenue from "@/pages/CompanyScreen/Components/Revenue.tsx";
import NetIncome from "@/pages/CompanyScreen/Components/NetIncome.tsx";
import EarningsPerShare from "@/pages/CompanyScreen/Components/EarningsPerShare.tsx";

const CompanyHomeScreen: React.FC = () => {

    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat((prev) => !prev);
    };

    const stats = [
        {
            label: 'Revenue Growth',
            description:
                'In FY 2023/24, Abans PLC reported a 19.8% increase in revenue, reaching LKR 42.64 billion, up from LKR 35.60 billion in the previous year.',
        },
        {
            label: 'Gross Profit Decline',
            description:
                'Gross profit decreased by 6.0%, dropping to LKR 13.89 billion from LKR 14.77 billion in FY 2022/23.',
        },
        {
            label: 'Profit After Tax',
            description:
                'Profit after tax saw a 26.2% increase, growing from LKR 3.49 billion in 2022/23 to LKR 4.40 billion in 2023/24.',
        },
    ];

    return (
        <div className="p-6">
            <CompanyInfoCard/>
            <div className="grid grid-cols-4 gap-4 mt-2">
                <StockUpdates/>
                <Revenue/>
                <NetIncome/>
                <EarningsPerShare/>
            </div>

            <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-6 max-w-6xl">
                <ForecastsStats
                    title="Forecasts and Stats on the Company"
                    subtitle="Electricals and Engineering · Since 2010"
                    stats={stats}
                />
                <LineChartComponent/>
            </div>
            <button
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                onClick={toggleChat}
            >
                <MessageCircle className="h-6 w-6"/>
            </button>

            {/* Chat Interface */}
            {showChat && (
                <div
                    className="fixed bottom-16 right-4 w-96 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
                    <Card className="flex-1 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-bold">Chat Bot</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-4">
                            {/* Chat Messages will go here */}
                            <p className="text-gray-500 text-center">Start your conversation...</p>
                        </CardContent>
                        <div className="border-t p-4 bg-gray-100 flex items-center">
                            <Input
                                className="flex-1"
                                placeholder="Type a new message here"
                            />
                            <Button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white">
                                Send
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CompanyHomeScreen;
