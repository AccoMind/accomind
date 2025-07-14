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
  Globe,
  Newspaper,
} from "lucide-react";
import {
  CompanyService,
  LatestInfoResult,
  CompanyDocumentSummary,
} from "@/services/companyService";
import Navigation from "@/components/Navigation";

export default function CompanyPage() {
  const [companyName, setCompanyName] = useState("Commercial Bank PLC");
  const [latestInfo, setLatestInfo] = useState<LatestInfoResult[]>([]);
  const [documentSummaries, setDocumentSummaries] = useState<
    CompanyDocumentSummary[]
  >([]);
  const [infoLoading, setInfoLoading] = useState(false);
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
      await Promise.all([loadLatestInformation(), loadDocumentSummaries()]);
    } catch (err: any) {
      setError("Failed to load company data. Please try again.");
      console.error("Error loading company data:", err);
    }
  };

  const loadLatestInformation = async () => {
    setInfoLoading(true);
    try {
      const response = await CompanyService.getLatestInformation(companyName);
      setLatestInfo(response.data);
    } catch (err) {
      // For demo purposes, set mock data if API fails
      setLatestInfo([
        {
          title: `${companyName} - Latest Financial Performance Update`,
          url: `https://${companyName.toLowerCase().replace(/\s+/g, "")}.com/investor-relations`,
          snippet: `Recent financial performance shows ${companyName} maintaining strong market position with steady growth across key business segments and improved operational efficiency.`,
          displayUrl: `${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
        },
        {
          title: `${companyName} Expands Digital Banking Services`,
          url: "#",
          snippet: `${companyName} announces significant expansion of digital banking services, introducing new mobile features and enhanced customer experience platforms to meet evolving market demands.`,
          displayUrl: "banking-news.lk",
        },
        {
          title: `Market Analysis: ${companyName} Shows Strong Q4 Results`,
          url: "#",
          snippet: `Industry analysts highlight ${companyName}'s robust Q4 performance, citing improved loan growth, cost management, and strategic investments in technology infrastructure.`,
          displayUrl: "market-watch.com",
        },
        {
          title: `${companyName} Sustainability Initiative Launch`,
          url: "#",
          snippet: `${companyName} launches comprehensive sustainability program focusing on environmental responsibility, community development, and sustainable banking practices.`,
          displayUrl: "sustainability-news.lk",
        },
        {
          title: `${companyName} Leadership Changes and Strategic Direction`,
          url: "#",
          snippet: `Recent leadership appointments at ${companyName} signal renewed focus on innovation, customer-centric services, and digital transformation initiatives.`,
          displayUrl: "business-today.lk",
        },
        {
          title: `${companyName} Credit Rating and Financial Outlook`,
          url: "#",
          snippet: `Credit rating agencies maintain positive outlook for ${companyName}, citing strong capital adequacy, diversified revenue streams, and effective risk management practices.`,
          displayUrl: "rating-agency.com",
        },
      ]);
    } finally {
      setInfoLoading(false);
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
      <Navigation />
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
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Latest Information
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Summaries
            </TabsTrigger>
          </TabsList>

          {/* Latest Information Tab */}
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Latest Information about {companyName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {infoLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading latest information...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {latestInfo.map((result, index) => (
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
