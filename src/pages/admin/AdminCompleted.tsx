import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useIssues } from "@/contexts/IssueContext";
import { 
  Calendar, 
  MapPin, 
  User, 
  Eye, 
  Star
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminCompleted = () => {
  const { user } = useAuth();
  const { getCompletedAdminIssues } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const completedIssues = getCompletedAdminIssues();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const avgRating = completedIssues.filter(i => i.feedback).length > 0
    ? completedIssues
        .filter(i => i.feedback)
        .reduce((sum, i) => sum + (i.feedback?.rating || 0), 0) / 
      completedIssues.filter(i => i.feedback).length
    : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Completed Problems</h1>
          <p className="text-muted-foreground">
            Issues you have successfully resolved
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{completedIssues.length}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-lg font-bold">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {completedIssues.filter(i => i.feedback).length}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">With Feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {Math.round((completedIssues.filter(i => i.feedback && i.feedback.rating >= 4).length / Math.max(completedIssues.length, 1)) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {completedIssues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No completed issues yet.
            </div>
          ) : (
            <div className="space-y-4">
              {completedIssues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-green-500">RESOLVED</Badge>
                        <Badge variant="outline">{issue.category}</Badge>
                        {issue.feedback && (
                          <div className="flex items-center gap-1">
                            {renderStars(issue.feedback.rating)}
                          </div>
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
                          Completed: {formatDate(issue.createdAt)}
                        </div>
                      </div>

                      {issue.feedback && (
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">User Feedback:</p>
                          <p className="text-sm text-muted-foreground">"{issue.feedback.comment}"</p>
                        </div>
                      )}
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
                          <DialogTitle>Completed Issue Details</DialogTitle>
                        </DialogHeader>
                        {selectedIssue && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className="bg-green-500">RESOLVED</Badge>
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
                                <label className="font-medium">Date Reported:</label>
                                <p className="text-muted-foreground">{formatDate(selectedIssue.createdAt)}</p>
                              </div>
                              <div>
                                <label className="font-medium">Deadline:</label>
                                <p className="text-muted-foreground">{formatDate(selectedIssue.deadline)}</p>
                              </div>
                            </div>

                            {/* Progress Indicators */}
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3">Completion Progress:</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                                  <span className="text-sm">Initial assessment and planning completed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                                  <span className="text-sm">Work in progress and materials arranged</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                                  <span className="text-sm">Work completed and verified</span>
                                </div>
                              </div>
                            </div>

                            {/* User Feedback */}
                            {selectedIssue.feedback && (
                              <div className="border-t pt-4">
                                <h4 className="font-medium mb-3">User Feedback:</h4>
                                <div className="bg-muted p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium">Rating:</span>
                                    <div className="flex gap-1">
                                      {renderStars(selectedIssue.feedback.rating)}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      ({selectedIssue.feedback.rating}/5)
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Comment:</span>
                                    <p className="text-muted-foreground mt-1">
                                      "{selectedIssue.feedback.comment}"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
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

export default AdminCompleted;