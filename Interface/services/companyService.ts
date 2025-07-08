import http from "./BaseService";
import { CompanyByIdType, CompanyMarket, CompanyType } from "@/types/company";

export interface GoogleSearchResult {
  title: string;
  url: string;
  snippet: string;
  displayUrl: string;
}

export interface CompanyDocumentSummary {
  year: string;
  documentType: string;
  summary: string;
  keyPoints: string[];
  financialHighlights: {
    revenue?: string;
    profit?: string;
    growth?: string;
  };
}

export class CompanyService {
  private static path = "/company";

  // Existing methods
  public static getAllCompanies(q?: string) {
    return http.get<CompanyType[]>(`${CompanyService.path}/`, {
      params: { q },
    });
  }

  public static getCompany(id: string) {
    return http.get<CompanyByIdType>(`${CompanyService.path}/${id}/`);
  }

  public static getCompanyMetricsById(id: string) {
    return http.get<CompanyMarket[]>(`${CompanyService.path}/${id}/metrics`);
  }

  // New methods for enhanced company page

  // Get Google search results about the company
  public static getGoogleSearchResults(companyName: string) {
    return http.get<GoogleSearchResult[]>(
      `${CompanyService.path}/${encodeURIComponent(companyName)}/search`
    );
  }

  // Get summarized findings from past year documents
  public static getDocumentSummaries(companyName: string, years?: string[]) {
    const params = years ? `?years=${years.join(",")}` : "";
    return http.get<CompanyDocumentSummary[]>(
      `${CompanyService.path}/${encodeURIComponent(companyName)}/documents${params}`
    );
  }

  // Get recent news about the company
  public static getCompanyNews(companyName: string) {
    return http.get(
      `${CompanyService.path}/${encodeURIComponent(companyName)}/news`
    );
  }
}
