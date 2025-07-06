import React, {useEffect} from 'react';
import LogoCard from '../../../components/LogoCard.tsx';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {MdLocationOn} from "react-icons/md";
import {TbWorldWww} from "react-icons/tb";
import {useParams} from "react-router-dom";
import {CompanyService} from "@/services/companyService.ts";
import {CompanyByIdType} from "@/types/company.ts";


const CompanyInfoCard: React.FC = () => {
    const [currentCompany, setCurrentCompany] = React.useState<CompanyByIdType | null>(null);

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id)
            CompanyService.getCompany(id)
                .then((response) => {
                    setCurrentCompany(response.data)
                })
    }, [id])


    return (
        (<Card>
                <div className="flex justify-center">
                    <div className="py-6 px-3">
                        <LogoCard logoText="AB"/>
                    </div>
                    <div>
                        <CardHeader>
                            <CardTitle>
                                {currentCompany?.name}
                            </CardTitle>
                            <CardDescription>
                                {currentCompany?.stock_symbol} · {currentCompany?.industry} · {currentCompany?.founded}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {currentCompany?.description}
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center gap-6">
                                <p className="flex gap-1 items-center"><MdLocationOn/> Colombo, Sri Lanka.</p>
                                <a href="https://www.abansplc.com" className="flex gap-1 items-center"><TbWorldWww/>www.abansplc.com</a>
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        )
    );
};

export default CompanyInfoCard;
