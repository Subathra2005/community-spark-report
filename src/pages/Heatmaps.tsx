import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock,
  Filter,
  Calendar,
  BarChart3
} from "lucide-react";

const Heatmaps = () => {
  const stats = [
    {
      title: "Total Problems",
      value: "1,247",
      change: "+12%",
      icon: MapPin,
      color: "text-primary"
    },
    {
      title: "Unique Users",
      value: "892",
      change: "+8%",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Resolved",
      value: "856",
      change: "+15%",
      icon: CheckCircle,
      color: "text-status-resolved"
    },
    {
      title: "Pending",
      value: "391",
      change: "-5%",
      icon: Clock,
      color: "text-status-progress"
    }
  ];

  const recentIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Roads",
      upvotes: 23,
      status: "critical",
      location: "Main St & 5th Ave",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Broken streetlight",
      category: "Lighting",
      upvotes: 8,
      status: "pending",
      location: "Park Avenue",
      date: "5 hours ago"
    },
    {
      id: 3,
      title: "Illegal parking blocking sidewalk",
      category: "Parking",
      upvotes: 15,
      status: "assigned",
      location: "Downtown District",
      date: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "pending": return "bg-status-pending text-white";
      case "assigned": return "bg-status-assigned text-white";
      case "progress": return "bg-status-progress text-white";
      case "resolved": return "bg-status-resolved text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Community Heatmaps</h1>
          <p className="text-muted-foreground mt-2">
            Real-time view of civic issues across your community
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
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Interactive Heatmap
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-full bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map will be displayed here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Requires Supabase backend integration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Issues */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{issue.title}</h4>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.location}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{issue.date}</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{issue.upvotes} upvotes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories Chart */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Issue Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Roads", "Lighting", "Waste", "Parking", "Public Safety"].map((category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${Math.max(20, Math.random() * 80)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {Math.floor(Math.random() * 200) + 10}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmaps;