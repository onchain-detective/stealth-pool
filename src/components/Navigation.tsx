import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Lock } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/pools", label: "Pools" },
    { href: "/analytics", label: "Analytics" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl text-foreground">SecureLP</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button 
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Button>
            </Link>
          ))}
          
          <Link to="/launch">
            <Button variant="glow" className="animate-glow">
              <Lock className="w-4 h-4 mr-2" />
              Launch App
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};