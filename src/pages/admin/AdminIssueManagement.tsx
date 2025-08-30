import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useIssues } from "@/contexts/IssueContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  MapPin, 
  User, 
  Eye, 
  CheckCircle,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminIssueManagement = () => {
  const { user } = useAuth();
  const { getUnassignedIssues, updateIssue } = useIssues();
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const unassignedIssues = getUnassignedIssues();

  const handleAcceptIssue = (issueId: string) => {
    if (!user) return;

    updateIssue(issueId, {
      status: "assigned",
      assignedTo: user.id,
      assignedAdminName: user.name,
    });

    toast({
      title: "Issue Accepted",
      description: "You have successfully accepted this issue.",
    });

    setSelectedIssue(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-500";
      case "assigned": return "bg-blue-500";
      case "in_progress": return "bg-orange-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Issue Management</h1>
          <p className="text-muted-foreground">
            Manage unassigned issues in your department
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{unassignedIssues.length}</p>
                <p className="text-sm text-muted-foreground">Unassigned Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {unassignedIssues.filter(i => i.upvotes.length >= 20).length}
                </p>
                <p className="text-sm text-muted-foreground">Critical (20+ upvotes)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {unassignedIssues.filter(i => new Date(i.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-sm text-muted-foreground">Due This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>Unassigned Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {unassignedIssues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No unassigned issues found.
            </div>
          ) : (
            <div className="space-y-4">
              {unassignedIssues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{issue.category}</Badge>
                        {issue.upvotes.length >= 20 && (
                          <Badge variant="destructive">CRITICAL</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {issue.upvotes.length} upvotes
                        </span>
                      </div>
                      
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {issue.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {issue.userName}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {issue.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(issue.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Issue Details</DialogTitle>
                        </DialogHeader>
                        {selectedIssue && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={getStatusColor(selectedIssue.status)}>
                                {selectedIssue.status.replace("_", " ").toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{selectedIssue.category}</Badge>
                              {selectedIssue.upvotes.length >= 20 && (
                                <Badge variant="destructive">CRITICAL</Badge>
                              )}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{selectedIssue.title}</h3>
                              <p className="text-muted-foreground mb-4">{selectedIssue.description}</p>
                            </div>

                            {selectedIssue.photo && (
                              <div>
                                <label className="font-medium">Attached Photo:</label>
                                <img 
                                  src={selectedIssue.photo} 
                                  alt="Issue photo" 
                                  className="mt-2 rounded-lg max-w-full h-auto border"
                                />
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <label className="font-medium">Reporter:</label>
                                <p className="text-muted-foreground">{selectedIssue.userName}</p>
                              </div>
                              <div>
                                <label className="font-medium">Location:</label>
                                <p className="text-muted-foreground">{selectedIssue.location}</p>
                              </div>
                              <div>
                                <label className="font-medium">Date Reported:</label>
                                <p className="text-muted-foreground">{formatDate(selectedIssue.createdAt)}</p>
                              </div>
                              <div>
                                <label className="font-medium">Deadline:</label>
                                <p className="text-muted-foreground">{formatDate(selectedIssue.deadline)}</p>
                              </div>
                              <div>
                                <label className="font-medium">Community Upvotes:</label>
                                <p className="text-muted-foreground">{selectedIssue.upvotes.length}</p>
                              </div>
                              <div>
                                <label className="font-medium">Priority:</label>
                                <p className={`font-medium ${selectedIssue.upvotes.length >= 20 ? 'text-red-600' : 'text-green-600'}`}>
                                  {selectedIssue.upvotes.length >= 20 ? 'High (7 days)' : 'Normal (14 days)'}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={() => handleAcceptIssue(selectedIssue.id)}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept Issue
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

export default AdminIssueManagement;