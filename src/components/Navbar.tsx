import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  MapPin, 
  PlusCircle, 
  Search, 
  User, 
  LogOut,
  Settings
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
  const isLoggedIn = false;
  const userRole = "user"; // user, admin, super_admin

  const navigation = [
    { name: "Home", href: "/", icon: AlertCircle },
    { name: "Heatmaps", href: "/heatmaps", icon: MapPin },
    { name: "Raise Problem", href: "/report", icon: PlusCircle },
    { name: "Check Status", href: "/status", icon: Search },
  ];

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
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
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