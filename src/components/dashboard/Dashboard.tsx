import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AiAssistant } from "@/components/dashboard/AiAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Activity,
  Users,
  TrendingUp
} from "lucide-react";

interface DashboardProps {
  userRole: string;
  userName: string;
}

export const Dashboard = ({ userRole, userName }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatsData = () => {
    switch (userRole) {
      case "hospital":
        return [
          { title: "Ordonnances aujourd'hui", value: 127, description: "Prescriptions émises", icon: Package, trend: { value: 12, isPositive: true } },
          { title: "En attente", value: 23, description: "Validations pharmacie", icon: Clock, trend: { value: -5, isPositive: false } },
          { title: "Livrées", value: 89, description: "Aujourd'hui", icon: CheckCircle, trend: { value: 8, isPositive: true } },
          { title: "Patients actifs", value: 342, description: "Ce mois", icon: Users, trend: { value: 15, isPositive: true } },
        ];
      case "pharmacy":
        return [
          { title: "Commandes reçues", value: 156, description: "Aujourd'hui", icon: Package, trend: { value: 18, isPositive: true } },
          { title: "En préparation", value: 34, description: "En cours", icon: Clock, trend: { value: 7, isPositive: true } },
          { title: "Prêtes à livrer", value: 78, description: "Validées", icon: CheckCircle, trend: { value: 22, isPositive: true } },
          { title: "Stock critique", value: 5, description: "Médicaments", icon: AlertCircle, trend: { value: -2, isPositive: true } },
        ];
      case "delivery":
        return [
          { title: "Livraisons assignées", value: 45, description: "Aujourd'hui", icon: Truck, trend: { value: 12, isPositive: true } },
          { title: "En transit", value: 18, description: "En cours", icon: Activity, trend: { value: 5, isPositive: true } },
          { title: "Livrées", value: 23, description: "Terminées", icon: CheckCircle, trend: { value: 15, isPositive: true } },
          { title: "Temps moyen", value: "2.3h", description: "Livraison", icon: Clock, trend: { value: -8, isPositive: true } },
        ];
      case "patient":
        return [
          { title: "Commandes actives", value: 3, description: "En cours", icon: Package, trend: { value: 0, isPositive: true } },
          { title: "En livraison", value: 1, description: "Aujourd'hui", icon: Truck, trend: { value: 100, isPositive: true } },
          { title: "Reçues ce mois", value: 8, description: "Livraisons", icon: CheckCircle, trend: { value: 12, isPositive: true } },
          { title: "Satisfaction", value: "4.8/5", description: "Note moyenne", icon: TrendingUp, trend: { value: 5, isPositive: true } },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (userRole) {
      case "hospital":
        return [
          { id: 1, action: "Nouvelle ordonnance créée", time: "Il y a 5 min", status: "success" },
          { id: 2, action: "Validation pharmacie reçue", time: "Il y a 12 min", status: "info" },
          { id: 3, action: "Livraison confirmée", time: "Il y a 18 min", status: "success" },
        ];
      case "pharmacy":
        return [
          { id: 1, action: "Commande #1234 préparée", time: "Il y a 3 min", status: "success" },
          { id: 2, action: "Stock Doliprane mis à jour", time: "Il y a 8 min", status: "info" },
          { id: 3, action: "Nouvelle commande reçue", time: "Il y a 15 min", status: "pending" },
        ];
      case "delivery":
        return [
          { id: 1, action: "Livraison #5678 terminée", time: "Il y a 2 min", status: "success" },
          { id: 2, action: "Nouvelle assignation reçue", time: "Il y a 7 min", status: "info" },
          { id: 3, action: "Itinéraire optimisé", time: "Il y a 12 min", status: "pending" },
        ];
      case "patient":
        return [
          { id: 1, action: "Commande en préparation", time: "Il y a 1h", status: "pending" },
          { id: 2, action: "Livraison programmée", time: "Il y a 2h", status: "info" },
          { id: 3, action: "Médicament reçu", time: "Hier", status: "success" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Hedera Security Badge */}
        <div className="mb-8 p-6 bg-gradient-hero rounded-lg text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Tableau de Bord - {userRole === "hospital" ? "Hôpital" : userRole === "pharmacy" ? "Pharmacie" : userRole === "delivery" ? "Livraison" : "Patient"}
            </h2>
            <p className="text-white/80 mb-4">
              Gestion sécurisée et traçable du parcours du médicament
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Shield className="h-3 w-3 mr-1" />
                Sécurisé par Hedera
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Activity className="h-3 w-3 mr-1" />
                Temps réel
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getStatsData().map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activité Récente
              </CardTitle>
              <CardDescription>
                Dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecentActivity().map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge 
                      variant={activity.status === "success" ? "default" : activity.status === "pending" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {activity.status === "success" ? "Terminé" : activity.status === "pending" ? "En cours" : "Info"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {userRole === "hospital" && (
                  <>
                    <Button variant="medical" className="h-16 flex-col">
                      <Package className="h-5 w-5 mb-1" />
                      <span className="text-xs">Nouvelle Ordonnance</span>
                    </Button>
                    <Button variant="secondary" className="h-16 flex-col">
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-xs">Patients</span>
                    </Button>
                  </>
                )}
                {userRole === "pharmacy" && (
                  <>
                    <Button variant="medical" className="h-16 flex-col">
                      <Package className="h-5 w-5 mb-1" />
                      <span className="text-xs">Valider Commande</span>
                    </Button>
                    <Button variant="secondary" className="h-16 flex-col">
                      <Activity className="h-5 w-5 mb-1" />
                      <span className="text-xs">Gérer Stock</span>
                    </Button>
                  </>
                )}
                {userRole === "delivery" && (
                  <>
                    <Button variant="medical" className="h-16 flex-col">
                      <Truck className="h-5 w-5 mb-1" />
                      <span className="text-xs">Nouvelle Livraison</span>
                    </Button>
                    <Button variant="secondary" className="h-16 flex-col">
                      <Activity className="h-5 w-5 mb-1" />
                      <span className="text-xs">Suivi GPS</span>
                    </Button>
                  </>
                )}
                {userRole === "patient" && (
                  <>
                    <Button variant="medical" className="h-16 flex-col">
                      <Package className="h-5 w-5 mb-1" />
                      <span className="text-xs">Mes Commandes</span>
                    </Button>
                    <Button variant="secondary" className="h-16 flex-col">
                      <TrendingUp className="h-5 w-5 mb-1" />
                      <span className="text-xs">Donner Avis</span>
                    </Button>
                  </>
                )}
                <Button variant="hedera" className="h-16 flex-col col-span-2">
                  <Shield className="h-5 w-5 mb-1" />
                  <span className="text-xs">Blockchain Explorer</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AiAssistant userRole={userRole} />
    </div>
  );
};