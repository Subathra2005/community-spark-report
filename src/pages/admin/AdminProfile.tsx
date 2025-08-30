import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIssues } from "@/contexts/IssueContext";
import { 
  User, 
  Mail, 
  Building, 
  CheckCircle, 
  LogOut,
  BarChart3,
  Calendar
} from "lucide-react";

const AdminProfile = () => {
  const { user, logout } = useAuth();
  const { getAdminIssues, getCompletedAdminIssues } = useIssues();

  const adminIssues = getAdminIssues();
  const completedIssues = getCompletedAdminIssues();
  const totalIssues = adminIssues.length + completedIssues.length;

  const feedbackIssues = completedIssues.filter(issue => issue.feedback);
  const avgRating = feedbackIssues.length > 0 
    ? feedbackIssues.reduce((sum, issue) => sum + (issue.feedback?.rating || 0), 0) / feedbackIssues.length
    : 0;

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Profile</h1>
          <p className="text-muted-foreground">
            Manage your admin account and view statistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg">{user.department}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department ID</label>
                <p className="text-lg font-mono">{user.departmentId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-lg capitalize">{user.role}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={logout}
                variant="destructive" 
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">{totalIssues}</div>
                <p className="text-sm text-muted-foreground">Total Issues Handled</p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">{completedIssues.length}</div>
                <p className="text-sm text-muted-foreground">Issues Resolved</p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{adminIssues.length}</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">{avgRating.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resolution Rate</span>
                <span className="text-sm text-muted-foreground">
                  {totalIssues > 0 ? Math.round((completedIssues.length / totalIssues) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ 
                    width: `${totalIssues > 0 ? (completedIssues.length / totalIssues) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Satisfaction</span>
                <span className="text-sm text-muted-foreground">
                  {feedbackIssues.length > 0 ? 
                    Math.round((feedbackIssues.filter(i => (i.feedback?.rating || 0) >= 4).length / feedbackIssues.length) * 100) : 0
                  }%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ 
                    width: `${feedbackIssues.length > 0 ? 
                      (feedbackIssues.filter(i => (i.feedback?.rating || 0) >= 4).length / feedbackIssues.length) * 100 : 0
                    }%` 
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {totalIssues === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activity yet. Start by accepting issues from the Issue Management page.
            </div>
          ) : (
            <div className="space-y-3">
              {[...adminIssues, ...completedIssues]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((issue) => (
                  <div key={issue.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      issue.status === 'resolved' ? 'bg-green-500' : 
                      issue.status === 'in_progress' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {issue.category} • {issue.location}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {issue.status === 'resolved' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;