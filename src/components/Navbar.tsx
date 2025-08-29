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
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  UserCog
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Mock user state - replace with actual auth context
  const isLoggedIn = true; // Changed to true to show admin interface
  const userRole: "user" | "admin" | "super_admin" = "admin"; // user, admin, super_admin

  // Navigation based on user role
  const getUserNavigation = () => {
    if (userRole === "admin") {
      return [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Issue Management", href: "/admin/issues", icon: ClipboardList },
        { name: "My Problems", href: "/admin/my-problems", icon: UserCog },
        { name: "Completed", href: "/admin/completed", icon: CheckCircle },
      ];
    }
    
    if (userRole === "super_admin") {
      return [
        { name: "Super Admin", href: "/super-admin", icon: UserCog },
        { name: "Escalated Issues", href: "/super-admin/escalated", icon: AlertCircle },
      ];
    }

    // Default user navigation
    return [
      { name: "Home", href: "/", icon: AlertCircle },
      { name: "Heatmaps", href: "/heatmaps", icon: MapPin },
      { name: "Raise Problem", href: "/report", icon: PlusCircle },
      { name: "Check Status", href: "/status", icon: Search },
    ];
  };

  const navigation = getUserNavigation();

  const getWelcomeMessage = () => {
    if (userRole === "admin") return "Roads & Infrastructure Admin";
    if (userRole === "super_admin") return "Super Administrator";
    return "Welcome";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={userRole === "admin" ? "/admin" : (userRole === "super_admin" ? "/super-admin" : "/")} className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">CivicReport</span>
          {(userRole === "admin" || userRole === "super_admin") && (
            <span className="text-sm text-muted-foreground">
              {userRole === "admin" ? "Admin" : "Super Admin"}
            </span>
          )}
        </Link>

        {/* Navigation */}
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
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{getWelcomeMessage()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {/* Role Switching for Demo */}
                <DropdownMenuItem onClick={() => window.location.reload()}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>Switch to User View</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2 text-destructive">
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