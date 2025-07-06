import CompanyProfile from "@/pages/CompanyDashboard/components/CompanyProfile.tsx";
import FinancialCharts from "@/pages/CompanyDashboard/components/FinancialCharts.tsx";
import FinancialInfo from "@/pages/CompanyDashboard/components/FinancialInfo.tsx";

export default function CompanyDashboard() {

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto py-6 px-4 max-w-7xl">
                <div className="flex flex-col gap-6">
                    <CompanyProfile />
                    <FinancialCharts />
                    <FinancialInfo />
                </div>
            </div>
        </main>
    )
}