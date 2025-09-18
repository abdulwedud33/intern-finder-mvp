"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getCompanyApplications } from "@/services/applicationsService"

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"pipeline" | "table">("table")
  const { data } = useQuery({ queryKey: ["company-applications"], queryFn: getCompanyApplications })
  const applications = Array.isArray(data?.data) ? data?.data : []

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      interview: { label: "Interview", className: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
      shortlisted: { label: "Shortlisted", className: "bg-purple-100 text-purple-800 hover:bg-orange-100" },
      declined: { label: "Declined", className: "bg-red-100 text-red-800 hover:bg-red-100" },
      hired: { label: "Hired", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      interviewed: { label: "Interviewed", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.interview
  }

  const filteredApplicants = applications.filter(
    (app: any) =>
      (app.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.listing?.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Total Applicants: {applications.length}</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search Applicants"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "pipeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("pipeline")}
              className="text-xs"
            >
              Pipeline view
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="text-xs"
            >
              Table View
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Full Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Hiring Stage</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant: any) => {
              const statusConfig = getStatusBadge(applicant.stage || applicant.status || "interview")
              return (
                <TableRow key={applicant._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={applicant.user?.avatar || "/placeholder.svg"} alt={applicant.user?.name || ""} />
                        <AvatarFallback>
                          {(applicant.user?.name || "")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{applicant.user?.name || ""}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{applicant.score || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString() : ""}</TableCell>
                  <TableCell className="text-gray-600">{applicant.listing?.title || ""}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/client/applicants/${applicant._id}`}>
                        <Button className="text-teal-600" variant="outline" size="sm">
                          See Application
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Decline Application</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>View</span>
          <select className="border rounded px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Applicants per page</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            &lt;
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
