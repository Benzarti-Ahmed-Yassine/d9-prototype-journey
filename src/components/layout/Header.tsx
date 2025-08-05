import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Settings, MessageCircle } from "lucide-react";

interface HeaderProps {
  userRole: string;
  userName: string;
}

export const Header = ({ userRole, userName }: HeaderProps) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "hospital":
        return "bg-medical-blue text-white";
      case "pharmacy":
        return "bg-medical-green text-white";
      case "delivery":
        return "bg-warning text-white";
      case "patient":
        return "bg-hedera text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "hospital":
        return "Hôpital";
      case "pharmacy":
        return "Pharmacie";
      case "delivery":
        return "Livreur";
      case "patient":
        return "Patient";
      default:
        return "Utilisateur";
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">MediPlatform</h1>
            </div>
            <Badge className={getRoleBadgeVariant(userRole)}>
              {getRoleLabel(userRole)}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="floating" size="icon">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-foreground">{userName}</span>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};