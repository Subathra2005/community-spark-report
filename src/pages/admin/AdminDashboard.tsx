import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Star
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Solved",
      value: "342",
      change: "+23",
      icon: CheckCircle,
      color: "text-status-resolved"
    },
    {
      title: "Yet to Attend",
      value: "89",
      change: "+12", 
      icon: AlertTriangle,
      color: "text-status-progress"
    },
    {
      title: "Pending Issues",
      value: "156",
      change: "-8",
      icon: Clock,
      color: "text-status-assigned"
    },
    {
      title: "My Solved",
      value: "67",
      change: "+15",
      icon: Users,
      color: "text-primary"
    }
  ];

  const recentActivity = [
    { action: "Assigned", issue: "Pothole on Main Street", time: "2 hours ago", priority: "Critical" },
    { action: "Resolved", issue: "Broken streetlight", time: "4 hours ago", priority: "Normal" },
    { action: "In Progress", issue: "Illegal parking", time: "1 day ago", priority: "Normal" },
    { action: "Assigned", issue: "Water leak complaint", time: "2 days ago", priority: "High" }
  ];

  const feedbackData = [
    { rating: 5, count: 45, percentage: 67 },
    { rating: 4, count: 15, percentage: 22 },
    { rating: 3, count: 5, percentage: 7 },
    { rating: 2, count: 2, percentage: 3 },
    { rating: 1, count: 1, percentage: 1 }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "Resolved": return "text-status-resolved";
      case "Assigned": return "text-status-assigned";
      case "In Progress": return "text-status-progress";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-status-progress text-white";
      case "Normal": return "bg-status-assigned text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Roads & Infrastructure Department Overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-accent' : 'text-destructive'}`}>
                      {stat.change} this week
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Solved vs Pending Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Trend chart will be displayed here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Requires backend data integration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </span>
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{activity.issue}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feedback Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Feedback Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackData.map((feedback) => (
                <div key={feedback.rating} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 w-20">
                    <span className="text-sm font-medium">{feedback.rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300" 
                          style={{ width: `${feedback.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">
                        {feedback.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {feedback.percentage}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-center">
                <span className="font-semibold text-accent">Average Rating: 4.5/5</span>
                <span className="text-muted-foreground ml-2">Based on 68 responses</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild>
            <a href="/admin/issues">View All Issues</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin/my-problems">My Assigned Problems</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin/completed">Completed Problems</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;