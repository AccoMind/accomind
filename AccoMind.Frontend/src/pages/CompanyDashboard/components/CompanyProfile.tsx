import React, {useEffect} from "react";
import {CompanyByIdType} from "@/types/company.ts";
import {useParams} from "react-router-dom";
import {CompanyService} from "@/services/companyService.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    ArrowDown,
    ArrowUp,
    Calendar,
    ChevronDown,
    Download,
    ExternalLink,
    Globe,
    MapPin,
    Share2,
    Star
} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

export default function CompanyProfile() {
    const [companyData, setCompanyData] = React.useState<CompanyByIdType | null>(null);
    const [isWatchlisted, setIsWatchlisted] = React.useState(false);


    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id)
            CompanyService.getCompany(id)
                .then((response) => {
                    setCompanyData(response.data)
                })
    }, [id])

    return (
        (companyData && <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 rounded-md bg-purple-600">
                                <AvatarImage src={companyData.logo_url || "/placeholder.svg"} alt={companyData.name}/>
                                <AvatarFallback className="rounded-md text-2xl font-bold">AB</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">{companyData.name}</h1>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setIsWatchlisted(!isWatchlisted)}
                                    >
                                        <Star
                                            className={`h-5 w-5 ${isWatchlisted ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                        />
                                        <span className="sr-only">Add to watchlist</span>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{companyData.stock_symbol}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{companyData.industry}</Badge>
                                    <span>•</span>
                                    <span>Est. {companyData.founded}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-3.5 w-3.5 text-muted-foreground"/>
                                        <span>{companyData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Globe className="h-3.5 w-3.5 text-muted-foreground"/>
                                        <a
                                            href={`https://${companyData.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center"
                                        >
                                            {companyData.website}
                                            <ExternalLink className="h-3 w-3 ml-1"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:ml-auto flex flex-col md:items-end">
                            <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    LKR {companyData.market_info.stock_price.toLocaleString()}
                  </span>
                                <div
                                    className={`flex items-center ${companyData.market_info.price_change >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                    {companyData.market_info.price_change >= 0 ? <ArrowUp className="h-4 w-4"/> :
                                        <ArrowDown className="h-4 w-4"/>}
                                    <span
                                        className="font-medium">{Math.abs(companyData.market_info.price_change)}%</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                                Market Cap: LKR {companyData.market_info.market_cap}
                            </div>
                            <div className="flex gap-4 mt-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">P/E Ratio</span>
                                    <span className="font-medium">{companyData.metrics.pe_ratio}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Dividend Yield</span>
                                    <span className="font-medium">{companyData.metrics.dividend_yield}%</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Beta</span>
                                    <span className="font-medium">{companyData.metrics.beta}</span>
                                </div>
                            </div>
                            {/*div                            <div className="mt-3 flex items-center gap-2">*/}
                            {/*                                <Badge*/}
                            {/*                                    className={`${companyData.analystRating === "Buy" ? "bg-green-100 text-green-800" : companyData.analystRating === "Hold" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}*/}
                            {/*                                >*/}
                            {/*                                    {companyData.analystRating}*/}
                            {/*                                </Badge>*/}
                            {/*                                <span className="text-sm">*/}
                            {/*                    Target:{" "}*/}
                            {/*                                    <span className="font-medium">*/}
                            {/*                      {companyData.currency} {companyData.targetPrice}*/}
                            {/*                    </span>*/}
                            {/*                  </span>*/}
                            {/*                            </div>*/}
                        </div>
                    </div>

                    <Separator className="my-6"/>

                    <div className="text-sm">
                        <p>{companyData.description}</p>
                    </div>

                    <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5"/>
                            <span>Last updated: {companyData.market_info.created_at}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Share2 className="h-3.5 w-3.5 mr-1"/>
                                Share
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-7 px-2">
                                        <Download className="h-3.5 w-3.5 mr-1"/>
                                        Download
                                        <ChevronDown className="h-3.5 w-3.5 ml-1"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>PDF Report</DropdownMenuItem>
                                    <DropdownMenuItem>Excel Data</DropdownMenuItem>
                                    <DropdownMenuItem>CSV Data</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    )
}