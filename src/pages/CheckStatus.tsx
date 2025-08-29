import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MapPin,
  Calendar,
  User,
  TrendingUp,
  MessageSquare,
  Star
} from "lucide-react";

const CheckStatus = () => {
  const userStats = {
    totalReports: 12,
    resolved: 8,
    pending: 3,
    escalated: 1
  };

  const complaints = [
    {
      id: "CR001",
      title: "Pothole on Main Street",
      category: "Roads & Infrastructure", 
      status: "In Progress",
      priority: "Critical",
      dateReported: "2024-01-15",
      slaDeadline: "2024-01-22",
      progress: 75,
      currentStep: "Road repair crew scheduled",
      daysLeft: 2,
      upvotes: 23,
      canGiveFeedback: false
    },
    {
      id: "CR002", 
      title: "Broken streetlight on Park Ave",
      category: "Street Lighting",
      status: "Assigned",
      priority: "Normal", 
      dateReported: "2024-01-18",
      slaDeadline: "2024-02-01",
      progress: 25,
      currentStep: "Assigned to Electrical Department",
      daysLeft: 8,
      upvotes: 7,
      canGiveFeedback: false
    },
    {
      id: "CR003",
      title: "Illegal dumping near community center",
      category: "Waste Management",
      status: "Resolved", 
      priority: "Normal",
      dateReported: "2024-01-10",
      slaDeadline: "2024-01-24",
      progress: 100,
      currentStep: "Waste removed and area cleaned",
      daysLeft: 0,
      upvotes: 15,
      canGiveFeedback: true,
      feedback: { rating: 5, comment: "Quick resolution, thank you!" }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned": return "bg-status-assigned text-white";
      case "In Progress": return "bg-status-progress text-white";
      case "Resolved": return "bg-status-resolved text-white";
      case "Escalated": return "bg-status-escalated text-white";
      default: return "bg-status-pending text-white";
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

  const getDaysLeftColor = (days: number) => {
    if (days <= 2) return "text-destructive";
    if (days <= 5) return "text-status-progress";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Check Status</h1>
          <p className="text-muted-foreground mt-2">
            Track your reported issues and their resolution progress
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{userStats.totalReports}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-resolved">{userStats.resolved}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-progress">{userStats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{userStats.escalated}</div>
              <div className="text-sm text-muted-foreground">Escalated</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-6">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{complaint.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {complaint.id}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {complaint.dateReported}
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        {complaint.upvotes} upvotes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                      {complaint.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Category */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {complaint.category}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span>{complaint.progress}%</span>
                  </div>
                  <Progress value={complaint.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{complaint.currentStep}</p>
                </div>

                {/* SLA Timer */}
                {complaint.status !== "Resolved" && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">SLA Deadline:</span>
                      <span className="text-sm">{complaint.slaDeadline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {complaint.daysLeft > 0 ? (
                        <>
                          <AlertTriangle className={`h-4 w-4 ${getDaysLeftColor(complaint.daysLeft)}`} />
                          <span className={`text-sm font-medium ${getDaysLeftColor(complaint.daysLeft)}`}>
                            {complaint.daysLeft} days left
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-destructive">Overdue</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback Section */}
                {complaint.canGiveFeedback && !complaint.feedback && (
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">Your feedback helps us improve</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Give Feedback
                      </Button>
                    </div>
                  </div>
                )}

                {/* Existing Feedback */}
                {complaint.feedback && (
                  <div className="p-3 bg-status-resolved/10 border border-status-resolved/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < complaint.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Your Feedback</p>
                        <p className="text-sm text-muted-foreground">{complaint.feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Data State */}
        {complaints.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any issue reports. Ready to make a difference?
              </p>
              <Button asChild>
                <a href="/report">Report Your First Issue</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
