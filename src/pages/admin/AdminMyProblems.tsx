import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useIssues } from "@/contexts/IssueContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  MapPin, 
  User, 
  Eye, 
  Save,
  CheckCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminMyProblems = () => {
  const { user } = useAuth();
  const { getAdminIssues, updateIssue } = useIssues();
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [progress, setProgress] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const adminIssues = getAdminIssues();

  const handleProgressUpdate = () => {
    if (!selectedIssue) return;

    const allStepsCompleted = progress.step1 && progress.step2 && progress.step3;
    const newStatus = allStepsCompleted ? "resolved" : "in_progress";

    updateIssue(selectedIssue.id, {
      progress,
      status: newStatus,
    });

    toast({
      title: allStepsCompleted ? "Issue Resolved" : "Progress Updated",
      description: allStepsCompleted 
        ? "The issue has been marked as resolved."
        : "Progress has been saved successfully.",
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

  const openIssueDialog = (issue: any) => {
    setSelectedIssue(issue);
    setProgress(issue.progress || { step1: false, step2: false, step3: false });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Problems</h1>
          <p className="text-muted-foreground">
            Issues assigned to you
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {adminIssues.filter(i => i.status === "assigned").length}
                </p>
                <p className="text-sm text-muted-foreground">Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {adminIssues.filter(i => i.status === "in_progress").length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {adminIssues.filter(i => new Date(i.deadline) < new Date()).length}
                </p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {adminIssues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No issues assigned to you yet.
            </div>
          ) : (
            <div className="space-y-4">
              {adminIssues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{issue.category}</Badge>
                        {new Date(issue.deadline) < new Date() && (
                          <Badge variant="destructive">OVERDUE</Badge>
                        )}
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
                          Deadline: {formatDate(issue.deadline)}
                        </div>
                      </div>

                      {/* Progress Indicators */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Progress:</span>
                        <div className="flex gap-1">
                          <div className={`w-2 h-2 rounded-full ${issue.progress?.step1 ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div className={`w-2 h-2 rounded-full ${issue.progress?.step2 ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div className={`w-2 h-2 rounded-full ${issue.progress?.step3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openIssueDialog(issue)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Update Progress
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Update Progress</DialogTitle>
                        </DialogHeader>
                        {selectedIssue && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={getStatusColor(selectedIssue.status)}>
                                {selectedIssue.status.replace("_", " ").toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{selectedIssue.category}</Badge>
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
                                <label className="font-medium">Deadline:</label>
                                <p className="text-muted-foreground">{formatDate(selectedIssue.deadline)}</p>
                              </div>
                            </div>

                            {/* Progress Update Section */}
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-4">Update Progress Steps:</h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    id="step1"
                                    checked={progress.step1}
                                    onCheckedChange={(checked) => 
                                      setProgress(prev => ({ ...prev, step1: !!checked }))
                                    }
                                  />
                                  <label htmlFor="step1" className="text-sm">
                                    Step 1: Initial assessment and planning completed
                                  </label>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    id="step2"
                                    checked={progress.step2}
                                    onCheckedChange={(checked) => 
                                      setProgress(prev => ({ ...prev, step2: !!checked }))
                                    }
                                  />
                                  <label htmlFor="step2" className="text-sm">
                                    Step 2: Work in progress and materials arranged
                                  </label>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    id="step3"
                                    checked={progress.step3}
                                    onCheckedChange={(checked) => 
                                      setProgress(prev => ({ ...prev, step3: !!checked }))
                                    }
                                  />
                                  <label htmlFor="step3" className="text-sm">
                                    Step 3: Work completed and verified
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={handleProgressUpdate}
                                className="flex-1"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Progress
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

export default AdminMyProblems;