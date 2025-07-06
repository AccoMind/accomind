import React from 'react';
import LogoCard from '../components/LogoCard';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CurrentSharePrice from "@/pages/CompanyScreen/CurrentSharePrice.tsx";
import Revenue from "@/pages/CompanyScreen/Revenue.tsx";
import {MdLocationOn} from "react-icons/md";
import {TbWorldWww} from "react-icons/tb";


const CompanyInfoCard: React.FC = () => {
    return (
            <Card>
                <div className="flex justify-center">
                    <div className="py-6 px-3">
                        <LogoCard logoText="AB"/>
                    </div>
                    <div>
                        <CardHeader>
                            <CardTitle>
                                ABANS ELECTRICALS PLC
                            </CardTitle>
                            <CardDescription>
                                ABANS.N0000 · Electricals and Engineering · Since 2010
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Abans PLC is a leading Sri Lankan conglomerate, renowned for its diverse portfolio of
                            businesses
                            spanning across retail, distribution,
                            manufacturing, and services. With a strong presence in the electronics, home appliances,
                            furniture,
                            and consumer goods sectors, Abans
                            PLC is committed to delivering high-quality products and innovative solutions to its
                            customers.
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
    );
};

export default CompanyInfoCard;
