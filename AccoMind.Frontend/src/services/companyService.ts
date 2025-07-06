import http from "@/http-common"
import {CompanyByIdType, CompanyMarket, CompanyType} from "@/types/company.ts";

export class CompanyService {
    private static path = "/company"

    public static getAllCompanies(q?: string) {
        return http.get<CompanyType[]>(`${CompanyService.path}/`, {
            params: { q }
        })
    }

    public static getCompany(id: string) {
        return http.get<CompanyByIdType>(`${CompanyService.path}/${id}/`)
    }

    public static getCompanyMetricsById(id: string) {
        return http.get<CompanyMarket[]>(`${CompanyService.path}/${id}/metrics`)
    }
}