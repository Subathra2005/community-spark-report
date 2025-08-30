import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useIssues } from "@/contexts/IssueContext";
import { BarChart3, CheckCircle, Clock, AlertTriangle, Star } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { issues, getAdminIssues, getCompletedAdminIssues, getUnassignedIssues } = useIssues();

  const adminIssues = getAdminIssues();
  const completedIssues = getCompletedAdminIssues();
  const unassignedIssues = getUnassignedIssues();
  const allAdminIssues = [...adminIssues, ...completedIssues];

  // Calculate statistics
  const totalSolved = completedIssues.length;
  const yetToAttend = unassignedIssues.length;
  const pending = adminIssues.length;
  const totalByAdmin = allAdminIssues.length;

  // Calculate average feedback rating
  const feedbackIssues = completedIssues.filter(issue => issue.feedback);
  const avgRating = feedbackIssues.length > 0 
    ? feedbackIssues.reduce((sum, issue) => sum + (issue.feedback?.rating || 0), 0) / feedbackIssues.length
    : 0;

  // Chart data
  const trendData = [
    { name: "Jan", solved: 12, pending: 8 },
    { name: "Feb", solved: 19, pending: 6 },
    { name: "Mar", solved: 15, pending: 10 },
    { name: "Apr", solved: 25, pending: 4 },
    { name: "May", solved: 22, pending: 7 },
    { name: "Jun", solved: totalSolved, pending: pending },
  ];

  const statusData = [
    { name: "Solved", value: totalSolved, color: "#22c55e" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Unassigned", value: yetToAttend, color: "#6b7280" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalSolved}</div>
            <p className="text-xs text-muted-foreground">
              Successfully resolved issues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yet to Attend</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{yetToAttend}</div>
            <p className="text-xs text-muted-foreground">
              Unassigned issues waiting
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Work</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pending}</div>
            <p className="text-xs text-muted-foreground">
              Issues in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Total Issues</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalByAdmin}</div>
            <p className="text-xs text-muted-foreground">
              Total issues handled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issues Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly solved vs pending issues
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="solved" fill="#22c55e" name="Solved" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Current status breakdown
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Feedback Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">
                {avgRating.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {feedbackIssues.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((feedbackIssues.filter(i => (i.feedback?.rating || 0) >= 4).length / Math.max(feedbackIssues.length, 1)) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;