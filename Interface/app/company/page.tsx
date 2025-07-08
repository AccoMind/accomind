"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ExternalLink,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Loader2,
  Building2,
} from "lucide-react";
import {
  CompanyService,
  GoogleSearchResult,
  CompanyDocumentSummary,
} from "@/services/companyService";

export default function CompanyPage() {
  const [companyName, setCompanyName] = useState("Commercial Bank PLC");
  const [googleResults, setGoogleResults] = useState<GoogleSearchResult[]>([]);
  const [documentSummaries, setDocumentSummaries] = useState<
    CompanyDocumentSummary[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [error, setError] = useState("");

  const companies = [
    "Commercial Bank PLC",
    "NDB Bank PLC",
    "Abans Electricals PLC",
    "Seylan Bank PLC",
    "Nations Trust Bank PLC",
  ];

  useEffect(() => {
    if (companyName) {
      loadCompanyData();
    }
  }, [companyName]);

  const loadCompanyData = async () => {
    setError("");

    try {
      // Load all data in parallel
      await Promise.all([loadGoogleSearchResults(), loadDocumentSummaries()]);
    } catch (err: any) {
      setError("Failed to load company data. Please try again.");
      console.error("Error loading company data:", err);
    }
  };

  const loadGoogleSearchResults = async () => {
    setSearchLoading(true);
    try {
      const response = await CompanyService.getGoogleSearchResults(companyName);
      setGoogleResults(response.data);
    } catch (err) {
      // For demo purposes, set mock data if API fails
      setGoogleResults([
        {
          title: `${companyName} - Official Website`,
          url: `https://${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
          snippet: `Official website of ${companyName}. Learn about our banking services, corporate information, and latest financial reports.`,
          displayUrl: `${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
        },
        {
          title: `${companyName} Annual Report 2023`,
          url: "#",
          snippet: `Latest annual report showcasing ${companyName}'s financial performance, strategic initiatives, and market position for 2023.`,
          displayUrl: "annual-reports.com",
        },
        {
          title: `${companyName} Stock Analysis - Yahoo Finance`,
          url: "#",
          snippet: `View the latest stock price, charts, and financial analysis for ${companyName} on Yahoo Finance.`,
          displayUrl: "finance.yahoo.com",
        },
        {
          title: `${companyName} Company Profile - Bloomberg`,
          url: "#",
          snippet: `Get the latest company information, business summary, and key financial metrics for ${companyName}.`,
          displayUrl: "bloomberg.com",
        },
        {
          title: `${companyName} News and Updates`,
          url: "#",
          snippet: `Latest news, press releases, and market updates related to ${companyName} and its business operations.`,
          displayUrl: "reuters.com",
        },
      ]);
    } finally {
      setSearchLoading(false);
    }
  };

  const loadDocumentSummaries = async () => {
    setDocumentsLoading(true);
    try {
      const response = await CompanyService.getDocumentSummaries(companyName);
      setDocumentSummaries(response.data);
    } catch (err) {
      // For demo purposes, set mock data if API fails
      setDocumentSummaries([
        {
          year: "2023",
          documentType: "Annual Report",
          summary: `${companyName} demonstrated strong financial performance in 2023 with significant revenue growth and improved operational efficiency. The company expanded its market presence and strengthened its competitive position.`,
          keyPoints: [
            "Revenue increased by 15.2% compared to previous year",
            "Net profit margin improved to 12.5%",
            "Successfully launched 3 new product lines",
            "Expanded operations to 2 new regions",
            "Achieved cost reduction of 8% through operational efficiency",
          ],
          financialHighlights: {
            revenue: "LKR 45.2 Billion",
            profit: "LKR 5.6 Billion",
            growth: "15.2%",
          },
        },
        {
          year: "2022",
          documentType: "Annual Report",
          summary: `In 2022, ${companyName} focused on digital transformation and customer experience enhancement while maintaining stable financial performance despite market challenges.`,
          keyPoints: [
            "Completed major digital transformation initiative",
            "Customer satisfaction improved by 18%",
            "Launched mobile banking platform",
            "Reduced operational costs by 12%",
            "Maintained market share despite economic challenges",
          ],
          financialHighlights: {
            revenue: "LKR 39.3 Billion",
            profit: "LKR 4.8 Billion",
            growth: "8.5%",
          },
        },
        {
          year: "2021",
          documentType: "Annual Report",
          summary: `Despite pandemic challenges, ${companyName} showed resilience with strategic investments in technology and maintained service quality while supporting customers through difficult times.`,
          keyPoints: [
            "Maintained service continuity during pandemic",
            "Invested LKR 2.1B in technology infrastructure",
            "Provided customer relief programs worth LKR 5.8B",
            "Strengthened risk management framework",
            "Achieved 95% customer retention rate",
          ],
          financialHighlights: {
            revenue: "LKR 36.2 Billion",
            profit: "LKR 4.2 Billion",
            growth: "3.1%",
          },
        },
      ]);
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleCompanyChange = (newCompany: string) => {
    setCompanyName(newCompany);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                Company Analysis
              </h1>
              <p className="text-gray-600">
                Comprehensive company insights and financial analysis
              </p>
            </div>

            {/* Company Selector */}
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <select
                value={companyName}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px] bg-white"
              >
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Google Search Results
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Summaries
            </TabsTrigger>
          </TabsList>

          {/* Google Search Results Tab */}
          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Google Search Results for {companyName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading search results...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {googleResults.map((result, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-1">
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                {result.title}
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </h3>
                            <p className="text-sm text-green-600 mb-2">
                              {result.displayUrl}
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {result.snippet}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Summaries Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Summaries for {companyName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documentsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading document summaries...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {documentSummaries.map((doc, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="text-blue-600 border-blue-600"
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              {doc.year}
                            </Badge>
                            <Badge variant="secondary">{doc.documentType}</Badge>
                          </div>
                        </div>

                        {/* Financial Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-900">
                                Revenue
                              </span>
                            </div>
                            <p className="text-lg font-bold text-blue-600">
                              {doc.financialHighlights.revenue}
                            </p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-900">
                                Profit
                              </span>
                            </div>
                            <p className="text-lg font-bold text-green-600">
                              {doc.financialHighlights.profit}
                            </p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <BarChart3 className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">
                                Growth
                              </span>
                            </div>
                            <p className="text-lg font-bold text-purple-600">
                              {doc.financialHighlights.growth}
                            </p>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Executive Summary
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {doc.summary}
                          </p>
                        </div>

                        {/* Key Points */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {doc.keyPoints.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
