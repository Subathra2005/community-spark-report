import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";

const AdminIssueManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const issues = [
    {
      id: "CR001",
      userId: "U123",
      userName: "John Smith",
      title: "Large pothole on Main Street",
      location: "Main St & 5th Ave",
      category: "Roads & Infrastructure",
      dateReported: "2024-01-15",
      status: "Pending",
      priority: "Critical",
      upvotes: 23,
      description: "Large pothole causing vehicle damage, needs immediate attention"
    },
    {
      id: "CR002", 
      userId: "U124",
      userName: "Sarah Johnson",
      title: "Broken streetlight on Park Ave",
      location: "Park Avenue, Block 12",
      category: "Street Lighting",
      dateReported: "2024-01-18",
      status: "Assigned",
      priority: "Normal",
      upvotes: 8,
      description: "Streetlight has been out for 3 days, safety concern"
    },
    {
      id: "CR003",
      userId: "U125", 
      userName: "Mike Davis",
      title: "Illegal dumping behind community center",
      location: "Community Center Parking",
      category: "Waste Management",
      dateReported: "2024-01-20",
      status: "Pending",
      priority: "High",
      upvotes: 15,
      description: "Large pile of construction debris dumped illegally"
    },
    {
      id: "CR004",
      userId: "U126",
      userName: "Lisa Brown",
      title: "Water leak on residential street",
      location: "Oak Street, House #45",
      category: "Water & Drainage", 
      dateReported: "2024-01-22",
      status: "In Progress",
      priority: "High",
      upvotes: 12,
      description: "Water main leak causing flooding on sidewalk"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-status-pending text-white";
      case "Assigned": return "bg-status-assigned text-white";
      case "In Progress": return "bg-status-progress text-white";
      case "Resolved": return "bg-status-resolved text-white";
      case "Escalated": return "bg-status-escalated text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-destructive";
      case "High": return "text-status-progress";
      case "Normal": return "text-status-assigned";
      default: return "text-muted-foreground";
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Issue Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and assign community-reported issues
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by issue, location, or user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Filter */}
              <div className="w-48">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Issues ({filteredIssues.length})</span>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Showing unassigned and assigned issues
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {issue.title}
                          </h3>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {issue.userId} - {issue.userName}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {issue.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {issue.dateReported}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-sm font-medium">{issue.upvotes} upvotes</div>
                          <div className="text-xs text-muted-foreground">{issue.category}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {issue.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {issue.priority === "Critical" && (
                          <div className="flex items-center space-x-1 text-destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">SLA: 7 days</span>
                          </div>
                        )}
                        {issue.priority !== "Critical" && (
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">SLA: 14 days</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        {issue.status === "Pending" && (
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept Issue
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Issues Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminIssueManagement;