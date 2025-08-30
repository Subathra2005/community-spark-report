import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Issue {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: string;
  location: string;
  photo?: string;
  status: "pending" | "assigned" | "in_progress" | "resolved";
  assignedTo?: string;
  assignedAdminName?: string;
  createdAt: string;
  deadline: string;
  upvotes: string[]; // Array of user IDs who upvoted
  progress: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };
  feedback?: {
    rating: number;
    comment: string;
  };
}

interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'deadline' | 'upvotes' | 'progress'>) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  upvoteIssue: (id: string) => void;
  getUserIssues: () => Issue[];
  getUnassignedIssues: () => Issue[];
  getAdminIssues: () => Issue[];
  getCompletedAdminIssues: () => Issue[];
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load issues from localStorage
    const storedIssues = localStorage.getItem("civic_issues");
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  useEffect(() => {
    // Save issues to localStorage whenever issues change
    localStorage.setItem("civic_issues", JSON.stringify(issues));
  }, [issues]);

  const addIssue = (issueData: Omit<Issue, 'id' | 'createdAt' | 'deadline' | 'upvotes' | 'progress'>) => {
    const newIssue: Issue = {
      ...issueData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      upvotes: [],
      progress: {
        step1: false,
        step2: false,
        step3: false,
      },
    };

    setIssues(prev => [...prev, newIssue]);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, ...updates } : issue
    ));
  };

  const upvoteIssue = (id: string) => {
    if (!user) return;
    
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const hasUpvoted = issue.upvotes.includes(user.id);
        const newUpvotes = hasUpvoted 
          ? issue.upvotes.filter(userId => userId !== user.id)
          : [...issue.upvotes, user.id];
        
        // Update deadline if it reaches 20+ upvotes
        const deadline = newUpvotes.length >= 20 
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
          : issue.deadline;
        
        return { ...issue, upvotes: newUpvotes, deadline };
      }
      return issue;
    }));
  };

  const getUserIssues = () => {
    if (!user) return [];
    return issues.filter(issue => issue.userId === user.id);
  };

  const getUnassignedIssues = () => {
    return issues.filter(issue => issue.status === "pending");
  };

  const getAdminIssues = () => {
    if (!user) return [];
    return issues.filter(issue => 
      issue.assignedTo === user.id && 
      (issue.status === "assigned" || issue.status === "in_progress")
    );
  };

  const getCompletedAdminIssues = () => {
    if (!user) return [];
    return issues.filter(issue => 
      issue.assignedTo === user.id && issue.status === "resolved"
    );
  };

  return (
    <IssueContext.Provider value={{
      issues,
      addIssue,
      updateIssue,
      upvoteIssue,
      getUserIssues,
      getUnassignedIssues,
      getAdminIssues,
      getCompletedAdminIssues,
    }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("useIssues must be used within an IssueProvider");
  }
  return context;
};