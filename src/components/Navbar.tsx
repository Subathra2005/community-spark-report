import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  MapPin, 
  PlusCircle, 
  Search, 
  User, 
  LogOut,
  Settings,
  Home,
  FileText,
  CheckSquare,
  BarChart3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const userNavigation = [
    { name: "Home", href: "/", icon: AlertCircle },
    { name: "Heatmaps", href: "/heatmaps", icon: MapPin },
    { name: "Raise Problem", href: "/report", icon: PlusCircle },
    { name: "Check Status", href: "/status", icon: Search },
  ];

  const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Issue Management", href: "/admin/issues", icon: FileText },
    { name: "My Problems", href: "/admin/my-problems", icon: CheckSquare },
    { name: "Completed", href: "/admin/completed", icon: BarChart3 },
  ];

  const navigation = user?.role === "admin" ? adminNavigation : userNavigation;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">CivicReport</span>
        </Link>

        {/* Left Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={isActive(item.href) ? "default" : "ghost"}
              asChild
              className="text-sm"
            >
              <Link to={item.href} className="flex items-center space-x-2">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </div>

        {/* Right Side - Auth */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to={user.role === "admin" ? "/admin/profile" : "/profile"} className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>
                </DropdownMenuItem>
                {user.role !== "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="flex items-center space-x-2 text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};