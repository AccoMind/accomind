import {Input} from "@/components/ui/input.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {FaBuilding} from "react-icons/fa";
import {RiQuestionAnswerFill} from "react-icons/ri";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUp} from "lucide-react";
import React, {useEffect} from "react";
import {CompanyService} from "@/services/companyService.ts";
import {Link} from "react-router-dom";
import {CompanyType} from "@/types/company.ts";
import {useNavigate} from "react-router-dom";

export default function LandingScreen() {
    const [search, setSearch] = React.useState("")
    const [mode, setMode] = React.useState("company")
    const [companies, setCompanies] = React.useState<CompanyType[]>([])
    const [activeIdx, setActiveIdx] = React.useState(0)

    const navigate = useNavigate();

    const fetchCompanies = () => {
        CompanyService.getAllCompanies(search)
            .then((response) => {
                setCompanies(response.data)
            })
    }

    useEffect(() => {
        if (search.length && mode === "company")
            fetchCompanies();
    }, [search]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter")
                onNavigate()

            if (e.key === "ArrowDown") {
                setActiveIdx((prev) => (prev + 1) % companies.length)
            }

            if (e.key === "ArrowUp") {
                setActiveIdx((prev) => (prev - 1) % companies.length)
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        return () => document.removeEventListener("keydown", handleKeyPress)
    }, [navigate, mode, activeIdx, companies, search]);

    const onNavigate = () => {
        if (mode === "company")
            navigate(`/company/${companies[activeIdx].id}`)
        else
            navigate(`/c`, {
                state: { message: search }
            })
    }

    return (
        <div className="flex flex-col px-48 items-center pt-72 min-h-screen">
            <h1 className="pb-8">Search for a Company or Ask Anything</h1>
            <div className="w-full rounded-md p-2 shadow-sm border border-input">
                <Input value={search} onChange={e => setSearch(e.target.value)} className="w-full outline-0"
                       type="search" placeholder={companies.length && search.length ? companies[0].name : "Search"}/>
                <div className="flex items-center justify-between gap-1">
                    <ToggleGroup value={mode} onValueChange={val => setMode(val)} className="w-fit" variant="outline"
                                 type="single">
                        <ToggleGroupItem value="company" aria-label="Toggle bold">
                            <FaBuilding/> Company
                        </ToggleGroupItem>
                        <ToggleGroupItem value="chat" aria-label="Toggle italic">
                            <RiQuestionAnswerFill/> Chat
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button
                        className="rounded-md"
                        onClick={onNavigate}
                    >
                        <ArrowUp/>
                    </Button>
                </div>
            </div>
            {mode == "company" && search.length ? companies.map((company, i) => (
                <Link key={company.id} className={`w-full rounded ${i === activeIdx ? 'bg-gray-200' : null}`}
                      to={`/company/${company.id}`}>
                    <div className="w-full text-gray-500 p-2 border-b">{company.name}</div>
                </Link>
            )) : []}
        </div>
    )
}