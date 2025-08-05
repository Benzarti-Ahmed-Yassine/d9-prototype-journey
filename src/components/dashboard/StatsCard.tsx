import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  className = ""
}: StatsCardProps) => {
  return (
    <Card className={`bg-gradient-card backdrop-blur-sm border-border/50 shadow-card hover:shadow-floating transition-all duration-300 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{description}</span>
          {trend && (
            <span className={`font-medium ${
              trend.isPositive ? "text-secondary" : "text-destructive"
            }`}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};